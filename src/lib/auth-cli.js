// CLI-only config entry so `auth generate` can inspect the same server schema.
import { createAuth } from "./auth-server.js";

export const auth = createAuth();
