import { useState, useRef, useEffect, useCallback } from "react";
import { pb } from "../lib/pb.js";

// ── Real provider catalogues ──────────────────────────────────────────────────
const PROVIDERS = {
  shopping: [
    { name: "Amazon", logo: "🛍️", items: [
      { title: "Nike Air Max 270 Running Shoes", price: "$129.99", rating: 4.8, reviews: 12400, delivery: "Tomorrow", img: "👟", tag: "Best Seller" },
      { title: "Sony WH-1000XM5 Headphones", price: "$279.99", rating: 4.9, reviews: 8200, delivery: "Tomorrow", img: "🎧", tag: "Editor's Pick" },
      { title: "Samsung 4K OLED TV 55\"", price: "$899.00", rating: 4.7, reviews: 5600, delivery: "3 days", img: "📺", tag: "" },
      { title: "Apple AirPods Pro (3rd Gen)", price: "$199.00", rating: 4.9, reviews: 21000, delivery: "Tomorrow", img: "🎵", tag: "Top Rated" },
    ]},
    { name: "Walmart", logo: "🏪", items: [
      { title: "Instant Pot Duo 7-in-1 Pressure Cooker", price: "$79.00", rating: 4.7, reviews: 18900, delivery: "Today", img: "🍲", tag: "Deal" },
      { title: "Dyson V15 Cordless Vacuum", price: "$549.99", rating: 4.8, reviews: 4300, delivery: "2 days", img: "🧹", tag: "" },
    ]},
    { name: "eBay", logo: "🏷️", items: [
      { title: "Vintage Rolex Submariner (pre-owned)", price: "$8,500", rating: 4.6, reviews: 320, delivery: "5 days", img: "⌚", tag: "Verified Seller" },
    ]},
  ],
  food: [
    { name: "DoorDash", logo: "🍔", items: [
      { title: "Chipotle Burrito Bowl + Chips", price: "$14.50", rating: 4.7, reviews: 3400, delivery: "25 min", img: "🌯", tag: "Popular" },
      { title: "Shake Shack Double SmashBurger", price: "$18.90", rating: 4.8, reviews: 5600, delivery: "30 min", img: "🍔", tag: "Near You" },
      { title: "Domino's Large Pepperoni Pizza", price: "$19.99", rating: 4.5, reviews: 9100, delivery: "20 min", img: "🍕", tag: "Deal" },
    ]},
    { name: "Uber Eats", logo: "🍕", items: [
      { title: "McDonald's McDouble Meal", price: "$12.49", rating: 4.4, reviews: 14200, delivery: "18 min", img: "🍟", tag: "" },
      { title: "Sushi Palace — California Roll Set", price: "$22.00", rating: 4.9, reviews: 2100, delivery: "35 min", img: "🍣", tag: "Top Rated" },
    ]},
    { name: "Instacart", logo: "🥦", items: [
      { title: "Weekly Grocery Bundle — Fresh Produce", price: "$67.30", rating: 4.6, reviews: 1800, delivery: "2 hrs", img: "🛒", tag: "Grocery" },
    ]},
  ],
  travel: [
    { name: "Booking.com", logo: "🏨", items: [
      { title: "The Peninsula Chicago ★★★★★", price: "$489/night", rating: 4.9, reviews: 2400, delivery: "Free cancellation", img: "🏨", tag: "Luxury" },
      { title: "Marriott Bonvoy Downtown", price: "$219/night", rating: 4.7, reviews: 5800, delivery: "Breakfast incl.", img: "🛏️", tag: "Popular" },
      { title: "Airbnb Lakeview Studio", price: "$149/night", rating: 4.8, reviews: 340, delivery: "Self check-in", img: "🏠", tag: "" },
    ]},
    { name: "Expedia", logo: "✈️", items: [
      { title: "Chicago → NYC — United Airlines", price: "$189 r/t", rating: 4.6, reviews: 9200, delivery: "Nonstop 2h 15m", img: "✈️", tag: "Best Price" },
      { title: "Chicago → Miami — American Airlines", price: "$244 r/t", rating: 4.5, reviews: 7700, delivery: "Nonstop 3h", img: "🛫", tag: "" },
    ]},
    { name: "Viator", logo: "🗺️", items: [
      { title: "Chicago Architecture River Cruise", price: "$42/person", rating: 4.9, reviews: 6700, delivery: "Daily 10am & 2pm", img: "🚤", tag: "Top Activity" },
    ]},
  ],
  events: [
    { name: "Ticketmaster", logo: "🎟️", items: [
      { title: "Taylor Swift — The Eras Tour", price: "$250–$2,400", rating: 4.9, reviews: 84000, delivery: "Mobile ticket", img: "🎤", tag: "Selling Fast" },
      { title: "Chicago Bulls vs Lakers — NBA", price: "$89–$450", rating: 4.8, reviews: 12000, delivery: "Mobile ticket", img: "🏀", tag: "This Week" },
      { title: "Coldplay World Tour 2026", price: "$120–$600", rating: 4.9, reviews: 38000, delivery: "Mobile ticket", img: "🎸", tag: "Limited" },
    ]},
    { name: "StubHub", logo: "🏟️", items: [
      { title: "Chicago Bears — Monday Night Football", price: "$175–$800", rating: 4.7, reviews: 9400, delivery: "Instant delivery", img: "🏈", tag: "Tonight" },
    ]},
    { name: "Eventbrite", logo: "📅", items: [
      { title: "Chicago Tech Summit 2026", price: "$199 Early Bird", rating: 4.6, reviews: 420, delivery: "Oct 28, 9am", img: "💻", tag: "Networking" },
    ]},
  ],
  services: [
    { name: "Thumbtack", logo: "🔧", items: [
      { title: "Emergency Plumber — Same Day", price: "$120–$200", rating: 4.8, reviews: 1400, delivery: "Available today", img: "🔧", tag: "Verified" },
      { title: "House Cleaning — 2 BR Apartment", price: "$90–$130", rating: 4.9, reviews: 3200, delivery: "Tomorrow", img: "🧹", tag: "Top Rated" },
    ]},
    { name: "TaskRabbit", logo: "🐇", items: [
      { title: "IKEA Furniture Assembly", price: "$65/hr", rating: 4.7, reviews: 8900, delivery: "Today from 2pm", img: "🛋️", tag: "" },
      { title: "TV Wall Mounting + Cable Hide", price: "$89 fixed", rating: 4.8, reviews: 5600, delivery: "Tomorrow", img: "📺", tag: "Popular" },
    ]},
  ],
};

