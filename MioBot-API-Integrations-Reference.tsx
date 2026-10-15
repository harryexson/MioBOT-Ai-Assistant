/**
 * ============================================================
 *  MioBot AI Assistant — Complete API & Affiliate Integration Reference
 *  Version: 1.0  |  Date: October 2026
 * ============================================================
 *
 *  This file is a self-contained reference for every partner API
 *  and affiliate programme available to integrate with MioBot.
 *
 *  Contents:
 *    1. TypeScript types / interfaces
 *    2. All 30+ integration definitions (INTEGRATIONS constant)
 *    3. Commission & category summary tables
 *    4. Integration helper utilities
 *    5. React component — <IntegrationReferenceTable />
 *
 *  Usage:
 *    import { INTEGRATIONS, getByCategory, getTotalCommissionRange } from "./MioBot-API-Integrations-Reference";
 *
 * ============================================================
 */

import React, { useState } from "react";

// ─────────────────────────────────────────────────────────────
//  1. Types & Interfaces
// ─────────────────────────────────────────────────────────────

export type IntegrationCategory =
  | "shopping"
  | "food"
  | "travel"
  | "events"
  | "services"
  | "health"
  | "finance"
  | "transport"
  | "payments";

export type DifficultyLevel = "easy" | "medium" | "hard";

export type CommissionType =
  | "per sale"
  | "per order"
  | "per booking"
  | "per stay"
  | "per ticket"
  | "per lead"
  | "per referral"
  | "per subscription"
  | "per conversion"
  | "per transaction"
  | "per retailer"
  | "per appointment"
  | "per new rider"
  | "per policy"
  | "per prescription";

export interface ApiIntegration {
  /** Unique identifier used as a slug / API key reference */
  id: string;

  /** Display name of the partner / platform */
  name: string;

  /** Primary category this integration belongs to */
  category: IntegrationCategory;

  /** Human-readable category label */
  categoryLabel: string;

  /** Emoji icon for quick visual identification */
  emoji: string;

  /**
   * Commission rate string — may be a range ("1–10%"), flat amount ("$5–15"),
   * or descriptor ("Varies") depending on partner programme structure.
   */
  commission: string;

  /** The basis on which the commission is paid */
  commissionType: CommissionType;

  /** Approximate active user base of the platform */
  platformUsers: string;

  /**
   * One-paragraph description of what MioBot users can do via this integration
   * and why it matters for the business.
   */
  description: string;

  /**
   * Key API capabilities / features exposed to MioBot.
   * Keep to 4–5 bullet points per integration.
   */
  features: string[];

  /** Official partner / affiliate / developer programme signup URL */
  signupUrl: string;

  /**
   * Integration complexity from a developer standpoint.
   * easy   — RESTful, well-documented, free sandbox
   * medium — OAuth or more complex auth, moderate docs
   * hard   — Enterprise contracts, complex auth, staging env required
   */
  difficulty: DifficultyLevel;

  /** Optional callout badge (e.g. "Most Popular", "Highest Commission") */
  badge?: string;

  /**
   * Revenue stream tags — one integration may contribute to multiple streams.
   * "commission"   — transaction-based referral fee paid by the partner
   * "lead-fee"     — flat fee per qualified lead sent to the partner
   * "subscription" — recurring platform subscription revenue from Mio users
   */
  revenueStreams: Array<"commission" | "lead-fee" | "subscription">;

  /**
   * Whether MioBot can complete an end-to-end purchase in-app
   * (true) or only searches / recommends and hands off (false).
   */
  supportsInAppCheckout: boolean;

  /**
   * Geographic availability.
   * "global" | specific regions, e.g. "US, CA, AU"
   */
  geography: string;

  /** Notes on API access tier, rate limits, or special requirements */
  notes?: string;
}

// ─────────────────────────────────────────────────────────────
//  2. Integration Definitions
// ─────────────────────────────────────────────────────────────

