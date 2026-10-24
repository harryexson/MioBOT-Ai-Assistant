import { toNodeHandler } from "better-auth/node";
import { createAuth } from "./auth-server.js";

export default async function authHandler(request, response) {
  if (!process.env.DATABASE_URL || !process.env.BETTER_AUTH_SECRET) {
    response.status(503).json({ message: "Account services are not configured yet. Connect Neon and set the Vercel auth environment variables." });
    return;
  }
  return toNodeHandler(createAuth())(request, response);
}