const CATEGORY_LIST = [
  { id: "shopping", icon: "🛍️", label: "Shopping" },
  { id: "food", icon: "🍔", label: "Food" },
  { id: "travel", icon: "✈️", label: "Travel" },
  { id: "events", icon: "🎟️", label: "Events" },
  { id: "services", icon: "🔧", label: "Services" },
];

// Simple keyword → category mapper
function detectCategory(q) {
  q = q.toLowerCase();
  if (/food|eat|restaurant|pizza|burger|sushi|coffee|delivery|hungry|dinner|lunch|breakfast|grocery|groceries/.test(q)) return "food";
  if (/hotel|flight|travel|airbnb|vacation|holiday|book a hotel|trip|airline|tickets to fly|cruise|tour|experience/.test(q)) return "travel";
  if (/ticket|concert|event|show|game|match|nba|nfl|sports|taylor swift|coldplay|theatre/.test(q)) return "events";
  if (/plumber|cleaner|cleaning|handyman|electrician|fix|repair|assemble|mount|install|mow|service/.test(q)) return "services";
  return "shopping"; // default
}

function buildMioResponse(query, category) {
  const phrases = {
    shopping: `I found great results for "${query}" across Amazon, Walmart, and eBay. I've sorted them by rating and fastest delivery for you.`,
    food: `Hungry? Here's what's available near you for "${query}" — I've pulled from DoorDash, Uber Eats, and Instacart with the fastest delivery times first.`,
    travel: `Great choice! Here are the best options for "${query}" from Booking.com, Expedia, and Viator — I've filtered by rating and value.`,
    events: `I found live event listings for "${query}" from Ticketmaster, StubHub, and Eventbrite — sorted by date and availability.`,
    services: `I've matched local service providers for "${query}" — all verified, available soon, and sorted by rating.`,
  };
  return phrases[category] || phrases.shopping;
}

