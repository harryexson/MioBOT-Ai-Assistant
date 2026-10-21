import PocketBase, { AsyncAuthStore } from "pocketbase";
import * as SecureStore from "expo-secure-store";

declare const process: { env: { EXPO_PUBLIC_POCKETBASE_URL?: string } };
const configuredUrl = process.env.EXPO_PUBLIC_POCKETBASE_URL?.trim();
export const pocketBaseUrl = (configuredUrl || "https://pb-mzj62.aibuilder.ionos.com").replace(/\/$/, "");

const storedAuth = SecureStore.getItemAsync("mio-pocketbase-auth");
const authStore = new AsyncAuthStore({
  save: (serialized) => SecureStore.setItemAsync("mio-pocketbase-auth", serialized),
  clear: () => SecureStore.deleteItemAsync("mio-pocketbase-auth"),
  initial: storedAuth,
});

export const mobilePb = new PocketBase(pocketBaseUrl, authStore);
mobilePb.autoCancellation(false);

export function friendlyBackendError(error: unknown) {
  const value = error as {
    status?: number;
    message?: string;
    response?: { message?: string; data?: Record<string, { message?: string }> };
  };
  const message = value?.response?.message || value?.message || "Something went wrong. Please try again.";
  if (value?.status === 0 || /failed to fetch|network request failed|load failed|enotfound|econnrefused/i.test(message)) {
    return `Mio could not reach its account server at ${pocketBaseUrl}. Check the PocketBase URL and server status, then try again.`;
  }
  if (/failed to authenticate/i.test(message)) return "That email and password combination was not recognized.";
  if (/already exists/i.test(message)) return "An account with this email already exists. Sign in instead.";
  const fieldError = Object.values(value?.response?.data || {}).find((item) => item?.message)?.message;
  return fieldError || message;
}

export async function signIn(email: string, password: string) {
  const result = await mobilePb.collection("users").authWithPassword(email.trim(), password);
  return result.record;
}

export async function signUp(email: string, password: string, name: string, plan: "personal" | "business") {
  await mobilePb.collection("users").create({
    email: email.trim(),
    password,
    passwordConfirm: password,
    name: name.trim(),
    plan,
  });
  return signIn(email, password);
}

export function signOut() {
  mobilePb.authStore.clear();
}

export async function restoreSession() {
  const serialized = await storedAuth;
  if (serialized) {
    try {
      const { token, record } = JSON.parse(serialized);
      if (token && record) mobilePb.authStore.save(token, record);
    } catch {
      mobilePb.authStore.clear();
    }
  }
  if (!mobilePb.authStore.isValid) return null;
  try {
    const result = await mobilePb.collection("users").authRefresh();
    return result.record;
  } catch {
    mobilePb.authStore.clear();
    return null;
  }
}
