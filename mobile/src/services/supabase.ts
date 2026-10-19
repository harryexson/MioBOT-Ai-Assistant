import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";

// ── Supabase client ──────────────────────────────────────────────────────────
// Drop your project URL and anon key from supabase.com → Settings → API
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Secure token storage for React Native (keychain on iOS, keystore on Android)
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// ── Auth helpers ─────────────────────────────────────────────────────────────

export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// ── User profile ─────────────────────────────────────────────────────────────

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateUserProfile(userId: string, updates: Record<string, unknown>) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Conversations ────────────────────────────────────────────────────────────

export async function getConversations(userId: string) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*, messages(count)")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createConversation(userId: string, title: string, category: string) {
  const { data, error } = await supabase
    .from("conversations")
    .insert({ user_id: userId, title, category })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getMessages(conversationId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

export async function addMessage(conversationId: string, role: "user" | "assistant", content: string, metadata?: Record<string, unknown>) {
  const { data, error } = await supabase
    .from("messages")
    .insert({ conversation_id: conversationId, role, content, metadata })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Orders ───────────────────────────────────────────────────────────────────

export async function getUserOrders(userId: string) {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createOrder(order: Record<string, unknown>) {
  const { data, error } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Saved addresses & payment methods ────────────────────────────────────────

export async function getSavedAddresses(userId: string) {
  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userId)
    .order("is_default", { ascending: false });
  if (error) throw error;
  return data;
}

export async function saveAddress(userId: string, address: Record<string, unknown>) {
  const { data, error } = await supabase
    .from("addresses")
    .insert({ user_id: userId, ...address })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Favourites / preferences ──────────────────────────────────────────────────

export async function getUserPreferences(userId: string) {
  const { data, error } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error) throw error;
  return data;
}

export async function updateUserPreferences(userId: string, prefs: Record<string, unknown>) {
  const { data, error } = await supabase
    .from("user_preferences")
    .upsert({ user_id: userId, ...prefs })
    .select()
    .single();
  if (error) throw error;
  return data;
}