export const INTEGRATIONS: ApiIntegration[] = [

  // ── SHOPPING & RETAIL ──────────────────────────────────────

  {
    id: "amazon",
    name: "Amazon Product Advertising API",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    emoji: "🛒",
    commission: "1–10%",
    commissionType: "per sale",
    platformUsers: "200M+ Prime members",
    description:
      "Access Amazon's catalogue of 350 million+ products. MioBot users search, compare prices, read reviews, and purchase — you earn a percentage of every completed sale. Commission rate varies by product category (electronics ~3%, fashion up to 10%).",
    features: [
      "Product search & lookup by keyword, ASIN, or category",
      "Real-time price & availability data",
      "Customer reviews and ratings API",
      "Prime eligibility and delivery estimates",
      "Add-to-cart and checkout URL generation",
    ],
    signupUrl: "https://affiliate-program.amazon.com",
    difficulty: "easy",
    badge: "Most Popular",
    revenueStreams: ["commission"],
    supportsInAppCheckout: false,
    geography: "Global (localised per marketplace: .com, .co.uk, .de, .in, etc.)",
    notes: "Free to join. Requires at least 3 qualifying sales within 180 days to maintain active status.",
  },

  {
    id: "ebay",
    name: "eBay Partner Network",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    emoji: "🔨",
    commission: "1–6%",
    commissionType: "per sale",
    platformUsers: "135M+ active buyers",
    description:
      "New and used goods, auctions, collectibles, and fixed-price listings. Ideal for unique items, hard-to-find products, and budget shoppers. Commission is capped per transaction but volume is enormous.",
    features: [
      "Browse & Search API — keyword and category search",
      "Trading API — full listing and buyer flow",
      "Finding API — advanced item filters",
      "Buy API — modern cart-and-checkout flow",
      "Campaign management for deal promotions",
    ],
    signupUrl: "https://partnernetwork.ebay.com",
    difficulty: "easy",
    revenueStreams: ["commission"],
    supportsInAppCheckout: false,
    geography: "Global (25+ country sites)",
    notes: "Commission capped at $550 per item. Electronics and fashion are lower-rate categories.",
  },

  {
    id: "walmart",
    name: "Walmart Affiliate Programme",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    emoji: "🏪",
    commission: "1–4%",
    commissionType: "per sale",
    platformUsers: "120M+ monthly visitors",
    description:
      "Same-day pickup, grocery delivery, electronics, home goods, and general retail at everyday low prices. Best for price-sensitive users and those near a Walmart store.",
    features: [
      "Product lookup and search API",
      "Real-time inventory and store-pickup availability",
      "Grocery delivery scheduling",
      "Price-match and rollback deal data",
      "Savings Catcher integration",
    ],
    signupUrl: "https://affiliates.walmart.com",
    difficulty: "easy",
    revenueStreams: ["commission"],
    supportsInAppCheckout: false,
    geography: "US, CA, MX, UK (via Asda)",
    notes: "Managed through Impact Radius. Category rates: groceries 1%, general merchandise 4%.",
  },

  {
    id: "target",
    name: "Target Affiliates (Impact)",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    emoji: "🎯",
    commission: "1–8%",
    commissionType: "per sale",
    platformUsers: "200M+ annual shoppers",
    description:
      "Fashion, home décor, baby products, electronics, and beauty — all with Target's strong brand loyalty. High commission rates for apparel and home categories.",
    features: [
      "Product catalogue API via Impact",
      "RedCard and Circle deals integration",
      "Same-day delivery via Shipt",
      "Drive-up and in-store pickup data",
      "Weekly ad and promotion feed",
    ],
    signupUrl: "https://affiliates.target.com",
    difficulty: "easy",
    revenueStreams: ["commission"],
    supportsInAppCheckout: false,
    geography: "US only",
    notes: "Apparel and accessories earn up to 8%. Electronics and video games are 1%.",
  },

  {
    id: "cj",
    name: "CJ Affiliate (Commission Junction)",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    emoji: "🔗",
    commission: "Varies by retailer",
    commissionType: "per retailer",
    platformUsers: "3,800+ advertiser brands",
    description:
      "One API connection unlocks 3,800+ retailers including Lowe's, Overstock, Zappos, GNC, and thousands more. The most efficient way to add broad retail coverage to MioBot without individual integrations.",
    features: [
      "Single API access to 3,800+ brands",
      "Real-time product and commission data",
      "Deep-link generation for any product page",
      "Cross-device and cross-session attribution",
      "Automated commission reporting dashboard",
    ],
    signupUrl: "https://www.cj.com/publisher",
    difficulty: "medium",
    badge: "Best Coverage",
    revenueStreams: ["commission"],
    supportsInAppCheckout: false,
    geography: "Global",
    notes: "Minimum payout threshold $50. Payment via cheque, direct deposit, or Payoneer.",
  },

  {
    id: "rakuten",
    name: "Rakuten Advertising",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    emoji: "🌸",
    commission: "Varies by brand",
    commissionType: "per retailer",
    platformUsers: "1,000+ premium brands",
    description:
      "Premium brand partnerships — Macy's, Sephora, Levi's, Samsung, and Walmart. Better brand fit for lifestyle and luxury segments than CJ.",
    features: [
      "Brand partner API with 1,000+ advertisers",
      "Real-time commission tracking",
      "Coupon and promotional deal feed",
      "Multi-currency support",
      "Influencer and content tools",
    ],
    signupUrl: "https://rakutenadvertising.com/publishers",
    difficulty: "medium",
    revenueStreams: ["commission"],
    supportsInAppCheckout: false,
    geography: "Global",
    notes: "Strong in US, UK, AU, JP. Some premium brands require individual approval.",
  },

  {
    id: "shareasale",
    name: "ShareASale",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    emoji: "📦",
    commission: "Varies by merchant",
    commissionType: "per sale",
    platformUsers: "25,000+ merchants",
    description:
      "Especially strong in niche and independent retailer categories. Access boutique brands, artisan goods, and specialist retailers not available on Amazon or CJ.",
    features: [
      "Merchant search and programme discovery",
      "Product datafeed API",
      "Deep link builder",
      "Real-time reporting",
      "Coupon and deal API",
    ],
    signupUrl: "https://www.shareasale.com/info/publisher.cfm",
    difficulty: "easy",
    revenueStreams: ["commission"],
    supportsInAppCheckout: false,
    geography: "Primarily US and UK",
  },

  // ── FOOD & GROCERY ─────────────────────────────────────────

  {
    id: "doordash",
    name: "DoorDash Drive API",
    category: "food",
    categoryLabel: "Food & Grocery",
    emoji: "🚪",
    commission: "3–5%",
    commissionType: "per order",
    platformUsers: "37M+ monthly active users",
    description:
      "Food delivery from 600,000+ restaurants across the US and Canada. MioBot users order through conversational UI — 'get me a burrito from Chipotle' — and DoorDash handles fulfilment.",
    features: [
      "Restaurant search by cuisine, distance, and rating",
      "Full menu data and customisation options",
      "Order placement and real-time tracking",
      "Customer ratings and estimated delivery time",
      "DashPass loyalty integration",
    ],
    signupUrl: "https://developer.doordash.com",
    difficulty: "medium",
    badge: "Top Pick",
    revenueStreams: ["commission"],
    supportsInAppCheckout: true,
    geography: "US, CA, AU",
    notes: "Requires business account and DoorDash Partner agreement. Sandbox environment available.",
  },

  {
    id: "ubereats",
    name: "Uber Eats Affiliate API",
    category: "food",
    categoryLabel: "Food & Grocery",
    emoji: "🚗",
    commission: "3–6%",
    commissionType: "per order",
    platformUsers: "88M+ monthly active users",
    description:
      "Global food delivery across 6,000+ cities. Widest international restaurant selection. Ideal for MioBot users travelling or in markets where DoorDash has limited coverage.",
    features: [
      "Restaurant and menu discovery API",
      "Grocery and convenience delivery",
      "Group ordering for multiple users",
      "Scheduled future delivery",
      "Uber One loyalty programme data",
    ],
    signupUrl: "https://developer.uber.com/docs/eats/introduction",
    difficulty: "medium",
    revenueStreams: ["commission"],
    supportsInAppCheckout: true,
    geography: "Global — 6,000+ cities in 45+ countries",
    notes: "OAuth 2.0 authentication required. Separate API credentials for each region.",
  },

  {
    id: "instacart",
    name: "Instacart Affiliate API",
    category: "food",
    categoryLabel: "Food & Grocery",
    emoji: "🛒",
    commission: "3–5%",
    commissionType: "per order",
    platformUsers: "10M+ users",
    description:
      "Same-day grocery delivery in as little as 1 hour from 1,400+ retailers including Costco, Kroger, Aldi, Whole Foods, and CVS. The best option for full grocery shops.",
    features: [
      "Multi-retailer grocery search",
      "1-hour and scheduled delivery slots",
      "Prescription pickup from pharmacy partners",
      "Shopper loyalty card sync",
      "Real-time item substitution suggestions",
    ],
    signupUrl: "https://www.instacart.com/business/affiliates",
    difficulty: "easy",
    revenueStreams: ["commission"],
    supportsInAppCheckout: true,
    geography: "US, CA",
  },

  {
    id: "grubhub",
    name: "Grubhub Corporate API",
    category: "food",
    categoryLabel: "Food & Grocery",
    emoji: "🍕",
    commission: "4%",
    commissionType: "per order",
    platformUsers: "22M+ active diners",
    description:
      "Strong US east coast and major city coverage. Campus dining, office ordering, and corporate meal programmes are Grubhub's differentiation from DoorDash and Uber Eats.",
    features: [
      "Restaurant search and menu API",
      "Delivery time and cost estimation",
      "Grubhub+ loyalty programme",
      "Corporate and team ordering",
      "Diner rewards and promo codes",
    ],
    signupUrl: "https://corporate.grubhub.com/partner",
    difficulty: "medium",
    revenueStreams: ["commission"],
    supportsInAppCheckout: true,
    geography: "US (strongest in New York, Chicago, Boston)",
  },

  // ── TRAVEL & HOTELS ────────────────────────────────────────

  {
    id: "amadeus",
    name: "Amadeus Travel APIs",
    category: "travel",
    categoryLabel: "Travel & Hotels",
    emoji: "✈️",
    commission: "1–3%",
    commissionType: "per booking",
    platformUsers: "Industry standard GDS",
    description:
      "The world's largest Global Distribution System. Real-time pricing and availability across every scheduled airline. The enterprise-grade option for full flight booking in MioBot.",
    features: [
      "Flight Offers Search and Price API",
      "Flight Offer Orders (booking API)",
      "Seat map and ancillary services",
      "Hotel search and booking",
      "AI-powered trip intelligence and recommendations",
    ],
    signupUrl: "https://developers.amadeus.com",
    difficulty: "hard",
    badge: "Enterprise",
    revenueStreams: ["commission"],
    supportsInAppCheckout: true,
    geography: "Global — all IATA airlines",
    notes: "Requires formal partner agreement for production access. Generous free sandbox with test data.",
  },

  {
    id: "booking",
    name: "Booking.com Affiliate API",
    category: "travel",
    categoryLabel: "Travel & Hotels",
    emoji: "🏨",
    commission: "4–6%",
    commissionType: "per stay",
    platformUsers: "150M+ room nights/year",
    description:
      "2.4 million properties in 220+ countries. Instant confirmation, free cancellation on most rooms, and no prepayment needed. The highest-volume hotel API available.",
    features: [
      "Property search with 200+ filters",
      "Real-time availability and pricing",
      "Instant booking and confirmation",
      "Guest review data (100M+ reviews)",
      "Multi-currency and multi-language",
    ],
    signupUrl: "https://www.booking.com/affiliate-program/v2/index.html",
    difficulty: "easy",
    badge: "Highest Volume",
    revenueStreams: ["commission"],
    supportsInAppCheckout: true,
    geography: "Global — 220+ countries",
    notes: "Commission paid after guest stays. Standard 25% of Booking.com's margin (≈4–6% of room rate).",
  },

  {
    id: "expedia",
    name: "Expedia Affiliate Network (EAN)",
    category: "travel",
    categoryLabel: "Travel & Hotels",
    emoji: "🌍",
    commission: "3–6%",
    commissionType: "per booking",
    platformUsers: "600M+ annual visitors",
    description:
      "Flights + hotels + car hire in one search. Best for holiday bundle bookings. EAN also powers many white-label travel sites, so integration opens a huge inventory.",
    features: [
      "Bundle deal search (flight + hotel)",
      "Car hire and airport transfer",
      "Price-drop alerts and deal feed",
      "Expedia TAAP partner programme for agents",
      "One Key loyalty points API",
    ],
    signupUrl: "https://expediaaffiliate.com",
    difficulty: "medium",
    revenueStreams: ["commission"],
    supportsInAppCheckout: true,
    geography: "Global",
  },

  {
    id: "airbnb",
    name: "Airbnb Affiliate Programme",
    category: "travel",
    categoryLabel: "Travel & Hotels",
    emoji: "🏠",
    commission: "$40–75 USD",
    commissionType: "per booking",
    platformUsers: "150M+ guests globally",
    description:
      "Unique stays, entire apartments, villas, treehouses, and local experiences. Preferred for longer stays (4+ nights) and travellers seeking a 'home away from home'.",
    features: [
      "Listing search with map and filter API",
      "Airbnb Experiences API",
      "Calendar availability API",
      "Host profile and review data",
      "Instant Book listings filter",
    ],
    signupUrl: "https://www.airbnb.com/associates",
    difficulty: "medium",
    revenueStreams: ["commission"],
    supportsInAppCheckout: false,
    geography: "Global — 100,000+ cities",
    notes: "Flat commission per booking, not percentage. Best for premium or longer stays.",
  },

  {
    id: "viator",
    name: "Viator / TripAdvisor Experiences",
    category: "travel",
    categoryLabel: "Travel & Hotels",
    emoji: "🎡",
    commission: "8%",
    commissionType: "per booking",
    platformUsers: "300,000+ experiences listed",
    description:
      "Tours, day trips, cooking classes, snorkelling, city walks, skip-the-line museum entries — 300,000+ bookable experiences in 200+ countries. Perfect as an add-on to any hotel or flight booking.",
    features: [
      "Experience search by destination and category",
      "Availability and booking API",
      "Multilingual content (30+ languages)",
      "Review and rating data from TripAdvisor",
      "Private tour and custom itinerary options",
    ],
    signupUrl: "https://www.viator.com/info/affiliate-program",
    difficulty: "easy",
    revenueStreams: ["commission"],
    supportsInAppCheckout: true,
    geography: "Global",
  },

  {
    id: "getyourguide",
    name: "GetYourGuide Partner API",
    category: "travel",
    categoryLabel: "Travel & Hotels",
    emoji: "🗺️",
    commission: "8%",
    commissionType: "per booking",
    platformUsers: "60M+ customers",
    description:
      "Competitor to Viator with a strong European portfolio and a reputation for premium curated tours. Often has exclusive experiences not listed on Viator.",
    features: [
      "Activity search and booking API",
      "Exclusive 'Originals' tours",
      "Free cancellation up to 24h on most activities",
      "White-label widget option",
      "Multi-language and multi-currency",
    ],
    signupUrl: "https://partner.getyourguide.com",
    difficulty: "easy",
    revenueStreams: ["commission"],
    supportsInAppCheckout: true,
    geography: "Global — strongest in Europe",
  },

  {
    id: "skyscanner",
    name: "Skyscanner Travel API",
    category: "travel",
    categoryLabel: "Travel & Hotels",
    emoji: "🌐",
    commission: "CPC + 2–4%",
    commissionType: "per booking",
    platformUsers: "100M+ monthly users",
    description:
      "Compare flights, hotels, and car hire across hundreds of providers in one search. Best for 'cheapest time to fly' and 'flexible date' queries — ideal for budget-conscious MioBot users.",
    features: [
      "Flexible date and cheapest month search",
      "Live pricing across 1,200+ airlines",
      "Car hire comparison",
      "Price alert subscriptions",
      "Everywhere destination explorer",
    ],
    signupUrl: "https://www.partners.skyscanner.net",
    difficulty: "medium",
    revenueStreams: ["commission"],
    supportsInAppCheckout: false,
    geography: "Global",
  },

  // ── EVENTS & ENTERTAINMENT ─────────────────────────────────

  {
    id: "ticketmaster",
    name: "Ticketmaster Discovery API",
    category: "events",
    categoryLabel: "Events & Entertainment",
    emoji: "🎟️",
    commission: "2–5%",
    commissionType: "per ticket",
    platformUsers: "500M+ tickets sold per year",
    description:
      "The world's largest primary ticketing marketplace. Concerts, sports, theatre, comedy — MioBot can surface and sell tickets for any event, anywhere.",
    features: [
      "Event discovery by location, category, and date",
      "Real-time ticket inventory and pricing",
      "Seat map and section selection",
      "Order placement and e-ticket delivery",
      "Resale market data via StubHub integration",
    ],
    signupUrl: "https://developer.ticketmaster.com/products-and-docs/apis/getting-started",
    difficulty: "medium",
    badge: "Market Leader",
    revenueStreams: ["commission"],
    supportsInAppCheckout: false,
    geography: "US, CA, UK, AU, MX, IE + more",
    notes: "Discovery API is free. Booking / transactional API requires partner agreement with Ticketmaster.",
  },

  {
    id: "eventbrite",
    name: "Eventbrite Organizer API",
    category: "events",
    categoryLabel: "Events & Entertainment",
    emoji: "🎪",
    commission: "4%",
    commissionType: "per ticket",
    platformUsers: "3M+ events per year",
    description:
      "Local events, professional conferences, music festivals, fitness classes, and workshops. Particularly strong for community and niche events that Ticketmaster doesn't carry.",
    features: [
      "Event search and discovery API",
      "Ticket purchasing API",
      "Organiser and venue data",
      "Category and subcategory browse",
      "Attendee check-in and management",
    ],
    signupUrl: "https://www.eventbrite.com/platform/api",
    difficulty: "easy",
    revenueStreams: ["commission"],
    supportsInAppCheckout: true,
    geography: "Global",
  },

  {
    id: "stubhub",
    name: "StubHub / Viagogo Partner API",
    category: "events",
    categoryLabel: "Events & Entertainment",
    emoji: "🎫",
    commission: "5–10%",
    commissionType: "per ticket",
    platformUsers: "10M+ buyers",
    description:
      "The premier resale ticket marketplace. Best for sold-out events, premium seats, and last-minute purchases. Higher commission than primary ticketing due to the secondary market.",
    features: [
      "Secondary market ticket search",
      "FanProtect money-back guarantee",
      "Price trend and value analysis",
      "Instant download and mobile delivery",
      "Fan sections and premium suite listings",
    ],
    signupUrl: "https://www.viagogo.com/affiliates",
    difficulty: "medium",
    revenueStreams: ["commission"],
    supportsInAppCheckout: false,
    geography: "Global",
  },

  {
    id: "seatgeek",
    name: "SeatGeek Partner API",
    category: "events",
    categoryLabel: "Events & Entertainment",
    emoji: "🏟️",
    commission: "5–10%",
    commissionType: "per ticket",
    platformUsers: "20M+ users",
    description:
      "Smart ticket buying powered by Deal Score — an algorithm that flags which tickets are the best value in real time. Excellent for recommending tickets within a user's budget.",
    features: [
      "Deal Score API for value ranking",
      "Price prediction and trend data",
      "All-in pricing (no hidden fees display)",
      "Interactive venue maps",
      "Performer and team follow / alerts",
    ],
    signupUrl: "https://seatgeek.com/info/affiliates",
    difficulty: "medium",
    revenueStreams: ["commission"],
    supportsInAppCheckout: false,
    geography: "US, CA, UK",
  },

  // ── HOME & LOCAL SERVICES ──────────────────────────────────

  {
    id: "thumbtack",
    name: "Thumbtack API",
    category: "services",
    categoryLabel: "Home & Local Services",
    emoji: "📌",
    commission: "10–20%",
    commissionType: "per lead",
    platformUsers: "10M+ jobs completed",
    description:
      "Book plumbers, electricians, cleaners, movers, photographers, personal trainers — 1,000+ service categories. MioBot earns a lead fee for every qualified job request sent to a pro.",
    features: [
      "Pro search and AI matching by job type",
      "Quote request and response API",
      "Background check and licence verification",
      "Instant booking for top-rated pros",
      "Job completion and payment tracking",
    ],
    signupUrl: "https://pro.thumbtack.com/api",
    difficulty: "medium",
    badge: "Highest Commission",
    revenueStreams: ["lead-fee"],
    supportsInAppCheckout: false,
    geography: "US",
  },

  {
    id: "taskrabbit",
    name: "TaskRabbit API",
    category: "services",
    categoryLabel: "Home & Local Services",
    emoji: "🐰",
    commission: "15%",
    commissionType: "per booking",
    platformUsers: "140+ cities",
    description:
      "On-demand handymen, furniture assembly, cleaning, TV mounting, and moving help — bookable in minutes. Strategic IKEA partnership drives enormous furniture assembly volume.",
    features: [
      "Tasker search by skill and location",
      "Real-time availability calendar",
      "Instant booking and confirmation",
      "Secure in-app payment",
      "IKEA co-branded assembly service",
    ],
    signupUrl: "https://www.taskrabbit.com/affiliates",
    difficulty: "easy",
    revenueStreams: ["commission"],
    supportsInAppCheckout: true,
    geography: "US, UK, CA, DE, FR, ES, IT, PT",
  },

  {
    id: "angi",
    name: "Angi (Angie's List) API",
    category: "services",
    categoryLabel: "Home & Local Services",
    emoji: "🔧",
    commission: "10–15%",
    commissionType: "per lead",
    platformUsers: "150M+ verified reviews",
    description:
      "The most trusted home improvement professional network. Verified reviews, licence checks, and guaranteed work on larger projects. Best for high-value jobs (roofing, HVAC, remodelling).",
    features: [
      "Pro matching by project type and zip code",
      "Fixed-price project booking",
      "Instant booking for routine services",
      "Angi Key membership perks",
      "Satisfaction guarantee API",
    ],
    signupUrl: "https://pro.angi.com/affiliates",
    difficulty: "medium",
    revenueStreams: ["lead-fee"],
    supportsInAppCheckout: false,
    geography: "US",
  },

  // ── HEALTH & WELLNESS ──────────────────────────────────────

  {
    id: "zocdoc",
    name: "Zocdoc API",
    category: "health",
    categoryLabel: "Health & Wellness",
    emoji: "🏥",
    commission: "Per appointment (negotiated)",
    commissionType: "per appointment",
    platformUsers: "6M+ patients per month",
    description:
      "Book doctors, dentists, dermatologists, therapists, and specialists with real-time appointment availability and insurance verification. MioBot can answer 'find me a doctor who takes my insurance and is free tomorrow'.",
    features: [
      "Specialty and symptom-based search",
      "Real-time calendar availability",
      "Insurance plan verification",
      "Telehealth appointment booking",
      "Patient intake form pre-fill",
    ],
    signupUrl: "https://www.zocdoc.com/about/partnerships",
    difficulty: "hard",
    revenueStreams: ["lead-fee"],
    supportsInAppCheckout: false,
    geography: "US",
    notes: "Requires formal partnership agreement. Revenue share negotiated case by case.",
  },

  {
    id: "goodrx",
    name: "GoodRx API",
    category: "health",
    categoryLabel: "Health & Wellness",
    emoji: "💊",
    commission: "Per prescription referral",
    commissionType: "per prescription",
    platformUsers: "25M+ monthly users",
    description:
      "Compare drug prices across pharmacies and generate discount coupons. MioBot can save users up to 80% on prescriptions by finding the cheapest nearby pharmacy for any medication.",
    features: [
      "Drug price comparison by zip code",
      "Coupon code generation",
      "Pharmacy finder and directions",
      "Manufacturer savings programme lookup",
      "Drug interaction and alternative search",
    ],
    signupUrl: "https://www.goodrx.com/affiliate",
    difficulty: "easy",
    revenueStreams: ["lead-fee"],
    supportsInAppCheckout: false,
    geography: "US",
  },

  {
    id: "calm",
    name: "Calm / Headspace Affiliate",
    category: "health",
    categoryLabel: "Health & Wellness",
    emoji: "🧘",
    commission: "20–30%",
    commissionType: "per subscription",
    platformUsers: "150M+ combined downloads",
    description:
      "Meditation, sleep stories, breathing exercises, and mindfulness programmes. Recurring commission on every subscription renewal — one of the best long-term revenue per user ratios.",
    features: [
      "App subscription deep-link",
      "Content preview and trial API",
      "Corporate wellness package referrals",
      "Sleep score and progress tracking",
      "Mindfulness streak data",
    ],
    signupUrl: "https://www.calm.com/business/affiliate",
    difficulty: "easy",
    revenueStreams: ["commission"],
    supportsInAppCheckout: false,
    geography: "Global",
    notes: "Calm: managed via Impact. Headspace: managed via CJ Affiliate.",
  },

  // ── FINANCIAL SERVICES ─────────────────────────────────────

  {
    id: "nerdwallet",
    name: "NerdWallet / Bankrate Partner API",
    category: "finance",
    categoryLabel: "Financial Services",
    emoji: "💳",
    commission: "$50–300 USD",
    commissionType: "per conversion",
    platformUsers: "20M+ monthly unique visitors",
    description:
      "Credit cards, personal loans, mortgages, savings accounts, and insurance — compared and applied for through MioBot. Highest flat-fee commission per successful application in the partner ecosystem.",
    features: [
      "Financial product comparison API",
      "Personalised rate search (soft credit check)",
      "Application tracking and status",
      "Credit score tools and improvement tips",
      "Savings and CD rate comparisons",
    ],
    signupUrl: "https://www.nerdwallet.com/advertising",
    difficulty: "medium",
    badge: "Highest Payout",
    revenueStreams: ["lead-fee"],
    supportsInAppCheckout: false,
    geography: "US, UK, CA, AU",
    notes: "Commission paid on funded accounts or approved applications. CPA model.",
  },

  {
    id: "lemonade",
    name: "Lemonade Insurance API",
    category: "finance",
    categoryLabel: "Financial Services",
    emoji: "🍋",
    commission: "$20–150 USD",
    commissionType: "per policy",
    platformUsers: "1.5M+ customers",
    description:
      "AI-powered insurance for renters, homeowners, pets, and cars — instant quotes in 90 seconds, claims paid in 3 minutes. MioBot can sell insurance as naturally as it sells anything else.",
    features: [
      "Instant quote API (renters, home, pet, car)",
      "AI-powered claims submission",
      "Policy management API",
      "Giveback programme data",
      "ISO-standard policy document generation",
    ],
    signupUrl: "https://www.lemonade.com/affiliates",
    difficulty: "easy",
    revenueStreams: ["lead-fee"],
    supportsInAppCheckout: false,
    geography: "US, UK, DE, NL, FR",
  },

  {
    id: "creditkarma",
    name: "Credit Karma / Experian Partner",
    category: "finance",
    categoryLabel: "Financial Services",
    emoji: "📊",
    commission: "$30–100 USD",
    commissionType: "per referral",
    platformUsers: "130M+ members",
    description:
      "Free credit score monitoring, loan recommendations, and credit card matching. MioBot earns when a user applies for a product matched to their credit profile.",
    features: [
      "Credit score API (soft pull, no impact)",
      "Personalised loan and card recommendations",
      "Mortgage and refinance comparison",
      "Identity monitoring alerts",
      "Tax filing integration (TurboTax)",
    ],
    signupUrl: "https://www.creditkarma.com/affiliates",
    difficulty: "medium",
    revenueStreams: ["lead-fee"],
    supportsInAppCheckout: false,
    geography: "US, CA, UK",
  },

  // ── RIDES & TRANSPORT ──────────────────────────────────────

  {
    id: "uber",
    name: "Uber Referral / Affiliate API",
    category: "transport",
    categoryLabel: "Rides & Transport",
    emoji: "🚕",
    commission: "$5–15 USD",
    commissionType: "per new rider",
    platformUsers: "131M+ monthly active users",
    description:
      "Ride-hailing in 10,000+ cities worldwide. MioBot users say 'get me a ride home' and Uber handles the rest. Commission earned per new user referred who takes their first trip.",
    features: [
      "Ride request and price estimate API",
      "Surge pricing indicator",
      "Scheduled ride booking",
      "UberX, Comfort, Black, XL options",
      "Real-time driver tracking",
    ],
    signupUrl: "https://developer.uber.com",
    difficulty: "medium",
    revenueStreams: ["lead-fee"],
    supportsInAppCheckout: false,
    geography: "Global — 70+ countries",
    notes: "Referral commission per new user who completes first ride. Requires Uber developer account.",
  },

  {
    id: "rome2rio",
    name: "Rome2rio Multi-Modal API",
    category: "transport",
    categoryLabel: "Rides & Transport",
    emoji: "🗺️",
    commission: "CPC + 2–4%",
    commissionType: "per booking",
    platformUsers: "12M+ monthly users",
    description:
      "Compare every transport mode — plane, train, bus, ferry, car hire — for any journey between any two points on earth. Best for MioBot's travel planning and route recommendation features.",
    features: [
      "Multi-modal route comparison",
      "Door-to-door journey planner",
      "Price and duration comparison",
      "CO₂ emissions data per route",
      "Deep links to booking partners",
    ],
    signupUrl: "https://www.rome2rio.com/about/partners",
    difficulty: "easy",
    revenueStreams: ["commission"],
    supportsInAppCheckout: false,
    geography: "Global",
  },

  {
    id: "trainline",
    name: "Trainline Partner API",
    category: "transport",
    categoryLabel: "Rides & Transport",
    emoji: "🚄",
    commission: "2–4%",
    commissionType: "per booking",
    platformUsers: "100M+ journeys/year",
    description:
      "Europe's leading rail and coach booking platform. Real-time prices across 270+ rail and coach carriers in 45 countries. Essential for European MioBot users.",
    features: [
      "Rail and coach search across 270+ operators",
      "Split ticketing to find cheaper fares",
      "Seat reservation and rail pass data",
      "Delay and disruption alerts",
      "Eurostar and high-speed rail",
    ],
    signupUrl: "https://www.thetrainline.com/about/partners",
    difficulty: "medium",
    revenueStreams: ["commission"],
    supportsInAppCheckout: true,
    geography: "UK, EU (45 countries)",
  },

  // ── PAYMENTS ───────────────────────────────────────────────

  {
    id: "stripe",
    name: "Stripe Connect",
    category: "payments",
    categoryLabel: "Payments",
    emoji: "💳",
    commission: "Processing margin",
    commissionType: "per transaction",
    platformUsers: "Global",
    description:
      "Accept payments from MioBot users and automatically split revenue with partner merchants. The financial backbone of the platform — handles cards, Apple Pay, Google Pay, and BNPL in one integration.",
    features: [
      "Card and digital wallet acceptance (Apple/Google Pay)",
      "Automatic revenue split with merchants (Connect)",
      "Klarna, Afterpay, Affirm BNPL via Payment Element",
      "Fraud detection and 3D Secure",
      "Instant payouts to merchants",
    ],
    signupUrl: "https://stripe.com/connect",
    difficulty: "medium",
    badge: "Recommended",
    revenueStreams: ["commission"],
    supportsInAppCheckout: true,
    geography: "Global — 135+ currencies",
    notes: "Standard pricing: 1.4% + 20p (EU cards) or 2.9% + 30¢ (US cards). No monthly fees.",
  },

  {
    id: "klarna",
    name: "Klarna Merchant API",
    category: "payments",
    categoryLabel: "Payments",
    emoji: "🛍️",
    commission: "1–3%",
    commissionType: "per transaction",
    platformUsers: "150M+ Klarna users",
    description:
      "Buy Now Pay Later at the MioBot checkout. Split any purchase into 4 interest-free payments or defer for 30 days. Increases conversion by 20–30% for high-value purchases.",
    features: [
      "Pay in 4 (interest-free instalments)",
      "Pay in 30 days (try before you pay)",
      "Longer-term financing for large purchases",
      "Klarna merchant boost (featured placement)",
      "Klarna app shopper base reach",
    ],
    signupUrl: "https://www.klarna.com/business",
    difficulty: "easy",
    revenueStreams: ["commission"],
    supportsInAppCheckout: true,
    geography: "US, UK, EU, AU, CA + 20 more",
    notes: "Can be added as a payment method within Stripe Payment Element — no separate integration needed.",
  },

  {
    id: "paypal",
    name: "PayPal Commerce Platform",
    category: "payments",
    categoryLabel: "Payments",
    emoji: "🏦",
    commission: "Processing margin",
    commissionType: "per transaction",
    platformUsers: "400M+ active accounts",
    description:
      "Broad acceptance and buyer trust, especially for users wary of entering card details. PayPal's buyer protection increases conversion for first-time purchasers.",
    features: [
      "PayPal and Venmo checkout buttons",
      "Pay Later (BNPL) option",
      "Buyer protection and dispute resolution",
      "Cryptocurrency checkout option",
      "Recurring billing and subscriptions",
    ],
    signupUrl: "https://developer.paypal.com/home",
    difficulty: "easy",
    revenueStreams: ["commission"],
    supportsInAppCheckout: true,
    geography: "Global — 200+ markets",
  },
];

