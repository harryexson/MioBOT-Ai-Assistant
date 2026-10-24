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

function requireApiUrl() {
  if (!apiUrl) throw new Error("This app build is missing its account service address. Install the latest Mio build and try again.");
}

function unwrap<T>(result: { data?: T | null; error?: { message?: string } | null }): T {
  if (result.error) throw new Error(errorMessage(result.error));
  if (!result.data) throw new Error("Mio could not complete the account request.");
  return result.data;
}

function errorMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (!error || typeof error !== "object") return "Mio could not complete the account request.";

  const value = error as Record<string, unknown>;
  for (const key of ["message", "error", "detail", "description"]) {
    const candidate = value[key];
    if (typeof candidate === "string" && candidate.trim()) return candidate;
    if (candidate && typeof candidate === "object") {
      const nested = errorMessage(candidate);
      if (nested !== "Mio could not complete the account request.") return nested;
    }
  }
  return "Mio could not complete the account request. Please check your connection and try again.";
}

export async function signIn(email: string, password: string): Promise<Account> {
  requireApiUrl();
  const result = unwrap<{ user: Account }>(await authClient.signIn.email({ email: email.trim(), password }));
  return result.user as Account;
}

export async function signUp(email: string, password: string, name: string, plan: "personal" | "business"): Promise<Account> {
  requireApiUrl();
  const input = { email: email.trim(), password, name: name.trim(), plan };
  const signUpEmail = authClient.signUp.email as (value: typeof input) => ReturnType<typeof authClient.signUp.email>;
  const result = unwrap<{ user: Account }>(await signUpEmail(input));
  return result.user as Account;
}

export async function signOut() {
  if (!apiUrl) return;
  unwrap(await authClient.signOut());
}

export async function restoreSession(): Promise<Account | null> {
  if (!apiUrl) return null;
  const result = await authClient.getSession();
  if (result.error) return null;
  return (result.data?.user as Account | undefined) || null;
}

export function friendlyBackendError(error: unknown): string {
  const value = error && typeof error === "object" ? error as Record<string, unknown> : {};
  const message = errorMessage(error);
  const status = Number(value.status ?? value.statusCode ?? 0);
  if (status === 0 && /failed to fetch|network request failed|load failed|enotfound|econnrefused|network error/i.test(message)) {
    return apiUrl
      ? "Mio could not reach its account service. Check your internet connection and try again."
      : "This app build is missing its account service address. Install the latest Mio build and try again.";
  }
  if (/already exists|already been used/i.test(message)) return "An account with this email already exists. Sign in instead.";
  if (/invalid email or password|failed to authenticate|invalid credentials/i.test(message)) return "That email and password combination was not recognized.";
  if (/password.*(8|short|weak)|at least 8/i.test(message)) return "Choose a password with at least 8 characters.";
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
