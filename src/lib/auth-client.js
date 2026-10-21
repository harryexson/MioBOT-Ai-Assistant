import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: `${window.location.origin}/api/auth`,
  fetchOptions: { credentials: "include" },
});

export const authBackendConfigured = import.meta.env.VITE_AUTH_ENABLED === "true";

export function assertAuthResult(result) {
  if (result?.error) throw new Error(result.error.message || "Mio could not complete the account request.");
  return result?.data;
}
