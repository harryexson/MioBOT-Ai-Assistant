/**
 * Mio AI Engine — client-side API service
 *
 * All AI calls go through your own backend (EXPO_PUBLIC_API_BASE_URL).
 * The backend holds the OpenAI / LLM secret keys server-side.
 * This file never contains secret keys.
 */

import { supabase } from "./supabase";

const BASE = process.env.EXPO_PUBLIC_API_BASE_URL ?? "https://api.mioai.app/v1";

async function authHeaders(): Promise<Record<string, string>> {
  const { data: { session } } = await supabase.auth.getSession();
  return {
    "Content-Type": "application/json",
    ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
  };
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: await authHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? "Request failed");
  }
  return res.json();
}

async function get<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { headers: await authHeaders() });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? "Request failed");
  }
  return res.json();
}

// ── Chat / AI engine ─────────────────────────────────────────────────────────

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface ChatResponse {
  message: string;
  intent: string;
  category: string;
  results?: ProductResult[] | HotelResult[] | FlightResult[] | RestaurantResult[];
  requiresConfirmation?: boolean;
  confirmationPayload?: Record<string, unknown>;
}

export async function sendMessage(
  conversationId: string,
  messages: Message[],
  category?: string
): Promise<ChatResponse> {
  return post("/chat", { conversationId, messages, category });
}

export async function streamMessage(
  conversationId: string,
  messages: Message[],
  onChunk: (chunk: string) => void
): Promise<void> {
  const headers = await authHeaders();
  const res = await fetch(`${BASE}/chat/stream`, {
    method: "POST",
    headers,
    body: JSON.stringify({ conversationId, messages }),
  });
  const reader = res.body?.getReader();
  const decoder = new TextDecoder();
  if (!reader) return;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value, { stream: true }));
  }
}

// ── Shopping ──────────────────────────────────────────────────────────────────

export interface ProductResult {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  retailer: string;
  rating: number;
  reviewCount: number;
  availability: string;
  url: string;
}

export async function searchProducts(query: string, filters?: {
  maxPrice?: number;
  minPrice?: number;
  category?: string;
  brand?: string;
}): Promise<ProductResult[]> {
  return get("/search/products", {
    q: query,
    ...(filters?.maxPrice ? { maxPrice: String(filters.maxPrice) } : {}),
    ...(filters?.minPrice ? { minPrice: String(filters.minPrice) } : {}),
    ...(filters?.category ? { category: filters.category } : {}),
    ...(filters?.brand ? { brand: filters.brand } : {}),
  });
}

// ── Restaurants & Food ────────────────────────────────────────────────────────

export interface RestaurantResult {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  deliveryTime: number;
  deliveryFee: number;
  image: string;
  address: string;
  isOpen: boolean;
}

export async function searchRestaurants(query: string, location: { lat: number; lng: number }): Promise<RestaurantResult[]> {
  return get("/search/restaurants", {
    q: query,
    lat: String(location.lat),
    lng: String(location.lng),
  });
}

export async function getRestaurantMenu(restaurantId: string) {
  return get(`/restaurants/${restaurantId}/menu`);
}

// ── Hotels ────────────────────────────────────────────────────────────────────

export interface HotelResult {
  id: string;
  name: string;
  stars: number;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  currency: string;
  image: string;
  address: string;
  amenities: string[];
  availableRooms: number;
}

export async function searchHotels(params: {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}): Promise<HotelResult[]> {
  return get("/search/hotels", {
    destination: params.destination,
    checkIn: params.checkIn,
    checkOut: params.checkOut,
    guests: String(params.guests),
  });
}

// ── Flights ───────────────────────────────────────────────────────────────────

export interface FlightResult {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  stops: number;
  price: number;
  currency: string;
  cabinClass: string;
  seatsAvailable: number;
}

export async function searchFlights(params: {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  cabinClass?: string;
}): Promise<FlightResult[]> {
  return get("/search/flights", {
    origin: params.origin,
    destination: params.destination,
    departureDate: params.departureDate,
    ...(params.returnDate ? { returnDate: params.returnDate } : {}),
    passengers: String(params.passengers),
    cabinClass: params.cabinClass ?? "economy",
  });
}

// ── Events ────────────────────────────────────────────────────────────────────

export interface EventResult {
  id: string;
  name: string;
  venue: string;
  date: string;
  time: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  ticketsAvailable: number;
}

export async function searchEvents(query: string, location: string, date?: string): Promise<EventResult[]> {
  return get("/search/events", {
    q: query,
    location,
    ...(date ? { date } : {}),
  });
}

// ── Bookings / Appointments ───────────────────────────────────────────────────

export async function searchServices(query: string, location: { lat: number; lng: number }) {
  return get("/search/services", {
    q: query,
    lat: String(location.lat),
    lng: String(location.lng),
  });
}

export async function getAvailableSlots(serviceId: string, date: string) {
  return get(`/services/${serviceId}/slots`, { date });
}

// ── Orders & checkout ────────────────────────────────────────────────────────

export async function createCheckoutSession(items: {
  id: string;
  type: "product" | "food" | "hotel" | "flight" | "event" | "service";
  quantity: number;
  metadata?: Record<string, unknown>;
}[]): Promise<{ clientSecret: string; orderId: string }> {
  return post("/checkout/create-session", { items });
}

export async function confirmOrder(orderId: string, paymentIntentId: string) {
  return post("/checkout/confirm", { orderId, paymentIntentId });
}

// ── NFC / EasyTap ────────────────────────────────────────────────────────────

export async function resolveMioTag(tagId: string) {
  return get(`/nfc/resolve/${tagId}`);
}

export async function tapToPay(tagId: string, items: unknown[], paymentMethodId: string) {
  return post("/nfc/tap-to-pay", { tagId, items, paymentMethodId });
}