// ─────────────────────────────────────────────────────────────
//  3. Summary & Commission Tables
// ─────────────────────────────────────────────────────────────

export const CATEGORY_SUMMARY: Record<IntegrationCategory, { label: string; emoji: string; count: number; topCommission: string }> = {
  shopping:  { label: "Shopping & Retail",    emoji: "🛍️", count: 6, topCommission: "Up to 10% per sale"         },
  food:      { label: "Food & Grocery",       emoji: "🍔", count: 4, topCommission: "3–6% per order"             },
  travel:    { label: "Travel & Hotels",      emoji: "✈️", count: 7, topCommission: "4–8% per booking"           },
  events:    { label: "Events & Entertainment",emoji: "🎟️", count: 4, topCommission: "5–10% per ticket"          },
  services:  { label: "Home & Local Services",emoji: "🔧", count: 3, topCommission: "10–20% per lead"            },
  health:    { label: "Health & Wellness",    emoji: "💊", count: 3, topCommission: "20–30% per subscription"    },
  finance:   { label: "Financial Services",   emoji: "💰", count: 3, topCommission: "$50–300 per conversion"     },
  transport: { label: "Rides & Transport",    emoji: "🚗", count: 3, topCommission: "2–4% + lead fees"           },
  payments:  { label: "Payments",             emoji: "💳", count: 3, topCommission: "Processing margin + BNPL"   },
};

