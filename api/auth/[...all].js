import { toNodeHandler } from "better-auth/node";
import { createAuth } from "../../src/lib/auth-server.js";

export const config = { api: { bodyParser: false } };

export default async function handler(request, response) {
  if (!process.env.DATABASE_URL || !process.env.BETTER_AUTH_SECRET) {
    response.status(503).json({ message: "Account services are not configured yet. Connect Neon and set the Vercel auth environment variables." });
    return;
  }
  return toNodeHandler(createAuth())(request, response);
}
