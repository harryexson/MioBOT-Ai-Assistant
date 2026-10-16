import { useState } from "react";
import { pb } from "../lib/pb.js";

const CATEGORIES = [
  { id: "all", label: "All Partners" },
  { id: "shopping", label: "Shopping" },
  { id: "food", label: "Food & Grocery" },
  { id: "travel", label: "Travel & Hotels" },
  { id: "events", label: "Events" },
  { id: "services", label: "Home Services" },
  { id: "health", label: "Health" },
  { id: "finance", label: "Finance" },
  { id: "transport", label: "Transport" },
];

const PARTNERS = [
  // Shopping
  { id: "amazon", name: "Amazon", category: "shopping", logo: "🛍️", commission: "1–10%", perks: "Largest product catalogue, Prime delivery", difficulty: "Easy", joined: 50000, link: "https://affiliate-program.amazon.com" },
  { id: "ebay", name: "eBay", category: "shopping", logo: "🏷️", commission: "1–6%", perks: "Auctions + Buy-It-Now, global reach", difficulty: "Easy", joined: 12000, link: "https://partnernetwork.ebay.com" },
  { id: "walmart", name: "Walmart", category: "shopping", logo: "🏪", commission: "1–4%", perks: "Same-day pickup, groceries, electronics", difficulty: "Easy", joined: 8000, link: "https://affiliates.walmart.com" },
  { id: "shopify", name: "Shopify Partners", category: "shopping", logo: "🛒", commission: "Negotiated", perks: "Thousands of indie brands in one API", difficulty: "Medium", joined: 4000, link: "https://www.shopify.com/partners" },
  { id: "rakuten", name: "Rakuten / CJ", category: "shopping", logo: "💎", commission: "Varies", perks: "3,000+ retailers in a single integration", difficulty: "Medium", joined: 9000, link: "https://www.cj.com" },
  // Food
  { id: "doordash", name: "DoorDash", category: "food", logo: "🍔", commission: "3–5%", perks: "Largest US food delivery network", difficulty: "Easy", joined: 15000, link: "https://developer.doordash.com" },
  { id: "ubereats", name: "Uber Eats", category: "food", logo: "🍕", commission: "3–6%", perks: "Global restaurant coverage", difficulty: "Easy", joined: 20000, link: "https://www.ubereats.com/developer" },
  { id: "instacart", name: "Instacart", category: "food", logo: "🥦", commission: "3–5%", perks: "Grocery delivery in 2 hours", difficulty: "Easy", joined: 6000, link: "https://www.instacart.com/business" },
  { id: "grubhub", name: "Grubhub", category: "food", logo: "🍜", commission: "4%", perks: "Restaurant discovery + ordering", difficulty: "Easy", joined: 7000, link: "https://corporate.grubhub.com" },
  // Travel
  { id: "booking", name: "Booking.com", category: "travel", logo: "🏨", commission: "4–6%", perks: "2M+ hotels, instant confirmation", difficulty: "Easy", joined: 18000, link: "https://www.booking.com/affiliate-program" },
  { id: "expedia", name: "Expedia EAN", category: "travel", logo: "✈️", commission: "3–6%", perks: "Flights + hotels bundled", difficulty: "Medium", joined: 11000, link: "https://expediapartnernetral.com" },
  { id: "airbnb", name: "Airbnb", category: "travel", logo: "🏡", commission: "$40–75/booking", perks: "Unique stays worldwide", difficulty: "Easy", joined: 14000, link: "https://www.airbnb.com/associates" },
  { id: "viator", name: "Viator", category: "travel", logo: "🗺️", commission: "8%", perks: "Tours, activities, day trips", difficulty: "Easy", joined: 3000, link: "https://www.viatorforpartners.com" },
  { id: "amadeus", name: "Amadeus", category: "travel", logo: "🛫", commission: "1–3%", perks: "Real-time flight inventory + booking", difficulty: "Hard", joined: 2000, link: "https://developers.amadeus.com" },
  // Events
  { id: "ticketmaster", name: "Ticketmaster", category: "events", logo: "🎟️", commission: "2–5%", perks: "Concerts, sports, theatre worldwide", difficulty: "Medium", joined: 9000, link: "https://developer.ticketmaster.com" },
  { id: "eventbrite", name: "Eventbrite", category: "events", logo: "📅", commission: "4%", perks: "Local events, conferences, classes", difficulty: "Easy", joined: 5000, link: "https://www.eventbrite.com/affiliate-program" },
  { id: "stubhub", name: "StubHub", category: "events", logo: "🏟️", commission: "5–10%", perks: "Resale tickets, last-minute events", difficulty: "Easy", joined: 4000, link: "https://www.stubhub.com/affiliates" },
  // Services
  { id: "thumbtack", name: "Thumbtack", category: "services", logo: "🔧", commission: "10–20%", perks: "Plumbers, cleaners, movers, electricians", difficulty: "Medium", joined: 6000, link: "https://www.thumbtack.com" },
  { id: "taskrabbit", name: "TaskRabbit", category: "services", logo: "🐇", commission: "15%", perks: "Handyman, assembly, moving help", difficulty: "Easy", joined: 5000, link: "https://www.taskrabbit.com/affiliates" },
  { id: "angi", name: "Angi", category: "services", logo: "🏠", commission: "10–15%", perks: "Home improvement professionals", difficulty: "Easy", joined: 4000, link: "https://www.angi.com" },
  // Health
  { id: "zocdoc", name: "Zocdoc", category: "health", logo: "🩺", commission: "Per appt.", perks: "Book doctors, dentists, specialists", difficulty: "Medium", joined: 3000, link: "https://www.zocdoc.com/partner" },
  { id: "goodrx", name: "GoodRx", category: "health", logo: "💊", commission: "Per Rx", perks: "Drug price comparison + discounts", difficulty: "Easy", joined: 2000, link: "https://www.goodrx.com/affiliates" },
  // Finance
  { id: "plaid", name: "Plaid", category: "finance", logo: "🏦", commission: "Per user", perks: "Bank account linking for payments", difficulty: "Hard", joined: 8000, link: "https://plaid.com/developers" },
  { id: "policygenius", name: "PolicyGenius", category: "finance", logo: "🛡️", commission: "$20–150/policy", perks: "Compare + buy insurance", difficulty: "Easy", joined: 2000, link: "https://www.policygenius.com/affiliates" },
  // Transport
  { id: "uber", name: "Uber", category: "transport", logo: "🚗", commission: "$5–15/rider", perks: "Rides, scheduled pickups", difficulty: "Easy", joined: 12000, link: "https://www.uber.com/us/en/drive/affiliate" },
  { id: "trainline", name: "Trainline", category: "transport", logo: "🚆", commission: "2–4%", perks: "UK/EU rail booking", difficulty: "Easy", joined: 3000, link: "https://www.thetrainline.com/affiliates" },
];

