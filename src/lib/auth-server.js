import { expo } from "@better-auth/expo";
import { betterAuth } from "better-auth";
import { Pool } from "pg";

let authInstance;
let pool;

function trustedOrigins() {
  const configured = (process.env.BETTER_AUTH_TRUSTED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const deployment = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null;
  return [...new Set([
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "mioai://",
    deployment,
    ...configured,
  ].filter(Boolean))];
}

export function createAuth() {
  if (authInstance) return authInstance;
  if (!process.env.DATABASE_URL || !process.env.BETTER_AUTH_SECRET) {
    throw new Error("Set DATABASE_URL and BETTER_AUTH_SECRET before enabling account services.");
  }

  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 5_000,
  });

  const baseURL = process.env.BETTER_AUTH_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5173");
  const verificationRequired = process.env.EMAIL_VERIFICATION_REQUIRED === "true";

  authInstance = betterAuth({
    appName: "Mio",
    baseURL,
    basePath: "/api/auth",
    secret: process.env.BETTER_AUTH_SECRET,
    database: pool,
    trustedOrigins: trustedOrigins(),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: verificationRequired,
      sendResetPassword: async ({ user, url }) => {
        await sendEmail({ to: user.email, subject: "Reset your Mio password", text: `Reset your password: ${url}` });
      },
    },
    emailVerification: {
      sendOnSignUp: verificationRequired,
      autoSignInAfterVerification: true,
      sendVerificationEmail: async ({ user, url }) => {
        await sendEmail({ to: user.email, subject: "Verify your Mio account", text: `Verify your email: ${url}` });
      },
    },
    user: {
      additionalFields: {
        plan: { type: "string", required: false, defaultValue: "personal", input: true },
        role: { type: "string", required: false, defaultValue: "user", input: false },
      },
    },
    rateLimit: {
      enabled: true,
      storage: "database",
      window: 60,
      max: 100,
    },
    advanced: {
      useSecureCookies: process.env.NODE_ENV === "production",
      crossSubDomainCookies: { enabled: false },
    },
    plugins: [expo()],
  });

  return authInstance;
}

export async function closeAuthPool() {
  if (pool) await pool.end();
  pool = undefined;
  authInstance = undefined;
}

async function sendEmail({ to, subject, text }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    throw new Error("Email verification and password reset require RESEND_API_KEY and EMAIL_FROM.");
  }
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, text }),
  });
  if (!response.ok) throw new Error("Mio could not send the account email. Please try again later.");
}
