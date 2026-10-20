/**
 * MioBot AI Assistant
 * API Aggregators, Providers & Merchant Services — Complete Reference
 *
 * Drop <IntegrationReferenceTable /> anywhere in your app to render
 * a searchable, filterable table of all integrations.
 *
 * Generated: 2026-10-16
 */

import React, { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Category =
  | "shopping"
  | "food"
  | "travel"
  | "events"
  | "services"
  | "rides"
  | "health"
  | "realestate"
  | "finance"
  | "shipping"
  | "payments"
  | "ai";

export type Difficulty = "easy" | "medium" | "hard";

export interface Integration {
  id: string;
  name: string;
  category: Category;
  categoryLabel: string;
  description: string;
  commission: string;
  commissionType: string;
  difficulty: Difficulty;
  supportsInAppCheckout: boolean;
  geography: string;
  signupUrl: string;
  docsUrl: string;
  badge?: string; // e.g. "Featured" | "High Value"
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const INTEGRATIONS: Integration[] = [
  // ── Shopping & Retail ───────────────────────────────────────────────────────
  {
    id: "amazon",
    name: "Amazon Product Advertising API",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    description: "350M+ products, Prime delivery, reviews, and wish lists.",
    commission: "1–10%",
    commissionType: "Per sale (varies by category)",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://affiliate-program.amazon.com",
    docsUrl: "https://webservices.amazon.com/paapi5/documentation/",
    badge: "Featured",
  },
  {
    id: "ebay",
    name: "eBay Partner Network",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    description: "Auctions, new & used goods, collectibles — 1.5B listings.",
    commission: "1–6%",
    commissionType: "Per sale",
    difficulty: "easy",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://partnernetwork.ebay.com",
    docsUrl: "https://developer.ebay.com/api-docs/buy/browse/overview.html",
  },
  {
    id: "walmart",
    name: "Walmart Connect API",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    description: "Groceries, electronics, same-day pickup from 4,700 stores.",
    commission: "1–4%",
    commissionType: "Per sale",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "USA",
    signupUrl: "https://affiliates.walmart.com",
    docsUrl: "https://developer.walmart.com",
  },
  {
    id: "target",
    name: "Target Affiliate (Impact)",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    description: "Fashion, home, beauty, electronics — same-day delivery.",
    commission: "1–8%",
    commissionType: "Per sale",
    difficulty: "easy",
    supportsInAppCheckout: false,
    geography: "USA",
    signupUrl: "https://partners.target.com",
    docsUrl: "https://developer.target.com",
  },
  {
    id: "bestbuy",
    name: "Best Buy Affiliate",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    description: "Consumer electronics, appliances, Geek Squad services.",
    commission: "0.5–2%",
    commissionType: "Per sale",
    difficulty: "easy",
    supportsInAppCheckout: false,
    geography: "USA / Canada",
    signupUrl: "https://www.bestbuy.com/site/misc/affiliate-program/pcmcat158800050013.c",
    docsUrl: "https://bestbuyapis.github.io/api-documentation/",
  },
  {
    id: "etsy",
    name: "Etsy Affiliate API",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    description: "Handmade, vintage, and custom gifts from independent creators.",
    commission: "4%",
    commissionType: "Per sale",
    difficulty: "easy",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://www.etsy.com/affiliates",
    docsUrl: "https://developers.etsy.com",
  },
  {
    id: "shopify",
    name: "Shopify Storefront API",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    description: "Buy from 1M+ independent merchants with headless checkout.",
    commission: "Negotiated",
    commissionType: "Per merchant deal",
    difficulty: "hard",
    supportsInAppCheckout: true,
    geography: "Global",
    signupUrl: "https://www.shopify.com/partners",
    docsUrl: "https://shopify.dev/docs/api/storefront",
    badge: "In-App Checkout",
  },
  {
    id: "cj",
    name: "CJ Affiliate",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    description: "3,000+ retailers in one connection — fashion, home, tech.",
    commission: "Varies",
    commissionType: "Per sale (per retailer)",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://www.cj.com/publisher-signup",
    docsUrl: "https://developers.cj.com",
  },
  {
    id: "rakuten",
    name: "Rakuten Advertising",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    description: "Gap, Macy's, Sephora and 1,000+ brands.",
    commission: "Varies",
    commissionType: "Per sale (per retailer)",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://rakutenadvertising.com/publisher-signup",
    docsUrl: "https://rakutenadvertising.com/technology/api",
  },
  {
    id: "impact",
    name: "Impact.com",
    category: "shopping",
    categoryLabel: "Shopping & Retail",
    description: "Nike, Adidas, Levi's, Lenovo, HP and thousands more.",
    commission: "Varies",
    commissionType: "Per sale (per brand)",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://impact.com/publisher-signup",
    docsUrl: "https://developer.impact.com",
    badge: "High Value",
  },

  // ── Food & Grocery ──────────────────────────────────────────────────────────
  {
    id: "doordash",
    name: "DoorDash Drive API",
    category: "food",
    categoryLabel: "Food & Grocery",
    description: "500,000+ restaurants, real-time order tracking.",
    commission: "3–5%",
    commissionType: "Per order",
    difficulty: "hard",
    supportsInAppCheckout: true,
    geography: "USA / Canada / Australia",
    signupUrl: "https://developer.doordash.com",
    docsUrl: "https://developer.doordash.com/en-US/docs/drive/reference/",
    badge: "In-App Checkout",
  },
  {
    id: "ubereats",
    name: "Uber Eats API",
    category: "food",
    categoryLabel: "Food & Grocery",
    description: "Global restaurant network, 45+ countries, live tracking.",
    commission: "3–6%",
    commissionType: "Per order",
    difficulty: "hard",
    supportsInAppCheckout: true,
    geography: "Global",
    signupUrl: "https://developer.uber.com/docs/eats",
    docsUrl: "https://developer.uber.com/docs/eats/introduction",
    badge: "Featured",
  },
  {
    id: "grubhub",
    name: "Grubhub Partner API",
    category: "food",
    categoryLabel: "Food & Grocery",
    description: "300,000+ restaurants across the US.",
    commission: "4%",
    commissionType: "Per order",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "USA",
    signupUrl: "https://corporate.grubhub.com",
    docsUrl: "https://developer.grubhub.com",
  },
  {
    id: "instacart",
    name: "Instacart Partner API",
    category: "food",
    categoryLabel: "Food & Grocery",
    description: "Kroger, Costco, Whole Foods, Aldi — 2-hour grocery delivery.",
    commission: "3–5%",
    commissionType: "Per order",
    difficulty: "medium",
    supportsInAppCheckout: true,
    geography: "USA / Canada",
    signupUrl: "https://www.instacart.com/business",
    docsUrl: "https://docs.instacart.com/connect",
    badge: "In-App Checkout",
  },
  {
    id: "deliveroo",
    name: "Deliveroo API",
    category: "food",
    categoryLabel: "Food & Grocery",
    description: "Restaurant delivery across UK, EU and Middle East.",
    commission: "3–5%",
    commissionType: "Per order",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "UK / EU / Middle East",
    signupUrl: "https://restaurant-hub.deliveroo.com",
    docsUrl: "https://api-docs.deliveroo.com",
  },
  {
    id: "gopuff",
    name: "Gopuff API",
    category: "food",
    categoryLabel: "Food & Grocery",
    description: "Convenience, snacks, household essentials in 15 minutes.",
    commission: "4%",
    commissionType: "Per order",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "USA / UK",
    signupUrl: "https://partner.gopuff.com",
    docsUrl: "https://developer.gopuff.com",
  },

  // ── Travel ──────────────────────────────────────────────────────────────────
  {
    id: "amadeus",
    name: "Amadeus Travel API",
    category: "travel",
    categoryLabel: "Travel",
    description: "Global flight search, seat selection, hotel and car booking.",
    commission: "1–3%",
    commissionType: "Per ticket/booking",
    difficulty: "hard",
    supportsInAppCheckout: true,
    geography: "Global",
    signupUrl: "https://developers.amadeus.com/register",
    docsUrl: "https://developers.amadeus.com/self-service",
    badge: "Featured",
  },
  {
    id: "booking",
    name: "Booking.com Affiliate API",
    category: "travel",
    categoryLabel: "Travel",
    description: "2.1M properties worldwide — hotels, apartments, villas.",
    commission: "4–6%",
    commissionType: "Per stay",
    difficulty: "easy",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://www.booking.com/affiliate-program",
    docsUrl: "https://developers.booking.com",
    badge: "High Value",
  },
  {
    id: "expedia",
    name: "Expedia Affiliate Network (EAN)",
    category: "travel",
    categoryLabel: "Travel",
    description: "Flights + hotels bundled, 3M+ properties.",
    commission: "3–6%",
    commissionType: "Per booking",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://expediapartnersolutions.com",
    docsUrl: "https://developers.expediagroup.com",
  },
  {
    id: "airbnb",
    name: "Airbnb Affiliate Program",
    category: "travel",
    categoryLabel: "Travel",
    description: "Unique stays, rooms and experiences worldwide.",
    commission: "$40–75",
    commissionType: "Per booking",
    difficulty: "easy",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://www.airbnb.com/associates",
    docsUrl: "https://www.airbnb.com/partner",
  },
  {
    id: "skyscanner",
    name: "Skyscanner API",
    category: "travel",
    categoryLabel: "Travel",
    description: "Compare all flights, car hire and hotels across every airline.",
    commission: "CPC + 2–4%",
    commissionType: "Per click + booking",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://www.skyscanner.net/affiliates",
    docsUrl: "https://developers.skyscanner.net",
  },
  {
    id: "viator",
    name: "Viator (TripAdvisor) API",
    category: "travel",
    categoryLabel: "Travel",
    description: "300,000+ tours, activities and experiences worldwide.",
    commission: "8%",
    commissionType: "Per booking",
    difficulty: "easy",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://www.viator.com/partner",
    docsUrl: "https://docs.viator.com",
    badge: "High Value",
  },
  {
    id: "getyourguide",
    name: "GetYourGuide API",
    category: "travel",
    categoryLabel: "Travel",
    description: "Day trips, city tours and adventure activities.",
    commission: "8%",
    commissionType: "Per booking",
    difficulty: "easy",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://www.getyourguide.com/partner",
    docsUrl: "https://suppliers.getyourguide.com/api",
    badge: "High Value",
  },
  {
    id: "trainline",
    name: "Trainline API",
    category: "travel",
    categoryLabel: "Travel",
    description: "UK & EU rail booking — 270+ train and coach operators.",
    commission: "2–4%",
    commissionType: "Per ticket",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "UK / Europe",
    signupUrl: "https://www.thetrainline.com/affiliate-programme",
    docsUrl: "https://developer.thetrainline.com",
  },

  // ── Events ──────────────────────────────────────────────────────────────────
  {
    id: "ticketmaster",
    name: "Ticketmaster Discovery API",
    category: "events",
    categoryLabel: "Events & Entertainment",
    description: "Concerts, sports, theatre — 500M tickets sold per year.",
    commission: "2–5%",
    commissionType: "Per ticket",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://developer.ticketmaster.com/products-and-docs/partners",
    docsUrl: "https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/",
    badge: "Featured",
  },
  {
    id: "eventbrite",
    name: "Eventbrite API",
    category: "events",
    categoryLabel: "Events & Entertainment",
    description: "4M+ local events, classes, conferences and festivals.",
    commission: "4%",
    commissionType: "Per ticket",
    difficulty: "easy",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://www.eventbrite.com/affiliate-program",
    docsUrl: "https://www.eventbrite.com/platform/api",
  },
  {
    id: "stubhub",
    name: "StubHub API",
    category: "events",
    categoryLabel: "Events & Entertainment",
    description: "Resale tickets for sold-out concerts and sports.",
    commission: "5–10%",
    commissionType: "Per ticket",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://www.stubhub.com/partners",
    docsUrl: "https://developer.stubhub.com",
    badge: "High Value",
  },
  {
    id: "seatgeek",
    name: "SeatGeek API",
    category: "events",
    categoryLabel: "Events & Entertainment",
    description: "Smart ticket pricing and best seat recommendations.",
    commission: "5–10%",
    commissionType: "Per ticket",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "USA",
    signupUrl: "https://seatgeek.com/affiliate-program",
    docsUrl: "https://platform.seatgeek.com",
    badge: "High Value",
  },
  {
    id: "fandango",
    name: "Fandango / Atom Tickets API",
    category: "events",
    categoryLabel: "Events & Entertainment",
    description: "Movie tickets and showtimes at 40,000+ screens.",
    commission: "3–5%",
    commissionType: "Per ticket",
    difficulty: "easy",
    supportsInAppCheckout: false,
    geography: "USA",
    signupUrl: "https://www.fandango.com/affiliates",
    docsUrl: "https://developer.fandango.com",
  },

  // ── Home & Local Services ───────────────────────────────────────────────────
  {
    id: "thumbtack",
    name: "Thumbtack API",
    category: "services",
    categoryLabel: "Home & Local Services",
    description: "1,000+ service types — plumbers, cleaners, movers, electricians.",
    commission: "10–20%",
    commissionType: "Per lead",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "USA",
    signupUrl: "https://www.thumbtack.com/partners",
    docsUrl: "https://www.thumbtack.com/developer",
    badge: "High Value",
  },
  {
    id: "taskrabbit",
    name: "TaskRabbit API",
    category: "services",
    categoryLabel: "Home & Local Services",
    description: "Handyman, furniture assembly, moving and mounting.",
    commission: "15%",
    commissionType: "Per booking",
    difficulty: "medium",
    supportsInAppCheckout: true,
    geography: "USA / UK / EU",
    signupUrl: "https://www.taskrabbit.com/partners",
    docsUrl: "https://developer.taskrabbit.com",
    badge: "In-App Checkout",
  },
  {
    id: "angi",
    name: "Angi (Angie's List) API",
    category: "services",
    categoryLabel: "Home & Local Services",
    description: "Home improvement professionals, verified reviews.",
    commission: "10–15%",
    commissionType: "Per lead",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "USA",
    signupUrl: "https://www.angi.com/pro",
    docsUrl: "https://developer.angi.com",
  },
  {
    id: "handy",
    name: "Handy API",
    category: "services",
    categoryLabel: "Home & Local Services",
    description: "Cleaning and handyman services, same-day booking.",
    commission: "15%",
    commissionType: "Per booking",
    difficulty: "easy",
    supportsInAppCheckout: true,
    geography: "USA / UK / Canada",
    signupUrl: "https://www.handy.com/partners",
    docsUrl: "https://developer.handy.com",
    badge: "In-App Checkout",
  },

  // ── Rides & Transport ───────────────────────────────────────────────────────
  {
    id: "uber",
    name: "Uber Rides API",
    category: "rides",
    categoryLabel: "Rides & Transport",
    description: "Ride-hailing in 70+ countries, UberX to Black.",
    commission: "$5–15",
    commissionType: "Per new rider referred",
    difficulty: "medium",
    supportsInAppCheckout: true,
    geography: "Global",
    signupUrl: "https://developer.uber.com/docs/riders/introduction",
    docsUrl: "https://developer.uber.com/docs/riders",
    badge: "Featured",
  },
  {
    id: "lyft",
    name: "Lyft API",
    category: "rides",
    categoryLabel: "Rides & Transport",
    description: "Ride-hailing across the US and Canada.",
    commission: "$5–10",
    commissionType: "Per new rider referred",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "USA / Canada",
    signupUrl: "https://www.lyft.com/developers",
    docsUrl: "https://developer.lyft.com",
  },
  {
    id: "bolt",
    name: "Bolt API",
    category: "rides",
    categoryLabel: "Rides & Transport",
    description: "Rides, scooters, e-bikes and food delivery in 45 countries.",
    commission: "Per booking",
    commissionType: "Revenue share",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "EU / Africa / Asia",
    signupUrl: "https://bolt.eu/en/business",
    docsUrl: "https://developer.bolt.eu",
  },
  {
    id: "grab",
    name: "Grab API",
    category: "rides",
    categoryLabel: "Rides & Transport",
    description: "Rides, food, deliveries and payments across Southeast Asia.",
    commission: "Per booking",
    commissionType: "Revenue share",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "Southeast Asia",
    signupUrl: "https://developer.grab.com",
    docsUrl: "https://developer.grab.com/docs",
  },

  // ── Health & Wellness ───────────────────────────────────────────────────────
  {
    id: "goodrx",
    name: "GoodRx API",
    category: "health",
    categoryLabel: "Health & Wellness",
    description: "Drug price comparison, pharmacy discount coupons.",
    commission: "Per prescription",
    commissionType: "Per referral",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "USA",
    signupUrl: "https://www.goodrx.com/industry/partnerships",
    docsUrl: "https://developers.goodrx.com",
  },
  {
    id: "zocdoc",
    name: "Zocdoc API",
    category: "health",
    categoryLabel: "Health & Wellness",
    description: "Book doctors, dentists and specialists instantly.",
    commission: "Per appointment",
    commissionType: "Per booking",
    difficulty: "hard",
    supportsInAppCheckout: true,
    geography: "USA",
    signupUrl: "https://www.zocdoc.com/partners",
    docsUrl: "https://api.zocdoc.com",
    badge: "In-App Checkout",
  },
  {
    id: "teladoc",
    name: "Teladoc API",
    category: "health",
    categoryLabel: "Health & Wellness",
    description: "24/7 virtual doctor visits, mental health and nutrition.",
    commission: "Per consultation",
    commissionType: "Per referral",
    difficulty: "hard",
    supportsInAppCheckout: false,
    geography: "USA / Global",
    signupUrl: "https://www.teladochealth.com/partners",
    docsUrl: "https://developer.teladochealth.com",
  },

  // ── Finance ─────────────────────────────────────────────────────────────────
  {
    id: "plaid",
    name: "Plaid API",
    category: "finance",
    categoryLabel: "Financial Services",
    description: "Connect bank accounts for instant, seamless payments.",
    commission: "Per active user",
    commissionType: "Monthly active users",
    difficulty: "medium",
    supportsInAppCheckout: true,
    geography: "USA / UK / EU / Canada",
    signupUrl: "https://plaid.com/partnerships",
    docsUrl: "https://plaid.com/docs",
    badge: "Featured",
  },
  {
    id: "stripe",
    name: "Stripe Connect",
    category: "payments",
    categoryLabel: "Payments",
    description: "Accept payments, run subscriptions, split with merchants.",
    commission: "Processing margin",
    commissionType: "Per transaction",
    difficulty: "medium",
    supportsInAppCheckout: true,
    geography: "Global",
    signupUrl: "https://stripe.com/connect",
    docsUrl: "https://stripe.com/docs/connect",
    badge: "Featured",
  },
  {
    id: "klarna",
    name: "Klarna API",
    category: "payments",
    categoryLabel: "Payments",
    description: "Buy Now Pay Later — split into 4 interest-free payments.",
    commission: "1–3%",
    commissionType: "Per transaction",
    difficulty: "medium",
    supportsInAppCheckout: true,
    geography: "Global",
    signupUrl: "https://www.klarna.com/business/become-a-klarna-partner",
    docsUrl: "https://developers.klarna.com",
    badge: "In-App Checkout",
  },
  {
    id: "nerdwallet",
    name: "NerdWallet Partner API",
    category: "finance",
    categoryLabel: "Financial Services",
    description: "Credit cards, mortgages, loans and investing comparison.",
    commission: "$50–300",
    commissionType: "Per approved application",
    difficulty: "easy",
    supportsInAppCheckout: false,
    geography: "USA / UK",
    signupUrl: "https://www.nerdwallet.com/partners",
    docsUrl: "https://developer.nerdwallet.com",
    badge: "High Value",
  },
  {
    id: "wise",
    name: "Wise API",
    category: "finance",
    categoryLabel: "Financial Services",
    description: "International money transfers at real exchange rates.",
    commission: "Per transfer",
    commissionType: "Revenue share",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://wise.com/partners",
    docsUrl: "https://api-docs.wise.com",
  },

  // ── Shipping & Logistics ─────────────────────────────────────────────────────
  {
    id: "easypost",
    name: "EasyPost API",
    category: "shipping",
    categoryLabel: "Shipping & Logistics",
    description: "UPS, FedEx, USPS, DHL — compare rates & print labels.",
    commission: "Per shipment",
    commissionType: "Volume-based",
    difficulty: "easy",
    supportsInAppCheckout: true,
    geography: "Global",
    signupUrl: "https://www.easypost.com/signup",
    docsUrl: "https://www.easypost.com/docs/api",
  },
  {
    id: "aftership",
    name: "AfterShip API",
    category: "shipping",
    categoryLabel: "Shipping & Logistics",
    description: "Real-time parcel tracking across 700+ carriers.",
    commission: "Per tracked shipment",
    commissionType: "SaaS revenue share",
    difficulty: "easy",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://www.aftership.com/partners",
    docsUrl: "https://www.aftership.com/docs/api/4",
  },

  // ── AI Layer ─────────────────────────────────────────────────────────────────
  {
    id: "openai",
    name: "OpenAI API (GPT-4o)",
    category: "ai",
    categoryLabel: "AI & Intelligence",
    description: "Natural language understanding powering MioBot's conversation engine.",
    commission: "Per token (cost)",
    commissionType: "API cost",
    difficulty: "medium",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://platform.openai.com/signup",
    docsUrl: "https://platform.openai.com/docs",
    badge: "Core",
  },
  {
    id: "googleplaces",
    name: "Google Places API",
    category: "ai",
    categoryLabel: "AI & Intelligence",
    description: "Local business data, ratings, opening hours and maps.",
    commission: "Per request (cost)",
    commissionType: "API cost",
    difficulty: "easy",
    supportsInAppCheckout: false,
    geography: "Global",
    signupUrl: "https://console.cloud.google.com",
    docsUrl: "https://developers.google.com/maps/documentation/places/web-service",
  },
  {
    id: "yelp",
    name: "Yelp Fusion API",
    category: "ai",
    categoryLabel: "AI & Intelligence",
    description: "Restaurant and local business search with verified reviews.",
    commission: "Per request (cost)",
    commissionType: "API cost",
    difficulty: "easy",
    supportsInAppCheckout: false,
    geography: "USA / Canada / EU",
    signupUrl: "https://www.yelp.com/developers/v3/manage_app",
    docsUrl: "https://docs.developer.yelp.com",
  },
];

// ─── Revenue Model ────────────────────────────────────────────────────────────

export interface RevenueStream {
  stream: string;
  range: string;
  description: string;
}

export const REVENUE_MODEL: RevenueStream[] = [
  { stream: "User subscriptions", range: "$9.99–$29.99 / month", description: "Personal plan with monthly search & order limits." },
  { stream: "Business subscriptions", range: "$29.99–$99.99 / month", description: "Merchant/business accounts with analytics and API access." },
  { stream: "Referral commissions", range: "1–20% per purchase", description: "Earned on every completed transaction through a partner API." },
  { stream: "Lead referral fees", range: "$5–$300 per lead", description: "Fixed fee paid by service partners for qualified user referrals." },
  { stream: "Premium merchant placement", range: "Flat monthly fee", description: "Merchants pay to appear first in MioBot search results." },
  { stream: "White-label licensing", range: "Enterprise custom pricing", description: "Other platforms license the MioBot AI engine." },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const CATEGORIES: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "All Categories" },
  { value: "shopping", label: "Shopping & Retail" },
  { value: "food", label: "Food & Grocery" },
  { value: "travel", label: "Travel" },
  { value: "events", label: "Events & Entertainment" },
  { value: "services", label: "Home & Local Services" },
  { value: "rides", label: "Rides & Transport" },
  { value: "health", label: "Health & Wellness" },
  { value: "finance", label: "Financial Services" },
  { value: "payments", label: "Payments" },
  { value: "shipping", label: "Shipping & Logistics" },
  { value: "ai", label: "AI & Intelligence" },
];

export function getByCategory(category: Category): Integration[] {
  return INTEGRATIONS.filter((i) => i.category === category);
}

export function getFeatured(): Integration[] {
  return INTEGRATIONS.filter((i) => i.badge === "Featured");
}

export function getHighValue(): Integration[] {
  return INTEGRATIONS.filter((i) => i.badge === "High Value");
}

export function getInAppCheckoutReady(): Integration[] {
  return INTEGRATIONS.filter((i) => i.supportsInAppCheckout);
}

export function getByDifficulty(difficulty: Difficulty): Integration[] {
  return INTEGRATIONS.filter((i) => i.difficulty === difficulty);
}

export function searchIntegrations(query: string): Integration[] {
  const q = query.toLowerCase();
  return INTEGRATIONS.filter(
    (i) =>
      i.name.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.categoryLabel.toLowerCase().includes(q)
  );
}

// ─── React Component ──────────────────────────────────────────────────────────

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  Featured: { bg: "#7c3aed", color: "#fff" },
  "High Value": { bg: "#059669", color: "#fff" },
  "In-App Checkout": { bg: "#0ea5e9", color: "#fff" },
  Core: { bg: "#f59e0b", color: "#fff" },
};

