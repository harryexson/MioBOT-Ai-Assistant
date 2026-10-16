/**
 * Mock aggregator API responses that simulate real provider integrations.
 * In production these would be replaced with real API calls to:
 * - Shopping: Amazon Product API, Shopify, eBay Partner Network
 * - Food: DoorDash, Uber Eats, Grubhub API
 * - Travel: Amadeus, Booking.com Affiliate, Skyscanner API
 * - Services: Thumbtack, TaskRabbit API
 * - Events: Ticketmaster Discovery API, Eventbrite
 * - Payments: Stripe, PayPal Commerce
 * Commission rates represent real referral program rates.
 */

export const PROVIDERS = {
  shopping: [
    { id: "amz", name: "Amazon", logo: "AMZ", commissionRate: 0.04, category: "shopping" },
    { id: "ebay", name: "eBay", logo: "eBay", commissionRate: 0.05, category: "shopping" },
    { id: "walmart", name: "Walmart", logo: "WMT", commissionRate: 0.04, category: "shopping" },
    { id: "target", name: "Target", logo: "TGT", commissionRate: 0.05, category: "shopping" },
  ],
  food: [
    { id: "doordash", name: "DoorDash", logo: "DoorDash", commissionRate: 0.03, category: "food" },
    { id: "ubereats", name: "Uber Eats", logo: "UberEats", commissionRate: 0.03, category: "food" },
    { id: "grubhub", name: "Grubhub", logo: "GH", commissionRate: 0.04, category: "food" },
    { id: "mcd", name: "McDonald's", logo: "MCD", commissionRate: 0.05, category: "food" },
  ],
  travel: [
    { id: "booking", name: "Booking.com", logo: "BKG", commissionRate: 0.04, category: "travel" },
    { id: "expedia", name: "Expedia", logo: "EXP", commissionRate: 0.05, category: "travel" },
    { id: "airbnb", name: "Airbnb", logo: "AIR", commissionRate: 0.03, category: "travel" },
    { id: "hotels", name: "Hotels.com", logo: "HTL", commissionRate: 0.06, category: "travel" },
  ],
  events: [
    { id: "ticketmaster", name: "Ticketmaster", logo: "TM", commissionRate: 0.05, category: "events" },
    { id: "eventbrite", name: "Eventbrite", logo: "EVB", commissionRate: 0.04, category: "events" },
    { id: "stubhub", name: "StubHub", logo: "STH", commissionRate: 0.10, category: "events" },
  ],
  services: [
    { id: "thumbtack", name: "Thumbtack", logo: "TTK", commissionRate: 0.15, category: "services" },
    { id: "taskrabbit", name: "TaskRabbit", logo: "TR", commissionRate: 0.10, category: "services" },
    { id: "angi", name: "Angi", logo: "Angi", commissionRate: 0.12, category: "services" },
  ],
};