export const REVENUE_MODEL_SUMMARY = [
  {
    stream: "Referral commissions" as const,
    description: "Partner pays Mio a % of every completed transaction a Mio user makes through the app",
    range: "1–30% per transaction",
    examples: ["Amazon", "Booking.com", "DoorDash", "TaskRabbit"],
  },
  {
    stream: "Lead fees" as const,
    description: "Partner pays Mio a flat fee for every qualified lead sent (no purchase required)",
    range: "$5–$300 per lead",
    examples: ["Thumbtack", "Zocdoc", "NerdWallet", "GoodRx"],
  },
  {
    stream: "Subscriptions" as const,
    description: "Recurring monthly fee from Mio users for premium access to the platform",
    range: "$9.99–$99.99 per month",
    examples: ["Personal Plan", "Business Plan", "Enterprise", "Merchant API"],
  },
];

// ─────────────────────────────────────────────────────────────
//  4. Helper Utilities
// ─────────────────────────────────────────────────────────────

/** Filter integrations by category */
export function getByCategory(category: IntegrationCategory): ApiIntegration[] {
  return INTEGRATIONS.filter((i) => i.category === category);
}

/** Filter integrations by difficulty */
export function getByDifficulty(difficulty: DifficultyLevel): ApiIntegration[] {
  return INTEGRATIONS.filter((i) => i.difficulty === difficulty);
}

