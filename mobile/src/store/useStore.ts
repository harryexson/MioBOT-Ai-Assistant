/**
 * Mio AI — Global state (Zustand)
 *
 * Keeps auth state, conversation context, and cart in memory.
 * All persistent data (order history, profile, addresses) lives in Supabase.
 */

import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import type { Message, ProductResult, HotelResult, FlightResult } from "../services/mioApi";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ServiceCategory =
  | "shopping"
  | "food"
  | "travel"
  | "hotels"
  | "flights"
  | "events"
  | "appointments"
  | "payments"
  | "nfc"
  | "general";

export interface CartItem {
  id: string;
  type: "product" | "food" | "hotel" | "flight" | "event" | "service";
  name: string;
  price: number;
  currency: string;
  quantity: number;
  image?: string;
  metadata?: Record<string, unknown>;
}

export interface Conversation {
  id: string;
  messages: Message[];
  category: ServiceCategory;
  searchResults?: (ProductResult | HotelResult | FlightResult)[];
  pendingConfirmation?: {
    action: string;
    payload: Record<string, unknown>;
    description: string;
  };
}

// ── Store ─────────────────────────────────────────────────────────────────────

interface MioStore {
  // Auth
  user: User | null;
  setUser: (user: User | null) => void;

  // Active conversation
  conversation: Conversation | null;
  startConversation: (category: ServiceCategory, id?: string) => void;
  addMessage: (message: Message) => void;
  setSearchResults: (results: Conversation["searchResults"]) => void;
  setPendingConfirmation: (confirmation: Conversation["pendingConfirmation"]) => void;
  clearConfirmation: () => void;
  clearConversation: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;

  // Voice
  isListening: boolean;
  setListening: (v: boolean) => void;

  // UI
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useMioStore = create<MioStore>((set, get) => ({
  // Auth
  user: null,
  setUser: (user) => set({ user }),

  // Conversation
  conversation: null,
  startConversation: (category, id) =>
    set({
      conversation: {
        id: id ?? `conv_${Date.now()}`,
        messages: [],
        category,
        searchResults: undefined,
        pendingConfirmation: undefined,
      },
    }),
  addMessage: (message) =>
    set((state) => ({
      conversation: state.conversation
        ? { ...state.conversation, messages: [...state.conversation.messages, message] }
        : null,
    })),
  setSearchResults: (results) =>
    set((state) => ({
      conversation: state.conversation
        ? { ...state.conversation, searchResults: results }
        : null,
    })),
  setPendingConfirmation: (pendingConfirmation) =>
    set((state) => ({
      conversation: state.conversation
        ? { ...state.conversation, pendingConfirmation }
        : null,
    })),
  clearConfirmation: () =>
    set((state) => ({
      conversation: state.conversation
        ? { ...state.conversation, pendingConfirmation: undefined }
        : null,
    })),
  clearConversation: () => set({ conversation: null }),

  // Cart
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((c) => c.id === item.id);
      if (existing) {
        return {
          cart: state.cart.map((c) =>
            c.id === item.id ? { ...c, quantity: c.quantity + item.quantity } : c
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),
  removeFromCart: (id) =>
    set((state) => ({ cart: state.cart.filter((c) => c.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: quantity <= 0
        ? state.cart.filter((c) => c.id !== id)
        : state.cart.map((c) => (c.id === id ? { ...c, quantity } : c)),
    })),
  clearCart: () => set({ cart: [] }),
  cartTotal: () =>
    get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
  cartCount: () => get().cart.reduce((count, item) => count + item.quantity, 0),

  // Voice
  isListening: false,
  setListening: (v) => set({ isListening: v }),

  // UI
  activeTab: "home",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
