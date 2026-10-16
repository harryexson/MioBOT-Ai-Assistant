import { useState } from "react";
import { Link } from "react-router";
import { pb } from "../lib/pb.js";
import CheckIcon from "icon:check";
import ExternalLinkIcon from "icon:external-link";
import ZapIcon from "icon:zap";
import ShieldIcon from "icon:shield";
import TrendingUpIcon from "icon:trending-up";
import StarIcon from "icon:star";
import SearchIcon from "icon:search";
import ChevronRightIcon from "icon:chevron-right";
import XIcon from "icon:x";

// ── All aggregator integrations ──────────────────────────────────────────────
const INTEGRATIONS = [
  // Shopping & Retail
  { id: "amazon", name: "Amazon", category: "shopping", categoryLabel: "Shopping & Retail", emoji: "🛒", commission: "1–10%", commissionType: "per sale", users: "200M+", description: "Access 350 million products. Users search, compare, and buy through Mio — you earn on every sale.", features: ["Product search API", "Price comparison", "Review data", "2-day Prime delivery"], signupUrl: "https://affiliate-program.amazon.com", difficulty: "easy", badge: "Most Popular" },
  { id: "ebay", name: "eBay", category: "shopping", categoryLabel: "Shopping & Retail", emoji: "🔨", commission: "1–6%", commissionType: "per sale", users: "135M+", description: "New & used goods, auctions, collectibles. Great for finding unique items at unbeatable prices.", features: ["Browse & Search API", "Trading API", "Finding API", "Buy API"], signupUrl: "https://partnernetwork.ebay.com", difficulty: "easy" },
  { id: "walmart", name: "Walmart", category: "shopping", categoryLabel: "Shopping & Retail", emoji: "🏪", commission: "1–4%", commissionType: "per sale", users: "120M+", description: "Same-day pickup, groceries, electronics and general retail — the everyday essentials store.", features: ["Product lookup", "Inventory check", "Store pickup", "Grocery delivery"], signupUrl: "https://affiliates.walmart.com", difficulty: "easy" },
  { id: "cj", name: "CJ Affiliate", category: "shopping", categoryLabel: "Shopping & Retail", emoji: "🔗", commission: "Varies", commissionType: "per retailer", users: "3,800+ brands", description: "One connection to 3,800+ retailers including Lowe's, Overstock, Zappos, and thousands more.", features: ["Single API, 3,800 brands", "Real-time tracking", "Deep link generation", "Cross-device attribution"], signupUrl: "https://cj.com", difficulty: "medium", badge: "Best Coverage" },
  { id: "rakuten", name: "Rakuten Advertising", category: "shopping", categoryLabel: "Shopping & Retail", emoji: "🌸", commission: "Varies", commissionType: "per retailer", users: "1,000+ brands", description: "Premium brand partnerships — Macy's, Sephora, Levi's, Samsung and more.", features: ["Brand partner network", "Real-time reporting", "Coupon & deals API", "Multi-currency"], signupUrl: "https://rakutenadvertising.com", difficulty: "medium" },

  // Food & Grocery
  { id: "doordash", name: "DoorDash", category: "food", categoryLabel: "Food & Grocery", emoji: "🚪", commission: "3–5%", commissionType: "per order", users: "37M+ active", description: "Food delivery from 600,000+ restaurants. Users order through Mio's conversational UI in seconds.", features: ["Restaurant search", "Menu & ordering", "Real-time tracking", "Ratings & reviews"], signupUrl: "https://developer.doordash.com", difficulty: "medium", badge: "Top Pick" },
  { id: "ubereats", name: "Uber Eats", category: "food", categoryLabel: "Food & Grocery", emoji: "🚗", commission: "3–6%", commissionType: "per order", users: "88M+ users", description: "Global food delivery in 6,000+ cities. Widest restaurant selection of any delivery platform.", features: ["Global coverage", "Grocery delivery", "Group ordering", "Scheduled delivery"], signupUrl: "https://developer.uber.com/docs/eats", difficulty: "medium" },
  { id: "instacart", name: "Instacart", category: "food", categoryLabel: "Food & Grocery", emoji: "🛒", commission: "3–5%", commissionType: "per order", users: "10M+ users", description: "Grocery delivery in as little as 1 hour from 1,400+ retailers including Costco, Kroger, Aldi.", features: ["Multi-store shopping", "1-hour delivery", "Prescription pickup", "Loyalty card sync"], signupUrl: "https://instacart.com/business", difficulty: "easy" },
  { id: "grubhub", name: "Grubhub", category: "food", categoryLabel: "Food & Grocery", emoji: "🍕", commission: "4%", commissionType: "per order", users: "22M+ diners", description: "Strong US east coast and major city coverage. Campus dining a speciality.", features: ["Restaurant API", "Delivery estimation", "Points & rewards", "Corporate ordering"], signupUrl: "https://corporate.grubhub.com", difficulty: "medium" },

  // Travel & Hotels
  { id: "amadeus", name: "Amadeus", category: "travel", categoryLabel: "Travel & Hotels", emoji: "✈️", commission: "1–3%", commissionType: "per booking", users: "Industry standard", description: "The world's largest flight search GDS. Real-time prices across every airline globally.", features: ["Flight search & booking", "Seat selection", "Hotel data", "Trip intelligence"], signupUrl: "https://developers.amadeus.com", difficulty: "hard", badge: "Enterprise" },
  { id: "booking", name: "Booking.com", category: "travel", categoryLabel: "Travel & Hotels", emoji: "🏨", commission: "4–6%", commissionType: "per stay", users: "150M+ room nights", description: "2.4 million properties worldwide. Instant confirmation, free cancellation on most stays.", features: ["Property search", "Instant booking", "Reviews API", "Multi-currency"], signupUrl: "https://www.booking.com/affiliate-program", difficulty: "easy", badge: "Highest Volume" },
  { id: "expedia", name: "Expedia", category: "travel", categoryLabel: "Travel & Hotels", emoji: "🌍", commission: "3–6%", commissionType: "per booking", users: "600M+ annual visitors", description: "Flights + hotels in one search. The best option for bundle bookings and holiday packages.", features: ["Bundle deals", "Price alerts", "TAAP partner program", "Loyalty points"], signupUrl: "https://expedia.com/affiliate-network", difficulty: "medium" },
  { id: "airbnb", name: "Airbnb", category: "travel", categoryLabel: "Travel & Hotels", emoji: "🏠", commission: "$40–75", commissionType: "per booking", users: "150M+ guests", description: "Unique stays, experiences, and entire homes. The go-to for longer stays and off-the-beaten-path trips.", features: ["Listing search", "Experiences API", "Calendar API", "Host connect"], signupUrl: "https://airbnb.com/affiliates", difficulty: "medium" },
  { id: "viator", name: "Viator / TripAdvisor", category: "travel", categoryLabel: "Travel & Hotels", emoji: "🎡", commission: "8%", commissionType: "per booking", users: "300,000+ experiences", description: "Tours, activities, and experiences in 200+ countries. Perfect for adding 'things to do' to any trip.", features: ["Experience search", "Activity booking", "Review data", "Private tours"], signupUrl: "https://www.viator.com/info/affiliate-program", difficulty: "easy" },

  // Events & Entertainment
  { id: "ticketmaster", name: "Ticketmaster", category: "events", categoryLabel: "Events & Entertainment", emoji: "🎟️", commission: "2–5%", commissionType: "per ticket", users: "500M+ tickets/year", description: "The world's largest ticketing marketplace — concerts, sports, theatre, and comedy.", features: ["Event discovery", "Ticket purchase", "Venue maps", "Resale market"], signupUrl: "https://developer.ticketmaster.com", difficulty: "medium", badge: "Market Leader" },
  { id: "eventbrite", name: "Eventbrite", category: "events", categoryLabel: "Events & Entertainment", emoji: "🎪", commission: "4%", commissionType: "per ticket", users: "3M+ events/year", description: "Local events, classes, festivals, and conferences. Especially strong for community and niche events.", features: ["Event search", "Ticketing", "Organizer data", "Category browse"], signupUrl: "https://www.eventbrite.com/platform", difficulty: "easy" },
  { id: "stubhub", name: "StubHub", category: "events", categoryLabel: "Events & Entertainment", emoji: "🎫", commission: "5–10%", commissionType: "per ticket", users: "10M+ buyers", description: "The premier resale ticket marketplace. Best for sold-out events, last-minute tickets, and premium seats.", features: ["Resale search", "FanProtect guarantee", "Price trend data", "Instant download"], signupUrl: "https://www.viagogo.com/affiliates", difficulty: "medium" },
  { id: "seatgeek", name: "SeatGeek", category: "events", categoryLabel: "Events & Entertainment", emoji: "🏟️", commission: "5–10%", commissionType: "per ticket", users: "20M+ users", description: "Smart ticket buying with a Deal Score that shows which tickets are the best value in real time.", features: ["Deal Score API", "Price predictions", "All-in pricing", "Venue maps"], signupUrl: "https://seatgeek.com/info/affiliates", difficulty: "medium" },

  // Home & Local Services
  { id: "thumbtack", name: "Thumbtack", category: "services", categoryLabel: "Home & Local Services", emoji: "📌", commission: "10–20%", commissionType: "per lead", users: "10M+ jobs done", description: "Book plumbers, electricians, cleaners, movers, photographers — 1,000+ service categories.", features: ["Pro search & match", "Quote requests", "Background checks", "Instant booking"], signupUrl: "https://pro.thumbtack.com", difficulty: "medium", badge: "Highest Commission" },
  { id: "taskrabbit", name: "TaskRabbit", category: "services", categoryLabel: "Home & Local Services", emoji: "🐰", commission: "15%", commissionType: "per booking", users: "140+ cities", description: "On-demand handymen, furniture assembly, cleaning, and moving help — booked in minutes.", features: ["Tasker matching", "Real-time availability", "Instant booking", "IKEA partnership"], signupUrl: "https://www.taskrabbit.com/affiliates", difficulty: "easy" },
  { id: "angi", name: "Angi", category: "services", categoryLabel: "Home & Local Services", emoji: "🔧", commission: "10–15%", commissionType: "per lead", users: "150M+ reviews", description: "Home improvement pros — the most trusted network with verified reviews and guaranteed work.", features: ["Pro matching", "Fixed-price projects", "Instant booking", "Angi Key membership"], signupUrl: "https://pro.angi.com", difficulty: "medium" },

  // Health & Wellness
  { id: "zocdoc", name: "Zocdoc", category: "health", categoryLabel: "Health & Wellness", emoji: "🏥", commission: "Per appointment", commissionType: "per booking", users: "6M+ patients/month", description: "Book doctors, dentists, and specialists with real-time availability and insurance verification.", features: ["Specialty search", "Insurance check", "Real-time booking", "Telehealth"], signupUrl: "https://www.zocdoc.com/about/partnerships", difficulty: "hard" },
  { id: "goodrx", name: "GoodRx", category: "health", categoryLabel: "Health & Wellness", emoji: "💊", commission: "Per prescription", commissionType: "per referral", users: "25M+ users", description: "Compare drug prices across pharmacies. Save users up to 80% on prescriptions instantly.", features: ["Drug price search", "Coupon generation", "Pharmacy finder", "Manufacturer coupons"], signupUrl: "https://www.goodrx.com/affiliates", difficulty: "easy" },
  { id: "calm", name: "Calm / Headspace", category: "health", categoryLabel: "Health & Wellness", emoji: "🧘", commission: "20–30%", commissionType: "per subscription", users: "150M+ downloads", description: "Meditation, sleep, and mindfulness apps. Recurring subscription commissions every renewal.", features: ["Guided meditations", "Sleep stories", "Breathing exercises", "Corporate wellness"], signupUrl: "https://www.calm.com/business", difficulty: "easy" },

  // Financial Services
  { id: "nerdwallet", name: "NerdWallet", category: "finance", categoryLabel: "Financial Services", emoji: "💳", commission: "$50–300", commissionType: "per conversion", users: "20M+ monthly", description: "Credit cards, loans, mortgages, insurance — every financial product compared in one place.", features: ["Product comparison", "Rate search", "Credit score tools", "Application tracking"], signupUrl: "https://www.nerdwallet.com/advertising", difficulty: "medium", badge: "Highest Payout" },
  { id: "lemonade", name: "Lemonade", category: "finance", categoryLabel: "Financial Services", emoji: "🍋", commission: "$20–150", commissionType: "per policy", users: "1.5M+ customers", description: "AI-powered insurance for renters, homeowners, pets, and cars. Instant quotes in 90 seconds.", features: ["Instant quotes", "AI claims", "Policy API", "Giveback program"], signupUrl: "https://www.lemonade.com/affiliates", difficulty: "easy" },

  // Rides & Transport
  { id: "uber", name: "Uber", category: "transport", categoryLabel: "Rides & Transport", emoji: "🚕", commission: "$5–15", commissionType: "per new rider", users: "131M+ monthly", description: "Ride-hailing in 10,000+ cities worldwide. Users request rides through Mio without opening another app.", features: ["Ride request API", "Price estimate", "Surge indicator", "Scheduled rides"], signupUrl: "https://developer.uber.com", difficulty: "medium" },
  { id: "rome2rio", name: "Rome2rio", category: "transport", categoryLabel: "Rides & Transport", emoji: "🗺️", commission: "CPC + 2–4%", commissionType: "per booking", users: "12M+ monthly", description: "Compare every transport mode — plane, train, bus, ferry, car — for any journey in one search.", features: ["Multi-modal search", "Price comparison", "Duration estimates", "Booking handoff"], signupUrl: "https://www.rome2rio.com/partners", difficulty: "easy" },

  // Payments (checkout layer)
  { id: "stripe", name: "Stripe Connect", category: "payments", categoryLabel: "Payments", emoji: "💳", commission: "Processing margin", commissionType: "per transaction", users: "Global", description: "Accept payments from users and split revenue with merchants automatically. The backbone of Mio's checkout.", features: ["Card payments", "Apple/Google Pay", "Klarna BNPL", "Revenue split"], signupUrl: "https://stripe.com/connect", difficulty: "medium", badge: "Recommended" },
  { id: "klarna", name: "Klarna", category: "payments", categoryLabel: "Payments", emoji: "🛍️", commission: "1–3%", commissionType: "per transaction", users: "150M+ users", description: "Buy Now Pay Later at checkout. Increases conversion by letting users spread the cost of any purchase.", features: ["Pay in 4", "Pay in 30 days", "Financing", "Merchant boost"], signupUrl: "https://www.klarna.com/business/merchant-support", difficulty: "easy" },
];

