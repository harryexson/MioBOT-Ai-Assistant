import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import SearchIcon from "icon:search";
import StarIcon from "icon:star";
import ShoppingCartIcon from "icon:shopping-cart";
import ClockIcon from "icon:clock";
import MapPinIcon from "icon:map-pin";
import FilterIcon from "icon:sliders";
import MicIcon from "icon:mic";
import ArrowRightIcon from "icon:arrow-right";
import { searchProducts, PROVIDERS } from "../lib/mockProviders.js";
import { pb } from "../lib/pb.js";

const CATEGORIES = [
  { key: "shopping", label: "Shopping", emoji: "🛍️" },
  { key: "food", label: "Food & Dining", emoji: "🍔" },
  { key: "travel", label: "Travel & Hotels", emoji: "✈️" },
  { key: "events", label: "Events", emoji: "🎟️" },
  { key: "services", label: "Services", emoji: "📅" },
];

const SUGGESTION_QUERIES = {
  shopping: ["running shoes under $150", "noise cancelling headphones", "laptop bag", "birthday gift ideas"],
  food: ["pizza delivery near me", "sushi restaurant", "McDonald's usual order", "vegan options"],
  travel: ["hotels in Chicago", "flights to Miami", "Airbnb Paris", "beach resort deals"],
  events: ["concerts this weekend", "NBA tickets", "comedy shows", "music festivals"],
  services: ["house cleaning today", "plumber near me", "personal trainer", "dog walker"],
};