/** Get all integrations that support in-app checkout */
export function getInAppCheckoutReady(): ApiIntegration[] {
  return INTEGRATIONS.filter((i) => i.supportsInAppCheckout);
}

/** Get integrations with a badge (featured / highlighted) */
export function getFeatured(): ApiIntegration[] {
  return INTEGRATIONS.filter((i) => i.badge !== undefined);
}

/** Get integrations available in a specific geography (simple substring match) */
export function getByGeography(region: string): ApiIntegration[] {
  return INTEGRATIONS.filter(
    (i) =>
      i.geography.toLowerCase().includes("global") ||
      i.geography.toLowerCase().includes(region.toLowerCase())
  );
}

/** Return the total number of integrations */
export function getTotalCount(): number {
  return INTEGRATIONS.length;
}

/** Summarise count per revenue stream */
export function getRevenueStreamCounts(): Record<string, number> {
  const counts: Record<string, number> = { commission: 0, "lead-fee": 0, subscription: 0 };
  for (const i of INTEGRATIONS) {
    for (const stream of i.revenueStreams) {
      counts[stream] = (counts[stream] ?? 0) + 1;
    }
  }
  return counts;
}

// ─────────────────────────────────────────────────────────────
//  5. React Reference Table Component
// ─────────────────────────────────────────────────────────────

