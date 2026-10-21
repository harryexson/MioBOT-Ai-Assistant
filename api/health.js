import { Pool } from "pg";

let pool;

export default async function handler(_request, response) {
  const configured = Boolean(process.env.DATABASE_URL && process.env.BETTER_AUTH_SECRET);
  if (!configured) return response.status(503).json({ status: "not_configured", accountApi: false });
  try {
    pool ||= new Pool({ connectionString: process.env.DATABASE_URL, max: 1, connectionTimeoutMillis: 5_000 });
    await pool.query("select 1");
    return response.status(200).json({ status: "ready", accountApi: true });
  } catch {
    return response.status(503).json({ status: "database_unavailable", accountApi: false });
  }
}