export default function PartnerPortal() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [applying, setApplying] = useState(null);
  const [form, setForm] = useState({ business_name: "", contact_email: "", monthly_volume: "" });
  const [submitted, setSubmitted] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const filtered = PARTNERS.filter(p =>
    (category === "all" || p.category === category) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.includes(search.toLowerCase()))
  );

  async function handleApply(e) {
    e.preventDefault();
    if (!form.business_name || !form.contact_email) {
      setError("Please fill in your business name and email.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await pb.collection("partner_applications").create({
        business_name: form.business_name,
        contact_email: form.contact_email,
        partner_name: applying.name,
        category: applying.category,
        monthly_volume: form.monthly_volume,
        status: "pending",
      });
      setSubmitted(applying);
      setApplying(null);
      setForm({ business_name: "", contact_email: "", monthly_volume: "" });
    } catch {
      setError("Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const diffColor = { Easy: "#22c55e", Medium: "#f59e0b", Hard: "#ef4444" };

  return (
    <main style={{ minHeight: "100vh", background: "#05061a", fontFamily: "var(--font-sans, DM Sans, sans-serif)" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg,#0f1035 0%,#1a0a3c 60%,#0f1035 100%)", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.18)", border: "1px solid rgba(124,58,237,0.35)", borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#a78bfa", letterSpacing: 1, textTransform: "uppercase" }}>Partner Portal</span>
        </div>
        <h1 style={{ fontFamily: "var(--font-display, Syne, sans-serif)", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, color: "#fff", margin: "0 0 16px", lineHeight: 1.1 }}>
          Connect. Earn. Grow.
        </h1>
        <p style={{ color: "#c4c9d4", fontSize: "clamp(1rem,2vw,1.2rem)", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.7 }}>
          Apply to any of our 25+ affiliate partners and start earning referral commissions the moment your first user completes a purchase through MioBot.
        </p>
        {/* Stats */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "center", maxWidth: 700, margin: "0 auto" }}>
          {[
            { v: "25+", l: "Partner Networks" },
            { v: "8", l: "Categories" },
            { v: "Up to 20%", l: "Commission Rate" },
            { v: "$300", l: "Max Per Lead" },
          ].map(s => (
            <div key={s.l} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "16px 28px", minWidth: 130 }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#a78bfa", fontFamily: "var(--font-display, Syne)" }}>{s.v}</div>
              <div style={{ fontSize: "0.78rem", color: "#9ca3af", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "56px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--font-display, Syne)", fontSize: "1.6rem", fontWeight: 800, color: "#fff", marginBottom: 32, textAlign: "center" }}>How You Earn</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20 }}>
          {[
            { n: "01", t: "Apply", d: "Click any partner card and fill in one short form. Your application is saved instantly." },
            { n: "02", t: "Get Your Key", d: "Follow the partner's direct link (takes ~5 min) to receive your affiliate API key." },
            { n: "03", t: "Users Discover", d: "MioBot surfaces partner results when users search, shop, book, and order." },
            { n: "04", t: "You Earn", d: "Every completed purchase or lead generates a commission — tracked and shown in your dashboard." },
          ].map(s => (
            <div key={s.n} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 16, padding: "24px 20px" }}>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "#7c3aed", fontFamily: "var(--font-display, Syne)", marginBottom: 10 }}>{s.n}</div>
              <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: 8 }}>{s.t}</div>
              <div style={{ fontSize: "0.88rem", color: "#9ca3af", lineHeight: 1.6 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter + search */}
      <section style={{ padding: "0 24px 20px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20, alignItems: "center" }}>
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search partners…"
            aria-label="Search partners"
            style={{ flex: "1 1 200px", padding: "10px 16px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "#fff", fontSize: "0.9rem", outline: "none" }}
          />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              style={{ padding: "7px 16px", borderRadius: 20, border: "1px solid", borderColor: category === c.id ? "#7c3aed" : "rgba(255,255,255,0.12)", background: category === c.id ? "#7c3aed" : "rgba(255,255,255,0.04)", color: category === c.id ? "#fff" : "#9ca3af", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", transition: "all .15s" }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Partner grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
          {filtered.map(p => (
            <article key={p.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "22px 20px", transition: "border-color .2s", cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontSize: "2rem", width: 48, height: 48, background: "rgba(124,58,237,0.12)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{p.logo}</div>
                  <div>
                    <h3 style={{ margin: 0, color: "#fff", fontSize: "1rem", fontWeight: 700 }}>{p.name}</h3>
                    <span style={{ fontSize: "0.72rem", color: "#6b7280", textTransform: "capitalize" }}>{p.category.replace("_"," ")}</span>
                  </div>
                </div>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, color: diffColor[p.difficulty] || "#9ca3af", background: "rgba(0,0,0,0.3)", padding: "3px 8px", borderRadius: 8 }}>{p.difficulty}</span>
              </div>

              <div style={{ background: "rgba(124,58,237,0.1)", borderRadius: 8, padding: "8px 12px", marginBottom: 12 }}>
                <span style={{ fontSize: "0.75rem", color: "#a78bfa", fontWeight: 600 }}>Your commission: </span>
                <span style={{ fontSize: "0.88rem", color: "#c4b5fd", fontWeight: 800 }}>{p.commission}</span>
              </div>

              <p style={{ margin: "0 0 16px", fontSize: "0.82rem", color: "#9ca3af", lineHeight: 1.5 }}>{p.perks}</p>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={() => { setApplying(p); setSubmitted(null); setError(""); }}
                  style={{ flex: 1, padding: "9px 0", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", border: "none", borderRadius: 8, color: "#fff", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer" }}
                >
                  Apply Now
                </button>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ padding: "9px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "#9ca3af", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none" }}
                >
                  Docs ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Apply modal */}
      {applying && (
        <div role="dialog" aria-modal="true" aria-label={`Apply to ${applying.name}`}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 24 }}
          onClick={e => { if (e.target === e.currentTarget) setApplying(null); }}
        >
          <div style={{ background: "#0f1035", border: "1px solid rgba(124,58,237,0.4)", borderRadius: 20, padding: "36px 32px", maxWidth: 480, width: "100%" }}>
            <div style={{ fontSize: "2.4rem", marginBottom: 8, textAlign: "center" }}>{applying.logo}</div>
            <h2 style={{ fontFamily: "var(--font-display, Syne)", color: "#fff", fontSize: "1.4rem", fontWeight: 800, margin: "0 0 4px", textAlign: "center" }}>Apply to {applying.name}</h2>
            <p style={{ color: "#9ca3af", fontSize: "0.85rem", textAlign: "center", marginBottom: 24 }}>Earn <strong style={{ color: "#a78bfa" }}>{applying.commission}</strong> per transaction</p>

            <form onSubmit={handleApply}>
              <div style={{ marginBottom: 16 }}>
                <label htmlFor="biz" style={{ display: "block", fontSize: "0.8rem", color: "#c4c9d4", fontWeight: 600, marginBottom: 6 }}>Business Name *</label>
                <input id="biz" type="text" value={form.business_name} onChange={e => setForm(f => ({ ...f, business_name: e.target.value }))} required
                  style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#fff", fontSize: "0.9rem", boxSizing: "border-box" }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label htmlFor="email" style={{ display: "block", fontSize: "0.8rem", color: "#c4c9d4", fontWeight: 600, marginBottom: 6 }}>Contact Email *</label>
                <input id="email" type="email" value={form.contact_email} onChange={e => setForm(f => ({ ...f, contact_email: e.target.value }))} required
                  style={{ width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: "#fff", fontSize: "0.9rem", boxSizing: "border-box" }} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label htmlFor="vol" style={{ display: "block", fontSize: "0.8rem", color: "#c4c9d4", fontWeight: 600, marginBottom: 6 }}>Expected Monthly Volume</label>
                <select id="vol" value={form.monthly_volume} onChange={e => setForm(f => ({ ...f, monthly_volume: e.target.value }))}
                  style={{ width: "100%", padding: "10px 14px", background: "#0f1035", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, color: form.monthly_volume ? "#fff" : "#6b7280", fontSize: "0.9rem", boxSizing: "border-box" }}>
                  <option value="">Select range…</option>
                  <option value="under-1k">Under $1,000/mo</option>
                  <option value="1k-10k">$1,000 – $10,000/mo</option>
                  <option value="10k-50k">$10,000 – $50,000/mo</option>
                  <option value="50k-plus">$50,000+/mo</option>
                </select>
              </div>
              {error && <p role="alert" style={{ color: "#f87171", fontSize: "0.82rem", marginBottom: 14 }}>{error}</p>}
              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" onClick={() => setApplying(null)}
                  style={{ flex: 1, padding: "11px 0", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "#9ca3af", fontSize: "0.9rem", cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  style={{ flex: 2, padding: "11px 0", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", border: "none", borderRadius: 10, color: "#fff", fontSize: "0.9rem", fontWeight: 700, cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? "Submitting…" : "Submit Application"}
                </button>
              </div>
              <a href={applying.link} target="_blank" rel="noopener noreferrer"
                style={{ display: "block", textAlign: "center", marginTop: 14, fontSize: "0.78rem", color: "#6b7280", textDecoration: "none" }}>
                Then visit {applying.name}'s portal to get your API key ↗
              </a>
            </form>
          </div>
        </div>
      )}

      {/* Success toast */}
      {submitted && (
        <div role="status"
          style={{ position: "fixed", bottom: 32, right: 32, background: "#1a2c1a", border: "1px solid #22c55e", borderRadius: 14, padding: "18px 24px", maxWidth: 340, zIndex: 1000 }}>
          <div style={{ fontWeight: 700, color: "#4ade80", marginBottom: 6 }}>✓ Application submitted!</div>
          <div style={{ fontSize: "0.85rem", color: "#86efac", lineHeight: 1.5 }}>
            Your {submitted.name} application is saved. Head to their portal to complete the API key setup — it takes about 5 minutes.
          </div>
          <button onClick={() => setSubmitted(null)} style={{ marginTop: 12, background: "none", border: "none", color: "#6b7280", fontSize: "0.8rem", cursor: "pointer" }}>Dismiss</button>
        </div>
      )}
    </main>
  );
}