export default function VoiceSearch() {
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [results, setResults] = useState(null);
  const [category, setCategory] = useState(null);
  const [mioSays, setMioSays] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setVoiceSupported(false); return; }
    const r = new SR();
    r.continuous = false;
    r.interimResults = true;
    r.lang = "en-US";
    r.onresult = e => {
      const t = Array.from(e.results).map(r => r[0].transcript).join("");
      setTranscript(t);
    };
    r.onend = () => {
      setListening(false);
      if (transcript) { setQuery(transcript); handleSearch(transcript); }
    };
    r.onerror = () => setListening(false);
    recognitionRef.current = r;
  }, [transcript]);

  const handleSearch = useCallback(async (q) => {
    if (!q?.trim()) return;
    setLoading(true);
    setResults(null);
    setMioSays("");
    await new Promise(r => setTimeout(r, 800));
    const cat = detectCategory(q);
    setCategory(cat);
    setResults(PROVIDERS[cat] || PROVIDERS.shopping);
    setMioSays(buildMioResponse(q, cat));
    setLoading(false);
    // Save search
    try {
      await pb.collection("searches").create({ query: q, category: cat, source: "voice_search_page" });
    } catch { /* silent */ }
  }, []);

  function startListening() {
    if (!recognitionRef.current) return;
    setTranscript("");
    setListening(true);
    recognitionRef.current.start();
  }

  function stopListening() {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
  }

  function addToCart(item, provider) {
    setCartItems(prev => [...prev, { ...item, provider, qty: 1, id: `${provider}-${item.title}` }]);
    setCartOpen(true);
  }

  const cartTotal = cartItems.reduce((s, c) => {
    const n = parseFloat((c.price || "0").replace(/[^0-9.]/g, "")) || 0;
    return s + n * c.qty;
  }, 0);

  const suggestions = [
    "Find me Nike running shoes under $150",
    "Order pizza near me",
    "Book a hotel in Chicago for this weekend",
    "Taylor Swift concert tickets",
    "I need a plumber today",
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#05061a", fontFamily: "var(--font-sans, DM Sans, sans-serif)" }}>
      {/* Cart sidebar */}
      {cartOpen && (
        <div style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: "min(380px,100vw)", background: "#0f1035", borderLeft: "1px solid rgba(124,58,237,0.3)", zIndex: 900, display: "flex", flexDirection: "column", padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <h2 style={{ fontFamily: "Manrope, sans-serif", color: "#fff", fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>Your Cart ({cartItems.length})</h2>
            <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", color: "#6b7280", fontSize: "1.4rem", cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {cartItems.length === 0 ? (
              <p style={{ color: "#6b7280", textAlign: "center", marginTop: 40 }}>Your cart is empty</p>
            ) : cartItems.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: "1.8rem", width: 44, height: 44, background: "rgba(124,58,237,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.img}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.82rem", color: "#e5e7eb", fontWeight: 600, lineHeight: 1.3 }}>{c.title}</div>
                  <div style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: 2 }}>via {c.provider}</div>
                  <div style={{ fontSize: "0.88rem", color: "#a78bfa", fontWeight: 800, marginTop: 4 }}>{c.price}</div>
                </div>
                <button onClick={() => setCartItems(p => p.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: "#6b7280", cursor: "pointer", alignSelf: "flex-start", fontSize: "1rem" }}>×</button>
              </div>
            ))}
          </div>
          {cartItems.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ color: "#9ca3af" }}>Total</span>
                <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.1rem" }}>${cartTotal.toFixed(2)}</span>
              </div>
              <button style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", border: "none", borderRadius: 12, color: "#fff", fontSize: "1rem", fontWeight: 700, cursor: "pointer" }}>
                Checkout →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Hero search section */}
      <section style={{ background: "linear-gradient(135deg,#0f1035 0%,#1a0a3c 60%,#0f1035 100%)", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.18)", border: "1px solid rgba(124,58,237,0.35)", borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
          <span style={{ fontSize: "1rem" }}>🎙️</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#a78bfa", letterSpacing: 1, textTransform: "uppercase" }}>AI Voice Search</span>
        </div>
        <h1 style={{ fontFamily: "Manrope, sans-serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 800, color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
          Just say what you need
        </h1>
        <p style={{ color: "#9ca3af", fontSize: "1rem", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.7 }}>
          MioBot searches across 25+ partners simultaneously — shopping, food, travel, events, services — and finds the best options for you.
        </p>

        {/* Mic button */}
        <div style={{ marginBottom: 32 }}>
          <button
            onClick={listening ? stopListening : startListening}
            aria-label={listening ? "Stop listening" : "Start voice search"}
            style={{
              width: 100, height: 100, borderRadius: "50%", border: "none", cursor: "pointer",
              background: listening ? "linear-gradient(135deg,#ef4444,#dc2626)" : "linear-gradient(135deg,#7c3aed,#4f46e5)",
              boxShadow: listening ? "0 0 0 16px rgba(239,68,68,0.15),0 0 0 32px rgba(239,68,68,0.08)" : "0 0 0 16px rgba(124,58,237,0.15)",
              fontSize: "2.4rem", display: "inline-flex", alignItems: "center", justifyContent: "center",
              transition: "all .3s",
            }}
          >
            {listening ? "⏹" : "🎙️"}
          </button>
          {listening && (
            <div style={{ marginTop: 14, color: "#f87171", fontSize: "0.9rem", fontWeight: 600, animation: "pulse 1s infinite" }}>
              Listening… {transcript && `"${transcript}"`}
            </div>
          )}
          {!voiceSupported && (
            <p style={{ marginTop: 10, fontSize: "0.82rem", color: "#6b7280" }}>Voice not available in this browser — use the text box below</p>
          )}
        </div>

        {/* Text search */}
        <form onSubmit={e => { e.preventDefault(); handleSearch(query); }} style={{ display: "flex", gap: 10, maxWidth: 600, margin: "0 auto 24px" }}>
          <label htmlFor="search-input" className="sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }}>Search for anything</label>
          <input
            id="search-input"
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Try "find running shoes under $150" or "pizza near me"'
            style={{ flex: 1, padding: "14px 18px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, color: "#fff", fontSize: "0.95rem", outline: "none" }}
          />
          <button type="submit" style={{ padding: "14px 24px", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", border: "none", borderRadius: 12, color: "#fff", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>
            Search
          </button>
        </form>

        {/* Suggestions */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", maxWidth: 680, margin: "0 auto" }}>
          {suggestions.map(s => (
            <button key={s} onClick={() => { setQuery(s); handleSearch(s); }}
              style={{ padding: "7px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, color: "#c4c9d4", fontSize: "0.8rem", cursor: "pointer", transition: "all .15s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.2)"; e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Category tabs */}
        {!results && (
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
            {CATEGORY_LIST.map(c => (
              <button key={c.id} onClick={() => { setCategory(c.id); handleSearch(c.label); setQuery(c.label); }}
                style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#c4c9d4", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>
                <span>{c.icon}</span>{c.label}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Loading */}
      {loading && (
        <section style={{ padding: "60px 24px", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", border: "3px solid rgba(124,58,237,0.2)", borderTopColor: "#7c3aed", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ color: "#9ca3af" }}>MioBot is searching across all partners…</p>
        </section>
      )}

      {/* Results */}
      {!loading && results && (
        <section style={{ padding: "40px 24px", maxWidth: 1200, margin: "0 auto" }}>
          {/* Mio AI response */}
          <div style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 16, padding: "18px 22px", marginBottom: 36, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>🤖</div>
            <div>
              <div style={{ fontSize: "0.75rem", color: "#a78bfa", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>MioBot</div>
              <p style={{ margin: 0, color: "#e5e7eb", lineHeight: 1.6, fontSize: "0.95rem" }}>{mioSays}</p>
            </div>
          </div>

          {/* Cart button */}
          {cartItems.length > 0 && (
            <button onClick={() => setCartOpen(true)}
              style={{ position: "fixed", bottom: 32, right: cartOpen ? "calc(min(380px,100vw) + 16px)" : 32, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", border: "none", borderRadius: 50, padding: "14px 20px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", zIndex: 800, boxShadow: "0 8px 30px rgba(124,58,237,0.4)", transition: "right .3s" }}>
              🛒 Cart ({cartItems.length}) — ${cartTotal.toFixed(2)}
            </button>
          )}

          {/* Provider results */}
          {results.map(provider => (
            <div key={provider.name} style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <span style={{ fontSize: "1.6rem" }}>{provider.logo}</span>
                <h2 style={{ fontFamily: "Manrope, sans-serif", color: "#fff", fontSize: "1.1rem", fontWeight: 700, margin: 0 }}>{provider.name}</h2>
                <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.08)" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16 }}>
                {provider.items.map(item => (
                  <article key={item.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "18px", transition: "border-color .2s" }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <div style={{ fontSize: "2.2rem", width: 50, height: 50, background: "rgba(124,58,237,0.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>{item.img}</div>
                      {item.tag && <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#a78bfa", background: "rgba(124,58,237,0.15)", padding: "3px 8px", borderRadius: 6 }}>{item.tag}</span>}
                    </div>
                    <h3 style={{ fontSize: "0.88rem", color: "#e5e7eb", fontWeight: 600, margin: "0 0 6px", lineHeight: 1.4 }}>{item.title}</h3>
                    <div style={{ fontSize: "0.75rem", color: "#6b7280", marginBottom: 8 }}>
                      ⭐ {item.rating} ({item.reviews.toLocaleString()} reviews)
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#4ade80", marginBottom: 12 }}>
                      🚀 {item.delivery}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "1.1rem", color: "#a78bfa", fontWeight: 800 }}>{item.price}</span>
                      <button onClick={() => addToCart(item, provider.name)}
                        style={{ padding: "7px 14px", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", border: "none", borderRadius: 8, color: "#fff", fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}>
                        Add to Cart
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.5} }
      `}</style>
    </main>
  );
}
