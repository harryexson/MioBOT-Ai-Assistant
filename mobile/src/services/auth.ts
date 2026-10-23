import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

declare const process: { env: { EXPO_PUBLIC_API_URL?: string } };

export const apiUrl = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/$/, "") || "";

export const authClient = createAuthClient({
  baseURL: `${apiUrl || "http://localhost:5173"}/api/auth`,
  plugins: [
    expoClient({
      scheme: "mioai",
      storagePrefix: "mio",
      storage: SecureStore,
    }),
  ],
  fetchOptions: { credentials: "include" },
});

type Account = { id: string; name: string; email: string; plan?: "personal" | "business" };

function unwrap<T>(result: { data?: T | null; error?: { message?: string } | null }): T {
  if (result.error) throw new Error(result.error.message || "Mio could not complete the account request.");
  if (!result.data) throw new Error("Mio could not complete the account request.");
  return result.data;
}

export async function signIn(email: string, password: string): Promise<Account> {
  const result = unwrap<{ user: Account }>(await authClient.signIn.email({ email: email.trim(), password }));
  return result.user as Account;
}

export async function signUp(email: string, password: string, name: string, plan: "personal" | "business"): Promise<Account> {
  const input = { email: email.trim(), password, name: name.trim(), plan };
  const signUpEmail = authClient.signUp.email as (value: typeof input) => ReturnType<typeof authClient.signUp.email>;
  const result = unwrap<{ user: Account }>(await signUpEmail(input));
  return result.user as Account;
}

export async function signOut() {
  unwrap(await authClient.signOut());
}

export async function restoreSession(): Promise<Account | null> {
  const result = await authClient.getSession();
  if (result.error) return null;
  return (result.data?.user as Account | undefined) || null;
}

export function friendlyBackendError(error: unknown) {
  const value = error as { message?: string; status?: number };
  const message = value?.message || "Something went wrong. Please try again.";
  if (value?.status === 0 || /failed to fetch|network request failed|load failed|enotfound|econnrefused/i.test(message)) {
    return `Mio could not reach its account API at ${apiUrl}. Set EXPO_PUBLIC_API_URL to your deployed Mio website, or your computer's reachable LAN address for local testing.`;
  }
  if (/already exists|already been used/i.test(message)) return "An account with this email already exists. Sign in instead.";
  if (/invalid email or password|failed to authenticate|invalid credentials/i.test(message)) return "That email and password combination was not recognized.";
  return message;
}

export async function authenticatedRequest<T>(path: string, body: unknown): Promise<T> {
  if (!apiUrl) throw new Error("Set EXPO_PUBLIC_API_URL to your deployed Mio backend before using the mobile app.");
  const fetchWithSession = authClient.$fetch as unknown as (
    url: string,
    options: { method: string; json: unknown; throw: true },
  ) => Promise<T>;
  return fetchWithSession(`${apiUrl}${path}`, { method: "POST", json: body, throw: true });
}