const DIFF_STYLES: Record<DifficultyLevel, { label: string; color: string; bg: string }> = {
  easy:   { label: "Easy",     color: "#15803d", bg: "#dcfce7" },
  medium: { label: "Medium",   color: "#b45309", bg: "#fef3c7" },
  hard:   { label: "Advanced", color: "#6d28d9", bg: "#ede9fe" },
};

const ALL_CATEGORIES = ["all", ...Object.keys(CATEGORY_SUMMARY)] as const;

export default function IntegrationReferenceTable() {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const visible = INTEGRATIONS.filter((i) => {
    const matchCat = filter === "all" || i.category === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      i.name.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.categoryLabel.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>
        MioBot API & Affiliate Integration Reference
      </h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>
        {getTotalCount()} integrations across {Object.keys(CATEGORY_SUMMARY).length} categories
      </p>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: filter === cat ? "none" : "1px solid #d1d5db",
              background: filter === cat ? "#7c3aed" : "#fff",
              color: filter === cat ? "#fff" : "#374151",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {cat === "all" ? "All" : CATEGORY_SUMMARY[cat as IntegrationCategory]?.emoji + " " + CATEGORY_SUMMARY[cat as IntegrationCategory]?.label}
          </button>
        ))}
      </div>

      <input
        type="search"
        placeholder="Search integrations…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", maxWidth: 400, padding: "8px 14px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14, marginBottom: 24, boxSizing: "border-box" }}
      />

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e5e7eb", textAlign: "left" }}>
              <th style={{ padding: "10px 12px", color: "#374151" }}>Partner</th>
              <th style={{ padding: "10px 12px", color: "#374151" }}>Category</th>
              <th style={{ padding: "10px 12px", color: "#374151" }}>Commission</th>
              <th style={{ padding: "10px 12px", color: "#374151" }}>Basis</th>
              <th style={{ padding: "10px 12px", color: "#374151" }}>Difficulty</th>
              <th style={{ padding: "10px 12px", color: "#374151" }}>In-App Checkout</th>
              <th style={{ padding: "10px 12px", color: "#374151" }}>Geography</th>
              <th style={{ padding: "10px 12px", color: "#374151" }}>Apply</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((i, idx) => {
              const d = DIFF_STYLES[i.difficulty];
              return (
                <tr key={i.id} style={{ borderBottom: "1px solid #f3f4f6", background: idx % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: "#0f1035" }}>
                    {i.emoji} {i.name}
                    {i.badge && (
                      <span style={{ marginLeft: 6, padding: "2px 7px", borderRadius: 12, background: "#7c3aed", color: "#fff", fontSize: 10, fontWeight: 700 }}>
                        {i.badge}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "10px 12px", color: "#6b7280" }}>{i.categoryLabel}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: "#7c3aed" }}>{i.commission}</td>
                  <td style={{ padding: "10px 12px", color: "#6b7280", whiteSpace: "nowrap" }}>{i.commissionType}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ padding: "3px 9px", borderRadius: 12, background: d.bg, color: d.color, fontSize: 12, fontWeight: 600 }}>
                      {d.label}
                    </span>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>
                    {i.supportsInAppCheckout ? "✅" : "🔗"}
                  </td>
                  <td style={{ padding: "10px 12px", color: "#6b7280", fontSize: 12 }}>{i.geography}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <a href={i.signupUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#7c3aed", fontWeight: 600, textDecoration: "none", fontSize: 12 }}>
                      Sign up →
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: "#9ca3af" }}>
        ✅ = full purchase completed inside MioBot · 🔗 = MioBot recommends, user books on partner site<br />
        Commission rates are typical affiliate programme rates and may vary. Always confirm current rates in the partner portal.
      </p>
    </div>
  );
}