const DIFF_STYLES: Record<Difficulty, { bg: string; color: string; label: string }> = {
  easy: { bg: "#d1fae5", color: "#065f46", label: "Easy" },
  medium: { bg: "#fef3c7", color: "#92400e", label: "Medium" },
  hard: { bg: "#fee2e2", color: "#991b1b", label: "Advanced" },
};

export function IntegrationReferenceTable() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [checkoutOnly, setCheckoutOnly] = useState(false);

  const visible = INTEGRATIONS.filter((i) => {
    const matchCat = category === "all" || i.category === category;
    const matchSearch =
      !search ||
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase());
    const matchCheckout = !checkoutOnly || i.supportsInAppCheckout;
    return matchCat && matchSearch && matchCheckout;
  });

  return (
    <div style={{ fontFamily: "Manrope, system-ui, sans-serif", color: "#0f1035", maxWidth: 1200, margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 4 }}>MioBot Integration Reference</h1>
      <p style={{ color: "#7c3aed", fontWeight: 600, marginBottom: 24 }}>
        {INTEGRATIONS.length} integrations · {INTEGRATIONS.filter((i) => i.supportsInAppCheckout).length} support in-app checkout
      </p>

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search integrations…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: "1 1 200px", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #e5e7eb", fontSize: 14, outline: "none" }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category | "all")}
          style={{ padding: "10px 14px", borderRadius: 8, border: "1.5px solid #e5e7eb", fontSize: 14, background: "#fff" }}
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer" }}>
          <input type="checkbox" checked={checkoutOnly} onChange={(e) => setCheckoutOnly(e.target.checked)} />
          In-app checkout only
        </label>
      </div>

      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>{visible.length} results</p>

      {/* Table */}
      <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid #e5e7eb" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              {["Provider", "Category", "Commission", "Type", "Difficulty", "Checkout", "Geography", "Apply"].map((h) => (
                <th key={h} style={{ padding: "10px 12px", color: "#374151", fontWeight: 700, textAlign: "left", borderBottom: "2px solid #e5e7eb" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((i, idx) => {
              const d = DIFF_STYLES[i.difficulty];
              return (
                <tr key={i.id} style={{ borderBottom: "1px solid #f3f4f6", background: idx % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: "#0f1035" }}>
                    {i.name}
                    {i.badge && (
                      <span style={{ marginLeft: 6, padding: "2px 7px", borderRadius: 12, background: BADGE_STYLES[i.badge]?.bg ?? "#7c3aed", color: BADGE_STYLES[i.badge]?.color ?? "#fff", fontSize: 10, fontWeight: 700 }}>
                        {i.badge}
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "10px 12px", color: "#6b7280" }}>{i.categoryLabel}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 700, color: "#7c3aed" }}>{i.commission}</td>
                  <td style={{ padding: "10px 12px", color: "#6b7280", whiteSpace: "nowrap" }}>{i.commissionType}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <span style={{ padding: "3px 9px", borderRadius: 12, background: d.bg, color: d.color, fontSize: 12, fontWeight: 600 }}>{d.label}</span>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>{i.supportsInAppCheckout ? "✓" : "—"}</td>
                  <td style={{ padding: "10px 12px", color: "#6b7280", fontSize: 12 }}>{i.geography}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <a href={i.signupUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#7c3aed", fontWeight: 600, textDecoration: "none", fontSize: 12 }}>Sign up →</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: 16, fontSize: 12, color: "#9ca3af" }}>
        ✓ = full purchase completed inside MioBot &nbsp;·&nbsp; — = MioBot recommends, user completes on partner site<br />
        Commission rates are typical affiliate programme rates and may vary. Always confirm current rates in the partner portal.
      </p>

      {/* Revenue Model */}
      <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 40, marginBottom: 16 }}>Revenue Model Summary</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, borderRadius: 12, overflow: "hidden", border: "1px solid #e5e7eb" }}>
        <thead>
          <tr style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)" }}>
            {["Revenue Stream", "Range", "Description"].map((h) => (
              <th key={h} style={{ padding: "10px 16px", color: "#fff", fontWeight: 700, textAlign: "left" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {REVENUE_MODEL.map((r, idx) => (
            <tr key={r.stream} style={{ background: idx % 2 === 0 ? "#fff" : "#fafafa", borderBottom: "1px solid #f3f4f6" }}>
              <td style={{ padding: "10px 16px", fontWeight: 700, color: "#0f1035" }}>{r.stream}</td>
              <td style={{ padding: "10px 16px", fontWeight: 700, color: "#7c3aed" }}>{r.range}</td>
              <td style={{ padding: "10px 16px", color: "#6b7280" }}>{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IntegrationReferenceTable;