// Mock search results by category
export async function searchProducts(query, category = "shopping") {
  await new Promise(r => setTimeout(r, 600)); // simulate network delay
  
  const results = {
    shopping: [
      { id: "p1", name: "Sony WH-1000XM5 Headphones", price: 349.99, originalPrice: 399.99, rating: 4.8, reviews: 12847, emoji: "Headphones", provider: "Amazon", commissionRate: 0.04, badge: "Best Seller", deliveryTime: "2-day" },
      { id: "p2", name: "Apple AirPods Pro (2nd gen)", price: 189.99, originalPrice: 249.00, rating: 4.9, reviews: 9412, emoji: "Earbuds", provider: "Amazon", commissionRate: 0.04, badge: "Prime Deal", deliveryTime: "1-day" },
      { id: "p3", name: "Nike Air Max 270", price: 119.99, originalPrice: 150.00, rating: 4.7, reviews: 5632, emoji: "Shoes", provider: "Walmart", commissionRate: 0.04, badge: "20% off", deliveryTime: "3-day" },
      { id: "p4", name: "Samsonite Carry-On Luggage", price: 89.99, originalPrice: 129.99, rating: 4.6, reviews: 3241, emoji: "Luggage", provider: "Target", commissionRate: 0.05, badge: "Sale", deliveryTime: "2-day" },
      { id: "p5", name: "Kindle Paperwhite (16 GB)", price: 139.99, originalPrice: 159.99, rating: 4.8, reviews: 28903, emoji: "E-Reader", provider: "Amazon", commissionRate: 0.04, badge: "Amazon Choice", deliveryTime: "1-day" },
    ],
    food: [
      { id: "f1", name: "McDonald's Big Mac Meal", price: 10.99, rating: 4.5, reviews: 2847, emoji: "Burger", provider: "DoorDash", commissionRate: 0.03, badge: "25 min", deliveryTime: "25 min", restaurant: "McDonald's" },
      { id: "f2", name: "Pepperoni Pizza (Large)", price: 18.99, rating: 4.7, reviews: 1234, emoji: "Pizza", provider: "Uber Eats", commissionRate: 0.03, badge: "30 min", deliveryTime: "30 min", restaurant: "Pizza Hut" },
      { id: "f3", name: "California Burrito + Chips", price: 14.50, rating: 4.8, reviews: 892, emoji: "Burrito", provider: "Grubhub", commissionRate: 0.04, badge: "40 min", deliveryTime: "40 min", restaurant: "Chipotle" },
      { id: "f4", name: "Pad Thai + Spring Rolls", price: 22.00, rating: 4.9, reviews: 654, emoji: "Noodles", provider: "DoorDash", commissionRate: 0.03, badge: "35 min", deliveryTime: "35 min", restaurant: "Thai Garden" },
    ],
    travel: [
      { id: "t1", name: "The Langham Chicago", price: 229, rating: 4.8, reviews: 1847, emoji: "Hotel", provider: "Booking.com", commissionRate: 0.04, badge: "Free cancellation", city: "Chicago, IL" },
      { id: "t2", name: "Renaissance Chicago Downtown", price: 189, rating: 4.6, reviews: 2341, emoji: "Hotel", provider: "Expedia", commissionRate: 0.05, badge: "Member deal", city: "Chicago, IL" },
      { id: "t3", name: "Hyatt Place Chicago", price: 149, rating: 4.5, reviews: 3201, emoji: "Hotel", provider: "Hotels.com", commissionRate: 0.06, badge: "10 nights 1 free", city: "Chicago, IL" },
      { id: "t4", name: "Chicago Riverwalk Airbnb", price: 119, rating: 4.9, reviews: 287, emoji: "Rental", provider: "Airbnb", commissionRate: 0.03, badge: "Superhost", city: "Chicago, IL" },
    ],
    events: [
      { id: "e1", name: "Taylor Swift — The Eras Tour", price: 189, rating: 5.0, reviews: 9821, emoji: "🎤", provider: "Ticketmaster", commissionRate: 0.05, badge: "Hot 🔥", venue: "United Center" },
      { id: "e2", name: "NBA Bulls vs Lakers", price: 79, rating: 4.8, reviews: 4321, emoji: "🏀", provider: "StubHub", commissionRate: 0.10, badge: "Best seats", venue: "United Center" },
      { id: "e3", name: "Chicago Jazz Festival", price: 35, rating: 4.7, reviews: 1823, emoji: "🎷", provider: "Eventbrite", commissionRate: 0.04, badge: "Outdoor", venue: "Millennium Park" },
    ],
    services: [
      { id: "s1", name: "House Cleaning — 3 bedroom", price: 149, rating: 4.9, reviews: 2341, emoji: "🧹", provider: "Thumbtack", commissionRate: 0.15, badge: "Today available", availability: "Today, 2pm" },
      { id: "s2", name: "Plumber — Pipe Repair", price: 89, rating: 4.8, reviews: 987, emoji: "🔧", provider: "Angi", commissionRate: 0.12, badge: "Background checked", availability: "Tomorrow, 10am" },
      { id: "s3", name: "Personal Trainer (1hr)", price: 65, rating: 4.9, reviews: 543, emoji: "💪", provider: "TaskRabbit", commissionRate: 0.10, badge: "Top Rated", availability: "Today, 4pm" },
    ],
  };

  const categoryResults = results[category] || results.shopping;
  
  // Filter by query if provided
  if (query && query.trim()) {
    const q = query.toLowerCase();
    return categoryResults.filter(r => 
      r.name.toLowerCase().includes(q) || 
      (r.restaurant || "").toLowerCase().includes(q) ||
      (r.badge || "").toLowerCase().includes(q)
    ).length > 0 
      ? categoryResults.filter(r => 
          r.name.toLowerCase().includes(q) || 
          (r.restaurant || "").toLowerCase().includes(q)
        )
      : categoryResults;
  }
  
  return categoryResults;
}

export async function getRecommendations(userHistory = []) {
  await new Promise(r => setTimeout(r, 400));
  return [
    { id: "r1", name: "Running Shoes under $150", category: "shopping", emoji: "👟", reason: "Based on your searches" },
    { id: "r2", name: "Thai restaurants near you", category: "food", emoji: "🍜", reason: "You ordered Thai last week" },
    { id: "r3", name: "Hotel deals in Miami", category: "travel", emoji: "🏖️", reason: "Spring break coming up" },
    { id: "r4", name: "Concert tickets this weekend", category: "events", emoji: "🎵", reason: "Events near you" },
  ];
}

export const SUBSCRIPTION_PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    priceYearly: 0,
    description: "Get started with Mio",
    features: ["10 AI searches/day", "Basic shopping & food", "Community support", "Standard recommendations"],
    cta: "Get Started Free",
    popular: false,
    color: "#f8f7ff",
  },
  {
    id: "personal",
    name: "Personal",
    price: 9.99,
    priceYearly: 7.99,
    description: "Everything you need daily",
    features: ["Unlimited AI searches", "All 10 categories", "Price tracking & alerts", "Priority recommendations", "Order history & tracking", "Save favourites"],
    cta: "Start Free Trial",
    popular: true,
    color: "#7c3aed",
  },
  {
    id: "business",
    name: "Business",
    price: 29.99,
    priceYearly: 24.99,
    description: "For merchants & teams",
    features: ["Everything in Personal", "Merchant dashboard", "API access (1,000 calls/mo)", "Analytics & insights", "Team accounts (up to 5)", "Priority support", "Custom NFC tags"],
    cta: "Start Free Trial",
    popular: false,
    color: "#0f1035",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    priceYearly: null,
    description: "Custom for large teams",
    features: ["Unlimited API calls", "Unlimited team members", "White-label option", "Custom integrations", "SLA guarantee", "Dedicated account manager", "Revenue share program"],
    cta: "Contact Sales",
    popular: false,
    color: "#1a1b4b",
  },
];