function AIThinking() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", background: "#f5f3ff", borderRadius: 16, maxWidth: 380, border: "1.5px solid #ede9fe" }}>
      <div style={{ width: 28, height: 28, borderRadius: 9, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 11 }}>M</span>
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#7c3aed" }}>Mio is searching…</p>
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {[0,1,2].map(i => (
            <div key={i} className="wave-bar" style={{ width: 6, height: 6, borderRadius: "50%", background: "#c4b5fd", animationDelay: `${i * 0.18}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const [params] = useSearchParams();
  const defaultCat = params.get("cat") || "shopping";
  const defaultQ = params.get("q") || "";

  const [query, setQuery] = useState(defaultQ);
  const [activeCategory, setActiveCategory] = useState(defaultCat);
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    if (defaultQ) doSearch(defaultQ, defaultCat);
  }, []);

  const doSearch = async (q, cat) => {
    setIsSearching(true);
    setHasSearched(true);
    try {
      const res = await searchProducts(q || "", cat);
      setResults(res);
      if (q) {
        pb.collection("searches").create({ query: q, category: cat, results_count: res.length }).catch(() => {});
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doSearch(query, activeCategory);
  };

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const actionLabel = {
    shopping: "Add to Cart",
    food: "Order Now",
    travel: "Book",
    events: "Get Tickets",
    services: "Book Now",
  }[activeCategory] || "View";

  return (
    <div style={{ paddingTop: 72, minHeight: "100vh", background: "#ffffff" }}>
      {/* Search header */}
      <div style={{ background: "#f8f7ff", borderBottom: "1px solid #ede9fe", padding: "24px 0" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
          {/* Search bar */}
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 280, position: "relative" }}>
              <label htmlFor="search-input" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>Search</label>
              <SearchIcon size={18} style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "#6d727a", pointerEvents: "none" }} />
              <input
                id="search-input"
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Ask Mio anything…"
                style={{ width: "100%", padding: "15px 50px 15px 50px", borderRadius: 50, border: "1.5px solid #e5e7eb", fontSize: 15, fontFamily: "DM Sans,sans-serif", outline: "none", boxSizing: "border-box", background: "#fff" }}
              />
              <div style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <MicIcon size={14} style={{ color: "#fff" }} />
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ padding: "14px 28px", fontSize: 15 }}>Search</button>
          </form>

          {/* Category tabs */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat.key}
                onClick={() => { setActiveCategory(cat.key); if (hasSearched) doSearch(query, cat.key); }}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "8px 16px", borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "1.5px solid",
                  borderColor: activeCategory === cat.key ? "#7c3aed" : "#e5e7eb",
                  background: activeCategory === cat.key ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#fff",
                  color: activeCategory === cat.key ? "#fff" : "#374151",
                  transition: "all 0.2s",
                }}
              >
                <span>{cat.emoji}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {/* Suggestions */}
        {!hasSearched && (
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#6b7280", margin: "0 0 12px" }}>Try asking…</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {(SUGGESTION_QUERIES[activeCategory] || []).map(s => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); doSearch(s, activeCategory); }}
                  style={{ padding: "8px 16px", borderRadius: 50, border: "1.5px solid #ede9fe", background: "#f8f7ff", fontSize: 13, color: "#374151", cursor: "pointer", fontFamily: "DM Sans,sans-serif" }}
                >
                  {s}
                </button>
              ))}
            </div>
            {/* Provider logos */}
            <p style={{ fontSize: 14, fontWeight: 600, color: "#6b7280", margin: "0 0 14px" }}>Connected providers in {CATEGORIES.find(c=>c.key===activeCategory)?.label}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
              {(PROVIDERS[activeCategory] || []).map(p => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 8, background: "#f8f7ff", border: "1.5px solid #ede9fe", borderRadius: 12, padding: "8px 14px" }}>
                  <span style={{ fontSize: 18 }}>{p.logo}</span>
                  <div>
                    <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#0f1035" }}>{p.name}</p>
                    <p style={{ margin: 0, fontSize: 10, color: "#6d727a" }}>{Math.round(p.commissionRate * 100)}% referral</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isSearching && <AIThinking />}

        {hasSearched && !isSearching && (
          <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
              <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>
                <span style={{ fontWeight: 700, color: "#0f1035" }}>{sortedResults.length} results</span>
                {query && <> for "<span style={{ color: "#7c3aed" }}>{query}</span>"</>}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FilterIcon size={14} style={{ color: "#6d727a" }} />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{ padding: "7px 12px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 13, fontFamily: "DM Sans,sans-serif", color: "#374151", background: "#fff", cursor: "pointer", outline: "none" }}
                  aria-label="Sort results"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price_asc">Price: Low → High</option>
                  <option value="price_desc">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {sortedResults.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <p style={{ fontSize: 48, margin: "0 0 12px" }}>🔍</p>
                <p style={{ fontSize: 18, fontWeight: 700, color: "#0f1035", margin: "0 0 8px" }}>No results found</p>
                <p style={{ fontSize: 14, color: "#6b7280", margin: "0 0 24px" }}>Try a different search term or browse a category above.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 18 }}>
                {sortedResults.map(item => (
                  <article key={item.id} className="card-hover" style={{ background: "#fff", borderRadius: 22, padding: 22, border: "1.5px solid #ede9fe", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg,#f5f3ff,#ede9fe)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>
                        {item.emoji}
                      </div>
                      {item.badge && (
                        <span style={{ background: "#fef3c7", color: "#78350f", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 50 }}>{item.badge}</span>
                      )}
                    </div>
                    <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 15, color: "#0f1035", margin: "0 0 4px", lineHeight: 1.3 }}>{item.name}</h2>
                    {item.restaurant && <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6b7280" }}>{item.restaurant}</p>}
                    {item.venue && <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6b7280" }}>📍 {item.venue}</p>}
                    {item.city && <p style={{ margin: "0 0 4px", fontSize: 13, color: "#6b7280" }}><MapPinIcon size={12} style={{ verticalAlign: "middle" }} /> {item.city}</p>}
                    {item.availability && <p style={{ margin: "0 0 4px", fontSize: 12, color: "#0c865e", fontWeight: 600 }}>✓ {item.availability}</p>}
                    <div style={{ display: "flex", alignItems: "center", gap: 5, margin: "6px 0 12px" }}>
                      <StarIcon size={13} style={{ color: "#f59e0b" }} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#374151" }}>{item.rating}</span>
                      <span style={{ fontSize: 12, color: "#6d727a" }}>({item.reviews?.toLocaleString()} reviews)</span>
                    </div>
                    {item.deliveryTime && (
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 8 }}>
                        <ClockIcon size={12} style={{ color: "#6b7280" }} />
                        <span style={{ fontSize: 12, color: "#6b7280" }}>{item.deliveryTime}</span>
                      </div>
                    )}
                    <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 20, color: "#7c3aed" }}>
                          ${item.price}
                        </span>
                        {item.originalPrice && <span style={{ fontSize: 12, color: "#6d727a", marginLeft: 5, textDecoration: "line-through" }}>${item.originalPrice}</span>}
                        {activeCategory === "travel" && <span style={{ fontSize: 12, color: "#6d727a" }}>/night</span>}
                      </div>
                      <Link to="/checkout" className="btn-primary" style={{ padding: "9px 16px", fontSize: 12, borderRadius: 12 }}>
                        {actionLabel}
                      </Link>
                    </div>
                    <p style={{ margin: "8px 0 0", fontSize: 11, color: "#6d727a" }}>via {item.provider}</p>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
