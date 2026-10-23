import { fromNodeHeaders } from "better-auth/node";
import { randomUUID } from "node:crypto";
import { Pool } from "pg";
import { createAuth } from "../../src/lib/auth-server.js";

let pool;
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2_000;

function database() {
  if (!process.env.DATABASE_URL) throw new Error("Mio storage is not configured.");
  pool ||= new Pool({ connectionString: process.env.DATABASE_URL, max: 1, connectionTimeoutMillis: 5_000 });
  return pool;
}

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ message: "Method not allowed." });
  if (!process.env.OPENAI_API_KEY) return response.status(503).json({ message: "Mio AI is not configured yet. Add OPENAI_API_KEY in Vercel Project Settings." });

  try {
    const user = await createAuth().api.getSession({ headers: fromNodeHeaders(request.headers) }).then((session) => session?.user);
    if (!user) return response.status(401).json({ message: "Sign in to chat with Mio." });

    const input = request.body && typeof request.body === "object" ? request.body : {};
    if (!Array.isArray(input.messages) || input.messages.length < 1 || input.messages.length > MAX_MESSAGES) {
      return response.status(400).json({ message: `Send between 1 and ${MAX_MESSAGES} messages.` });
    }
    const messages = input.messages.map((item) => ({
      role: item?.role === "assistant" ? "assistant" : "user",
      content: typeof item?.content === "string" ? item.content.trim().slice(0, MAX_MESSAGE_LENGTH) : "",
    })).filter((item) => item.content);
    if (!messages.length || messages[messages.length - 1].role !== "user") return response.status(400).json({ message: "Your latest message is missing." });

    const conversationId = typeof input.conversationId === "string" && /^[a-zA-Z0-9_-]{8,80}$/.test(input.conversationId)
      ? input.conversationId
      : `c_${randomUUID()}`;
    const category = typeof input.category === "string" ? input.category.slice(0, 40) : "general";
    const db = database();
    const gate = await db.connect();
    try {
      await gate.query("begin");
      await gate.query("insert into mio_conversations (id, user_id, category) values ($1, $2, $3) on conflict (id) do nothing", [conversationId, user.id, category]);
      const owner = await gate.query("select id from mio_conversations where id = $1 and user_id = $2", [conversationId, user.id]);
      if (!owner.rowCount) {
        await gate.query("rollback");
        return response.status(404).json({ message: "That conversation is unavailable." });
      }
      const limit = await gate.query(
        `insert into mio_public_rate_limits (key, window_started, request_count) values ($1, now(), 1)
         on conflict (key) do update set
           window_started = case when mio_public_rate_limits.window_started < now() - interval '1 hour' then now() else mio_public_rate_limits.window_started end,
           request_count = case when mio_public_rate_limits.window_started < now() - interval '1 hour' then 1 else mio_public_rate_limits.request_count + 1 end
         returning request_count`,
        [`ai:${user.id}`],
      );
      await gate.query("commit");
      if (limit.rows[0].request_count > Number(process.env.AI_REQUESTS_PER_HOUR || 60)) return response.status(429).json({ message: "You have reached Mio’s hourly AI limit. Please try again later." });
    } finally {
      gate.release();
    }
    const system = "You are Mio, a thoughtful everyday assistant. Help users plan and compare shopping, dining, travel, events, local services, and daily life. Be clear about uncertainty and never claim you made a purchase, booking, payment, reservation, or contacted a provider. You may prepare options, but the user must complete any transaction with the provider. Do not invent live prices, availability, inventory, or provider search results. If asked for live options, explain that connected providers must be configured and offer to help refine the request.";
    const baseURL = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
    const aiResponse = await fetch(`${baseURL}/chat/completions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages: [{ role: "system", content: `${system} Current category: ${category}.` }, ...messages], temperature: 0.6, max_tokens: 700 }),
      signal: AbortSignal.timeout(25_000),
    });
    if (!aiResponse.ok) {
      console.error("Mio AI provider returned", aiResponse.status);
      return response.status(502).json({ message: "Mio could not reach its AI provider. Check the server-side AI settings." });
    }
    const completion = await aiResponse.json();
    const answer = completion.choices?.[0]?.message?.content?.trim();
    if (!answer) return response.status(502).json({ message: "Mio received an empty response. Please try again." });

    const client = await db.connect();
    try {
      await client.query("begin");
      const latest = messages[messages.length - 1].content;
      await client.query(
        "insert into mio_messages (conversation_id, role, content) values ($1, 'user', $2), ($1, 'assistant', $3)",
        [conversationId, latest, answer],
      );
      await client.query("update mio_conversations set updated_at = now() where id = $1 and user_id = $2", [conversationId, user.id]);
      await client.query("commit");
    } catch (error) {
      await client.query("rollback");
      throw error;
    } finally {
      client.release();
    }

    return response.status(200).json({ message: answer, conversationId, category, provider: model });
  } catch (error) {
    console.error("Mio chat API error:", error);
    return response.status(503).json({ message: "Mio could not complete that request. Check the Neon and authentication setup, then try again." });
  }
}
