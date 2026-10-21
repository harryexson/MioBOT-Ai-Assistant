import { fromNodeHeaders } from "better-auth/node";
import { Pool } from "pg";
import { createAuth } from "../../src/lib/auth-server.js";

let pool;
const collections = new Set(["waitlist", "partner-signups", "searches", "orders", "subscriptions", "commissions"]);

function database() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured.");
  pool ||= new Pool({ connectionString: process.env.DATABASE_URL, max: 1, connectionTimeoutMillis: 5_000 });
  return pool;
}

function send(response, status, value) {
  response.status(status).json(value);
}

async function currentUser(request) {
  if (!process.env.BETTER_AUTH_SECRET) return null;
  const session = await createAuth().api.getSession({ headers: fromNodeHeaders(request.headers) });
  return session?.user || null;
}

export default async function handler(request, response) {
  const origin = request.headers.origin;
  const allowedOrigins = new Set([
    process.env.BETTER_AUTH_URL,
    process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
    ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS || "").split(",").map((item) => item.trim()),
    "mioai://",
  ].filter(Boolean));
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Vary", "Origin");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  }
  if (request.method === "OPTIONS") return response.status(204).end();

  const resource = request.query?.resource;
  if (!collections.has(resource)) return send(response, 404, { message: "Unknown Mio data endpoint." });
  if (!process.env.DATABASE_URL) return send(response, 503, { message: "Mio data storage is not configured yet." });

  try {
    const user = await currentUser(request);
    if (request.method === "POST") {
      const body = request.body && typeof request.body === "object" ? request.body : {};
      if (resource === "waitlist") {
        if (!(await allowPublicSubmission(request))) return send(response, 429, { message: "Too many submissions. Please try again later." });
        const email = clean(body.email, 254);
        if (!validEmail(email)) return send(response, 400, { message: "Enter a valid email address." });
        const result = await database().query(
          "insert into mio_waitlist (email, name, subject, message, type) values ($1, $2, $3, $4, $5) returning id, created_at",
          [email.toLowerCase(), clean(body.name, 120), clean(body.subject, 180), clean(body.message, 4000), clean(body.type || "early-access", 40)],
        );
        return send(response, 201, result.rows[0]);
      }
      if (resource === "partner-signups") {
        if (!(await allowPublicSubmission(request))) return send(response, 429, { message: "Too many submissions. Please try again later." });
        const name = clean(body.name, 120);
        const email = clean(body.email, 254);
        const business = clean(body.business, 160);
        const partner = clean(body.partner_name, 120);
        const category = clean(body.category, 80);
        if (!name || !validEmail(email) || !business || !partner || !category) return send(response, 400, { message: "Complete the name, email, business, and provider fields." });
        const result = await database().query(
          "insert into mio_partner_signups (user_id, name, email, business, partner_name, category, status) values ($1, $2, $3, $4, $5, $6, 'applied') returning id, created_at",
          [user?.id || null, name, email.toLowerCase(), business, partner, category],
        );
        return send(response, 201, result.rows[0]);
      }
      if (resource === "searches") {
        if (!user) return send(response, 401, { message: "Sign in to save your search history." });
        const query = clean(body.query, 500);
        if (!query) return send(response, 400, { message: "Enter a search before saving it." });
        const result = await database().query(
          "insert into mio_searches (user_id, query, category, results_count) values ($1, $2, $3, $4) returning id, query, category, results_count, created_at",
          [user.id, query, clean(body.category, 80), Math.max(0, Math.min(Number(body.results_count) || 0, 500))],
        );
        return send(response, 201, result.rows[0]);
      }
      return send(response, 405, { message: "This data endpoint is read-only." });
    }

    if (request.method === "GET") {
      if (!user) return send(response, 401, { message: "Sign in to view account data." });
      const queries = {
        searches: ["select id, query, category, results_count, created_at as created from mio_searches where user_id = $1 order by created_at desc limit 100", [user.id]],
        orders: ["select id, merchant_name, category, total_amount, status, created_at as created from mio_orders where user_id = $1 order by created_at desc limit 100", [user.id]],
        subscriptions: ["select id, plan, status, current_period_end from mio_subscriptions where user_id = $1 and status = 'active' order by created_at desc limit 10", [user.id]],
        commissions: ["select id, partner, category, order_value, commission_earned, status, created_at as created from mio_commissions where user_id = $1 order by created_at desc limit 100", [user.id]],
      };
      if (!queries[resource]) return send(response, 405, { message: "This data endpoint is not readable." });
      const [sql, params] = queries[resource];
      const result = await database().query(sql, params);
      return send(response, 200, { items: result.rows });
    }

    return send(response, 405, { message: "Method not allowed." });
  } catch (error) {
    console.error("Mio data API error:", error);
    return send(response, 503, { message: "Mio could not complete that request. Check your backend setup and try again." });
  }
}

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function allowPublicSubmission(request) {
  const forwarded = request.headers["x-forwarded-for"];
  const address = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0]?.trim();
  const key = `${address || "unknown"}:${request.query.resource}`.slice(0, 200);
  const result = await database().query(
    `insert into mio_public_rate_limits (key, window_started, request_count)
     values ($1, now(), 1)
     on conflict (key) do update set
       window_started = case when mio_public_rate_limits.window_started < now() - interval '1 hour' then now() else mio_public_rate_limits.window_started end,
       request_count = case when mio_public_rate_limits.window_started < now() - interval '1 hour' then 1 else mio_public_rate_limits.request_count + 1 end
     returning request_count`,
    [key],
  );
  return result.rows[0].request_count <= 20;
}