const CATEGORIES = [
  { id: "all", label: "All Categories", emoji: "🌐" },
  { id: "shopping", label: "Shopping", emoji: "🛍️" },
  { id: "food", label: "Food & Grocery", emoji: "🍔" },
  { id: "travel", label: "Travel", emoji: "✈️" },
  { id: "events", label: "Events", emoji: "🎟️" },
  { id: "services", label: "Home Services", emoji: "🔧" },
  { id: "health", label: "Health", emoji: "💊" },
  { id: "finance", label: "Finance", emoji: "💰" },
  { id: "transport", label: "Transport", emoji: "🚗" },
  { id: "payments", label: "Payments", emoji: "💳" },
];

const DIFFICULTIES = { easy: { label: "Easy setup", color: "#16a34a", bg: "#dcfce7" }, medium: { label: "Moderate", color: "#d97706", bg: "#fef3c7" }, hard: { label: "Advanced", color: "#7c3aed", bg: "#f5f3ff" } };

function SignupModal({ integration, onClose }) {
  const [form, setForm] = useState({ business_name: "", contact_name: "", contact_email: "", website: "", monthly_volume: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await pb.collection("partner_signups").create({
        provider_id: integration.id,
        provider_name: integration.name,
        category: integration.category,
        ...form,
        status: "applied",
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(15,16,53,0.6)", backdropFilter: "blur(8px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Connect ${integration.name}`}
    >
      <div style={{ background: "#fff", borderRadius: 24, padding: 32, maxWidth: 520, width: "100%", position: "relative", boxShadow: "0 24px 80px rgba(124,58,237,0.18)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "#f3f4f6", border: "none", borderRadius: 10, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} aria-label="Close">
          <XIcon size={18} />
        </button>

        {status === "done" ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <CheckIcon size={28} style={{ color: "#fff" }} />
            </div>
            <h2 style={{ fontFamily: "Manrope,sans-serif", fontSize: 22, fontWeight: 800, color: "#0f1035", marginBottom: 12 }}>Application Saved!</h2>
            <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
              Your interest in connecting <strong>{integration.name}</strong> has been saved. We'll be in touch to walk you through the API setup and get your affiliate account live.
            </p>
            <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 24 }}>
              In the meantime, you can start the official sign-up directly with {integration.name} — the link below opens their partner portal.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href={integration.signupUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 24px", borderRadius: 12, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                Open {integration.name} Partner Portal <ExternalLinkIcon size={14} />
              </a>
              <button onClick={onClose} style={{ padding: "12px 24px", borderRadius: 12, border: "1.5px solid #ede9fe", background: "#fff", color: "#374151", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "DM Sans,sans-serif" }}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>
                {integration.emoji}
              </div>
              <div>
                <h2 style={{ fontFamily: "Manrope,sans-serif", fontSize: 20, fontWeight: 800, color: "#0f1035", margin: 0 }}>Connect {integration.name}</h2>
                <p style={{ margin: 0, fontSize: 13, color: "#7c3aed", fontWeight: 600 }}>{integration.commission} {integration.commissionType}</p>
              </div>
            </div>

            <p style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
              Tell us about your business — we'll handle the API integration and walk you through getting your affiliate account approved.
            </p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label htmlFor="biz-name" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Business name</label>
                  <input id="biz-name" type="text" required value={form.business_name} onChange={e => setForm(f => ({ ...f, business_name: e.target.value }))} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, fontFamily: "DM Sans,sans-serif", outline: "none", boxSizing: "border-box" }} placeholder="Mio AI Ltd" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label htmlFor="contact-name" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Your name</label>
                    <input id="contact-name" type="text" required value={form.contact_name} onChange={e => setForm(f => ({ ...f, contact_name: e.target.value }))} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, fontFamily: "DM Sans,sans-serif", outline: "none", boxSizing: "border-box" }} placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email</label>
                    <input id="contact-email" type="email" required value={form.contact_email} onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, fontFamily: "DM Sans,sans-serif", outline: "none", boxSizing: "border-box" }} placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="website" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Website (optional)</label>
                  <input id="website" type="url" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, fontFamily: "DM Sans,sans-serif", outline: "none", boxSizing: "border-box" }} placeholder="https://yoursite.com" />
                </div>
                <div>
                  <label htmlFor="volume" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Estimated monthly transaction volume</label>
                  <select id="volume" value={form.monthly_volume} onChange={e => setForm(f => ({ ...f, monthly_volume: e.target.value }))} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, fontFamily: "DM Sans,sans-serif", outline: "none", background: "#fff", boxSizing: "border-box" }}>
                    <option value="">Select a range</option>
                    <option value="under-10k">Under $10,000</option>
                    <option value="10k-50k">$10,000 – $50,000</option>
                    <option value="50k-200k">$50,000 – $200,000</option>
                    <option value="200k-1m">$200,000 – $1 million</option>
                    <option value="over-1m">Over $1 million</option>
                  </select>
                </div>
              </div>

              {status === "error" && (
                <p role="status" style={{ color: "#dc2626", fontSize: 13, marginTop: 12, padding: "10px 14px", background: "#fef2f2", borderRadius: 10 }}>
                  Something went wrong — please try again in a moment.
                </p>
              )}

              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button type="submit" disabled={status === "submitting"} style={{ flex: 1, padding: "13px 24px", borderRadius: 12, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", fontWeight: 700, fontSize: 15, border: "none", cursor: status === "submitting" ? "not-allowed" : "pointer", opacity: status === "submitting" ? 0.7 : 1, fontFamily: "Manrope,sans-serif" }}>
                  {status === "submitting" ? "Saving…" : "Submit Application"}
                </button>
                <a href={integration.signupUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "13px 18px", borderRadius: 12, border: "1.5px solid #ede9fe", color: "#7c3aed", fontWeight: 600, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" }}>
                  Partner portal <ExternalLinkIcon size={13} />
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function IntegrationCard({ integration, onConnect }) {
  const diff = DIFFICULTIES[integration.difficulty];
  return (
    <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #ede9fe", padding: 24, display: "flex", flexDirection: "column", gap: 16, transition: "all 0.2s", boxShadow: "0 2px 12px rgba(124,58,237,0.06)", cursor: "default", position: "relative", overflow: "hidden" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(124,58,237,0.14)"; e.currentTarget.style.borderColor = "#c4b5fd"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px rgba(124,58,237,0.06)"; e.currentTarget.style.borderColor = "#ede9fe"; }}
    >
      {integration.badge && (
        <div style={{ position: "absolute", top: 16, right: 16, padding: "4px 10px", borderRadius: 20, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", fontSize: 11, fontWeight: 700 }}>
          {integration.badge}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
          {integration.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <h3 style={{ fontFamily: "Manrope,sans-serif", fontSize: 16, fontWeight: 800, color: "#0f1035", margin: 0 }}>{integration.name}</h3>
            <span style={{ padding: "2px 8px", borderRadius: 20, background: diff.bg, color: diff.color, fontSize: 11, fontWeight: 600 }}>{diff.label}</span>
          </div>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: "#6b7280" }}>{integration.categoryLabel} · {integration.users} users</p>
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg,#f5f3ff,#ede9fe)", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ margin: 0, fontSize: 11, color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>You earn</p>
          <p style={{ margin: "2px 0 0", fontSize: 18, fontWeight: 800, color: "#7c3aed", fontFamily: "Manrope,sans-serif" }}>{integration.commission}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>{integration.commissionType}</p>
          <TrendingUpIcon size={20} style={{ color: "#7c3aed", marginTop: 2 }} />
        </div>
      </div>

      <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{integration.description}</p>

      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
        {integration.features.map(f => (
          <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#4b5563" }}>
            <CheckIcon size={13} style={{ color: "#7c3aed", flexShrink: 0 }} /> {f}
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
        <button
          onClick={() => onConnect(integration)}
          style={{ flex: 1, padding: "11px 16px", borderRadius: 12, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer", fontFamily: "Manrope,sans-serif" }}
        >
          Connect &amp; Apply
        </button>
        <a
          href={integration.signupUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "11px 14px", borderRadius: 12, border: "1.5px solid #ede9fe", color: "#6b7280", textDecoration: "none", transition: "color 0.2s" }}
          aria-label={`Open ${integration.name} partner portal`}
        >
          <ExternalLinkIcon size={15} />
        </a>
      </div>
    </div>
  );
}

export default function Integrations() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  const filtered = INTEGRATIONS.filter(i => {
    const matchCat = activeCategory === "all" || i.category === activeCategory;
    const matchSearch = !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.description.toLowerCase().includes(search.toLowerCase()) || i.categoryLabel.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalCommissionLow = INTEGRATIONS.reduce((s, i) => {
    const v = parseFloat(i.commission.replace(/[^0-9.]/g, "").split("–")[0]);
    return s + (isNaN(v) ? 0 : v);
  }, 0);

  return (
    <main style={{ paddingTop: 64, background: "#ffffff", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(160deg, #0f1035 0%, #1a1b4b 50%, #2d1b69 100%)", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 20, background: "rgba(124,58,237,0.25)", border: "1px solid rgba(124,58,237,0.4)", marginBottom: 24 }}>
            <ZapIcon size={14} style={{ color: "#a78bfa" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#a78bfa" }}>30+ Revenue-Generating Integrations</span>
          </div>
          <h1 style={{ fontFamily: "Manrope,sans-serif", fontSize: "clamp(32px,5vw,56px)", fontWeight: 900, color: "#ffffff", lineHeight: 1.1, marginBottom: 20 }}>
            Every API that makes<br />
            <span style={{ background: "linear-gradient(135deg,#a78bfa,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Mio earn for you</span>
          </h1>
          <p style={{ fontSize: "clamp(16px,2vw,19px)", color: "#c4b5fd", lineHeight: 1.7, marginBottom: 40 }}>
            Connect the world's leading shopping, food, travel, events, services, and payment platforms. Every transaction your users complete earns Mio a referral commission — automatically.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px,4vw,60px)", flexWrap: "wrap" }}>
            {[
              { label: "Partner integrations", value: "30+" },
              { label: "Categories covered", value: "9" },
              { label: "Commission per sale", value: "Up to 20%" },
              { label: "Revenue streams", value: "3 types" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <p style={{ margin: 0, fontFamily: "Manrope,sans-serif", fontSize: 28, fontWeight: 900, color: "#fff" }}>{s.value}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#a78bfa", marginTop: 2 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How earnings work */}
      <section style={{ background: "#f8f7ff", padding: "56px 24px", borderBottom: "1px solid #ede9fe" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Manrope,sans-serif", fontSize: 26, fontWeight: 800, color: "#0f1035", textAlign: "center", marginBottom: 8 }}>Three ways Mio earns</h2>
          <p style={{ textAlign: "center", color: "#6b7280", fontSize: 15, marginBottom: 40 }}>Every integration contributes to at least one of these revenue streams</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {[
              { icon: <TrendingUpIcon size={24} style={{ color: "#7c3aed" }} />, title: "Referral commissions", desc: "When a Mio user buys a product, books a hotel, orders food, or completes any purchase through the app, the partner pays Mio a percentage of the transaction value — automatically, on the backend.", range: "1–20% per transaction" },
              { icon: <StarIcon size={24} style={{ color: "#7c3aed" }} />, title: "Lead fees", desc: "For service-based categories like home repair, legal, or financial products — where there's no instant purchase — Mio earns a flat fee for every qualified lead sent to the partner.", range: "$5–$300 per lead" },
              { icon: <ShieldIcon size={24} style={{ color: "#7c3aed" }} />, title: "User & business subscriptions", desc: "Platform revenue from your own users: free tier to get started, Personal at $9.99/mo, Business at $29.99/mo. Merchants also pay for premium placement and API access.", range: "$9.99–$99.99/month" },
            ].map(item => (
              <div key={item.title} style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #ede9fe", padding: 28 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: "Manrope,sans-serif", fontSize: 17, fontWeight: 800, color: "#0f1035", marginBottom: 10 }}>{item.title}</h3>
                <p style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.7, marginBottom: 14 }}>{item.desc}</p>
                <div style={{ padding: "8px 14px", borderRadius: 10, background: "#f5f3ff", display: "inline-block" }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed" }}>{item.range}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section style={{ padding: "56px 24px", maxWidth: 1300, margin: "0 auto" }}>
        {/* Search + filter bar */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: "1 1 260px" }}>
              <SearchIcon size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
              <input
                type="search"
                placeholder="Search integrations…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search integrations"
                style={{ width: "100%", paddingLeft: 42, paddingRight: 16, paddingTop: 11, paddingBottom: 11, borderRadius: 50, border: "1.5px solid #e5e7eb", fontSize: 14, fontFamily: "DM Sans,sans-serif", outline: "none", background: "#f9fafb", boxSizing: "border-box" }}
              />
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "#6b7280", whiteSpace: "nowrap" }}>{filtered.length} integrations</p>
          </div>

          {/* Category pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{ padding: "8px 16px", borderRadius: 50, border: activeCategory === cat.id ? "none" : "1.5px solid #e5e7eb", background: activeCategory === cat.id ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#fff", color: activeCategory === cat.id ? "#fff" : "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "DM Sans,sans-serif", transition: "all 0.2s" }}
              >
                <span>{cat.emoji}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <p style={{ fontSize: 40, marginBottom: 16 }}>🔍</p>
            <p style={{ fontSize: 18, color: "#374151", fontWeight: 700 }}>No integrations found</p>
            <p style={{ color: "#6b7280" }}>Try a different search or category</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
            {filtered.map(integration => (
              <IntegrationCard key={integration.id} integration={integration} onConnect={setSelectedIntegration} />
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section style={{ background: "linear-gradient(160deg,#0f1035,#2d1b69)", padding: "72px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "Manrope,sans-serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 900, color: "#fff", marginBottom: 16 }}>
            Ready to start earning?
          </h2>
          <p style={{ color: "#c4b5fd", fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
            Connect your first integration and start generating referral commissions from day one. We handle the API setup — you focus on growing your user base.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/signin" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 14, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", fontWeight: 700, fontSize: 15, textDecoration: "none", fontFamily: "Manrope,sans-serif" }}>
              Get started free <ChevronRightIcon size={16} />
            </Link>
            <Link to="/pricing" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 14, border: "1.5px solid rgba(196,181,253,0.4)", color: "#c4b5fd", fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
              View pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedIntegration && (
        <SignupModal integration={selectedIntegration} onClose={() => setSelectedIntegration(null)} />
      )}
    </main>
  );
}
