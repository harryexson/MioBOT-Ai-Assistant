import { useState, useEffect } from "react";
import { Link } from "react-router";
import MicIcon from "icon:mic";
import PlayIcon from "icon:play-circle";
import ArrowRightIcon from "icon:arrow-right";
import CheckIcon from "icon:check-circle";
import StarIcon from "icon:star";
import ZapIcon from "icon:zap";
import ShieldIcon from "icon:shield-check";
import SmartphoneIcon from "icon:smartphone";
import SearchIcon from "icon:search";
import ShoppingCartIcon from "icon:shopping-cart";
import LockIcon from "icon:lock";

const CATEGORIES = [
  { emoji: "🛍️", label: "Shopping", desc: "Find and buy anything", color: "#f0e6ff" },
  { emoji: "🍔", label: "Food & Dining", desc: "Order pickup or delivery", color: "#fff0e6" },
  { emoji: "✈️", label: "Travel & Hotels", desc: "Book flights and hotels", color: "#e6f0ff" },
  { emoji: "📅", label: "Services", desc: "Appointments & bookings", color: "#e6fff0" },
  { emoji: "💳", label: "Payments", desc: "Pay bills, invoices & more", color: "#ffe6f0" },
  { emoji: "🎟️", label: "Events", desc: "Find and book tickets", color: "#fff8e6" },
  { emoji: "📡", label: "NFC & In-Store", desc: "Tap, order and pay", color: "#e6f8ff" },
  { emoji: "✨", label: "And More", desc: "Explore all possibilities", color: "#f5e6ff" },
];

const CHAT_STEPS = [
  { role: "user", text: "Mio, order my usual from McDonald's." },
  { role: "mio", text: "Found your usual — Big Mac combo. Estimated arrival 25 min. Confirm?" },
  { role: "user", text: "Yes, confirm." },
  { role: "mio", text: "Order placed! Track it live in the app. 🎉" },
];

const STATS = [
  { value: "1M+", label: "Happy Users" },
  { value: "50,000+", label: "Businesses" },
  { value: "4.8★", label: "App Rating" },
  { value: "All in One", label: "Shop. Book. Pay." },
];

const PHONE_SCREENS = [
  {
    title: "Welcome",
    content: (
      <div className="flex flex-col h-full items-center justify-between py-6 px-4">
        <div className="flex flex-col items-center gap-3 mt-4">
          <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 22, fontFamily: "Syne, sans-serif" }}>M</span>
          </div>
          <p style={{ fontWeight: 700, fontSize: 17, color: "#0f1035", margin: 0, textAlign: "center" }}>Mio</p>
          <p style={{ fontSize: 11, color: "#6b7280", margin: 0, textAlign: "center" }}>Your AI Assistant for Everyday Life</p>
        </div>
        <div style={{ width: "100%", gap: 10, display: "flex", flexDirection: "column" }}>
          <div style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 12, padding: "10px 0", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Get Started</div>
          <div style={{ border: "1.5px solid #e5e7eb", color: "#374151", borderRadius: 12, padding: "10px 0", textAlign: "center", fontSize: 13, fontWeight: 600 }}>Sign In</div>
          <p style={{ textAlign: "center", fontSize: 10, color: "#9ca3af", margin: "4px 0 0" }}>Skip for now</p>
        </div>
      </div>
    )
  },
  {
    title: "AI Shopping",
    content: (
      <div className="flex flex-col h-full py-3 px-3">
        <div style={{ fontSize: 11, fontWeight: 700, color: "#0f1035", marginBottom: 8 }}>AI Shopping Assistant</div>
        <div style={{ background: "#f5f3ff", borderRadius: 10, padding: "8px 10px", marginBottom: 8 }}>
          <p style={{ fontSize: 10, color: "#7c3aed", margin: 0, fontWeight: 600 }}>Top pick for you</p>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: "linear-gradient(135deg,#ede9fe,#ddd6fe)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🎧</div>
            <div>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: "#0f1035" }}>Sony WH-1000XMS</p>
              <p style={{ margin: 0, fontSize: 9, color: "#6b7280" }}>Best noise cancelling headphones</p>
              <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#7c3aed" }}>$399</p>
            </div>
          </div>
          <div style={{ marginTop: 6, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 8, padding: "5px 0", textAlign: "center", fontSize: 10, fontWeight: 600 }}>Add to cart</div>
        </div>
        <div style={{ background: "#f9fafb", borderRadius: 8, padding: "6px 10px", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 16, height: 16, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 8, color: "#fff" }}>M</span>
          </div>
          <p style={{ margin: 0, fontSize: 9, color: "#374151" }}>Ask anything...</p>
          <div style={{ marginLeft: "auto", width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 10 }}>🎤</span>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Travel",
    content: (
      <div className="flex flex-col h-full py-3 px-3">
        <div style={{ fontSize: 11, fontWeight: 700, color: "#0f1035", marginBottom: 8 }}>Hotels in Chicago</div>
        {[
          { name: "The Langham Chicago", stars: "4.8", price: "$229", img: "🏨" },
          { name: "Renaissance Chicago", stars: "4.6", price: "$189", img: "🏩" },
        ].map((h, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", background: "#f8f7ff", borderRadius: 10, padding: "7px 8px", marginBottom: 6 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg,#ede9fe,#c4b5fd)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{h.img}</div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 9, fontWeight: 700, color: "#0f1035" }}>{h.name}</p>
              <p style={{ margin: 0, fontSize: 8, color: "#f59e0b" }}>★ {h.stars} (347 reviews)</p>
              <p style={{ margin: 0, fontSize: 9, fontWeight: 700, color: "#7c3aed" }}>{h.price}/night</p>
            </div>
            <div style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 6, padding: "4px 7px", fontSize: 8, fontWeight: 600 }}>View</div>
          </div>
        ))}
      </div>
    )
  },
  {
    title: "Payment",
    content: (
      <div className="flex flex-col h-full py-3 px-3">
        <div style={{ fontSize: 11, fontWeight: 700, color: "#0f1035", marginBottom: 8 }}>Add a payment method</div>
        {[
          { icon: "💳", label: "Credit or Debit Card", sub: "Secured with Stripe" },
          { icon: "🍎", label: "Apple Pay", sub: "" },
          { icon: "G", label: "Google Pay", sub: "" },
          { icon: "🔗", label: "Link (Stripe)", sub: "" },
          { icon: "🅿️", label: "PayPal", sub: "" },
        ].map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: i < 4 ? "1px solid #f3f4f6" : "none" }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#374151" }}>{m.icon}</div>
            <div>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: "#0f1035" }}>{m.label}</p>
              {m.sub && <p style={{ margin: 0, fontSize: 8, color: "#9ca3af" }}>{m.sub}</p>}
            </div>
            <div style={{ marginLeft: "auto", width: 16, height: 16, borderRadius: "50%", border: "1.5px solid #e5e7eb" }}></div>
          </div>
        ))}
        <div style={{ marginTop: 8, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 10, padding: "8px 0", textAlign: "center", fontSize: 11, fontWeight: 600 }}>Continue</div>
        <p style={{ textAlign: "center", fontSize: 9, color: "#9ca3af", marginTop: 4 }}>Your payment info is safe and securely encrypted.</p>
      </div>
    )
  },
];

function WaveIcon() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 20 }}>
      {[0.6, 1, 0.7, 1, 0.5].map((h, i) => (
        <div key={i} className="wave-bar" style={{ width: 3, height: `${h * 100}%`, borderRadius: 2, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", transformOrigin: "bottom", animationDelay: `${i * 0.1}s` }} />
      ))}
    </div>
  );
}

function ChatDemo() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible >= CHAT_STEPS.length) return;
    const t = setTimeout(() => setVisible(v => v + 1), 1400);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="glass rounded-2xl p-5" style={{ maxWidth: 340 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 14, fontFamily: "Syne, sans-serif" }}>M</span>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f1035" }}>Mio AI Assistant</p>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }}></div>
            <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>Online</p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 160 }}>
        {CHAT_STEPS.slice(0, visible).map((msg, i) => (
          <div key={i} className="animate-slide-up" style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              background: msg.role === "user" ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#f5f3ff",
              color: msg.role === "user" ? "#fff" : "#0f1035",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              padding: "8px 14px",
              fontSize: 13,
              maxWidth: "80%",
              fontWeight: 500,
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {visible < CHAT_STEPS.length && visible > 0 && (
          <div style={{ display: "flex", gap: 3, padding: "4px 10px" }}>
            {[0,1,2].map(i => (
              <div key={i} className="wave-bar" style={{ width: 6, height: 6, borderRadius: "50%", background: "#c4b5fd", animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        )}
      </div>

      <button onClick={() => setVisible(0)} style={{ marginTop: 12, width: "100%", background: "transparent", border: "none", color: "#7c3aed", fontSize: 12, fontWeight: 600, cursor: "pointer", textAlign: "center" }}>
        Replay ↺
      </button>
    </div>
  );
}

function PhoneScreen({ screen }) {
  return (
    <div className="phone-mockup animate-float" style={{ width: 160, height: 300, flexShrink: 0 }}>
      {/* notch */}
      <div style={{ height: 24, background: "#0f1035", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 50, height: 5, background: "#374151", borderRadius: 4 }}></div>
      </div>
      <div style={{ flex: 1, height: "calc(100% - 24px)", overflow: "hidden" }}>
        {screen.content}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ background: "#ffffff" }}>
      {/* ── Hero ── */}
      <section style={{ paddingTop: 80, background: "#ffffff", overflow: "hidden" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f5f3ff", border: "1px solid #ede9fe", borderRadius: 50, padding: "6px 14px", marginBottom: 20 }}>
                <ZapIcon size={13} style={{ color: "#7c3aed" }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#7c3aed" }}>AI POWERED ASSISTANT</span>
              </div>

              <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(40px,6vw,68px)", lineHeight: 1.08, color: "#0f1035", margin: "0 0 12px" }}>
                Talk. Find. Book.<br />
                <span className="gradient-text">Order. Pay.</span>
              </h1>

              <p style={{ fontSize: 18, color: "#374151", lineHeight: 1.6, marginBottom: 8, fontWeight: 600 }}>
                One assistant. Endless possibilities.
              </p>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, marginBottom: 32, maxWidth: 440 }}>
                Mio helps you shop, dine, travel, book services and handle payments — all through natural conversation.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40 }}>
                <Link to="/onboarding" className="btn-primary" style={{ fontSize: 15 }}>
                  Get Mio Free <ArrowRightIcon size={16} />
                </Link>
                <Link to="/features" className="btn-secondary" style={{ fontSize: 15 }}>
                  <PlayIcon size={16} style={{ color: "#7c3aed" }} /> Watch Video
                </Link>
              </div>

              {/* App store badges */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
                {[
                  { icon: "🍎", label: "Download on the", sub: "App Store" },
                  { icon: "▶", label: "GET IT ON", sub: "Google Play" },
                ].map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: "#0f1035", color: "#fff", borderRadius: 10, padding: "8px 16px", cursor: "pointer" }}>
                    <span style={{ fontSize: 20 }}>{b.icon}</span>
                    <div>
                      <p style={{ margin: 0, fontSize: 9, color: "#d1d5db" }}>{b.label}</p>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                {STATS.map((s, i) => (
                  <div key={i}>
                    <div className="stat-value" style={{ fontSize: "1.5rem" }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — floating category cards + phone */}
            <div style={{ position: "relative", height: 520, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Soft glow orb */}
              <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0) 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}></div>

              {/* Hero image placeholder with real-feeling mockup */}
              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Phone */}
                <div className="phone-mockup animate-float" style={{ width: 200, height: 400, margin: "0 auto", position: "relative", zIndex: 2 }}>
                  <div style={{ height: 28, background: "#0f1035", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 60, height: 6, background: "#374151", borderRadius: 4 }}></div>
                  </div>
                  <div style={{ padding: "12px 14px", height: "calc(100% - 28px)", display: "flex", flexDirection: "column", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "#fff", fontWeight: 800, fontSize: 12 }}>M</span>
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#0f1035" }}>Mio</p>
                        <p style={{ margin: 0, fontSize: 9, color: "#9ca3af" }}>Your AI Assistant</p>
                      </div>
                    </div>
                    <div style={{ background: "#f5f3ff", borderRadius: 12, padding: "10px 12px" }}>
                      <p style={{ margin: 0, fontSize: 10, color: "#6b7280" }}>Ask Mio anything...</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {[["🛍️","Shopping"],["🍔","Food"],["✈️","Travel"],["🛎️","Services"]].map(([e,l]) => (
                        <div key={l} style={{ background: "#f8f7ff", borderRadius: 10, padding: "8px", textAlign: "center" }}>
                          <div style={{ fontSize: 18 }}>{e}</div>
                          <p style={{ margin: 0, fontSize: 9, color: "#374151", fontWeight: 600 }}>{l}</p>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: 10, fontWeight: 600, color: "#0f1035", margin: "4px 0 0" }}>AI Picks for You</p>
                    <div style={{ display: "flex", gap: 8 }}>
                      {[["🎧","$399"],["👟","$129"],["🧳","$89"]].map(([e,p]) => (
                        <div key={p} style={{ flex: 1, background: "#f5f3ff", borderRadius: 10, padding: "6px", textAlign: "center" }}>
                          <div style={{ fontSize: 18 }}>{e}</div>
                          <p style={{ margin: 0, fontSize: 9, color: "#7c3aed", fontWeight: 700 }}>{p}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating category chips */}
                {[
                  { label: "Food & Dining", emoji: "🍔", top: "5%", right: "-30%" },
                  { label: "Hotels & Travel", emoji: "🏨", top: "38%", right: "-32%" },
                  { label: "Shopping", emoji: "🛍️", top: "65%", right: "-25%" },
                  { label: "Bookings & Services", emoji: "📅", top: "80%", left: "-35%" },
                ].map((chip, i) => (
                  <div
                    key={i}
                    className="animate-float"
                    style={{
                      position: "absolute",
                      background: "#fff",
                      border: "1.5px solid #ede9fe",
                      borderRadius: 14,
                      padding: "8px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      boxShadow: "0 4px 20px rgba(124,58,237,0.12)",
                      top: chip.top,
                      right: chip.right,
                      left: chip.left,
                      animationDelay: `${i * 0.6}s`,
                      whiteSpace: "nowrap",
                      zIndex: 3,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>{chip.emoji}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#0f1035" }}>{chip.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Everything You Need ── */}
      <section className="section-alt" style={{ padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,42px)", color: "#0f1035", margin: "0 0 8px" }}>
              Everything You Need. <span className="gradient-text">Just Ask Mio.</span>
            </h2>
            <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
              One AI assistant that handles every part of your daily life — from shopping to travel to payments.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {CATEGORIES.map((cat) => (
              <div key={cat.label} className="card-hover" style={{ background: "#fff", borderRadius: 20, padding: "24px 20px", border: "1px solid #ede9fe", textAlign: "center" }}>
                <div style={{ width: 60, height: 60, borderRadius: 18, background: cat.color, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>
                  {cat.emoji}
                </div>
                <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, color: "#0f1035", margin: "0 0 4px" }}>{cat.label}</h3>
                <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chat Demo + Phone ── */}
      <section className="section-white" style={{ padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(26px,3.5vw,38px)", color: "#0f1035", marginBottom: 12 }}>
                Understand exactly <span className="gradient-text">what you mean</span>
              </h2>
              <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
                Ask in natural language. Mio searches multiple providers, compares prices, and confirms with you before any action.
              </p>
              <ChatDemo />
            </div>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
              {/* AI response cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 280 }}>
                {[
                  { icon: <SearchIcon size={16} />, text: "Found 5 great options" },
                  { icon: "≡", text: "Compare features" },
                  { icon: <ShoppingCartIcon size={16} />, text: "Add to cart" },
                  { icon: <LockIcon size={16} />, text: "Secure checkout" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "#f8f7ff", borderRadius: 14, padding: "12px 16px", border: "1px solid #ede9fe" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: "#ede9fe", display: "flex", alignItems: "center", justifyContent: "center", color: "#7c3aed", fontSize: 16 }}>
                      {item.icon}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#0f1035" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile App Screens ── */}
      <section className="section-alt" style={{ padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(26px,3.5vw,38px)", color: "#0f1035", marginBottom: 8 }}>
              Mobile App Screens — <span className="gradient-text">Onboarding & Key Flows</span>
            </h2>
            <p style={{ color: "#6b7280", fontSize: 15 }}>Available on iOS and Android. Beautifully designed for natural interaction.</p>
          </div>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", alignItems: "flex-end" }}>
            {PHONE_SCREENS.map((screen, i) => (
              <div key={i} className="phone-mockup" style={{ width: 160, height: 300, flexShrink: 0, animationDelay: `${i * 0.3}s` }} >
                <div style={{ height: 24, background: "#0f1035", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 50, height: 5, background: "#374151", borderRadius: 4 }}></div>
                </div>
                <div style={{ height: "calc(100% - 24px)", overflow: "hidden" }}>
                  {screen.content}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link to="/onboarding" className="btn-primary">Try the Onboarding Flow <ArrowRightIcon size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ── Business Dashboard ── */}
      <section className="section-white" style={{ padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(26px,3.5vw,38px)", color: "#0f1035", marginBottom: 12 }}>
                Business Dashboard <span className="gradient-text">(Web)</span>
              </h2>
              <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                Run your restaurant, shop, or service business with a powerful real-time dashboard. Track orders, revenue, customers, and team — all in one place.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {["Real-time order tracking", "Revenue & analytics", "Menu & inventory management", "Team management with roles", "NFC & payment integrations"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckIcon size={16} style={{ color: "#7c3aed", flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: "#374151" }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/merchant" className="btn-primary">View Dashboard <ArrowRightIcon size={16} /></Link>
            </div>
            {/* Dashboard preview */}
            <div className="glass" style={{ borderRadius: 20, padding: 24, border: "1px solid #ede9fe" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, color: "#0f1035" }}>Good morning, Alex!</span>
                <span style={{ fontSize: 11, color: "#9ca3af" }}>Last 7 days</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                {[
                  { label: "Total Orders", value: "1,248", change: "+12%" },
                  { label: "Revenue", value: "$18,932", change: "+10%" },
                  { label: "Customers", value: "892", change: "+14%" },
                  { label: "Avg Order Value", value: "$15.16", change: "+6.6%" },
                ].map(s => (
                  <div key={s.label} style={{ background: "#f8f7ff", borderRadius: 12, padding: "12px 14px" }}>
                    <p style={{ margin: "0 0 4px", fontSize: 11, color: "#9ca3af" }}>{s.label}</p>
                    <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#0f1035" }}>{s.value}</p>
                    <p style={{ margin: 0, fontSize: 11, color: "#10b981", fontWeight: 600 }}>{s.change}</p>
                  </div>
                ))}
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#0f1035", marginBottom: 8 }}>Top Items</p>
                {["Margherita Pizza — 342", "Chicken Alfredo — 281", "Caesar Salad — 214"].map(item => (
                  <div key={item} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#374151", padding: "4px 0", borderBottom: "1px solid #f3f4f6" }}>
                    <span>{item.split(" — ")[0]}</span>
                    <span style={{ color: "#7c3aed", fontWeight: 600 }}>{item.split(" — ")[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NFC Section ── */}
      <section className="section-alt" style={{ padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="glass" style={{ borderRadius: 24, padding: 32, border: "1px solid #ede9fe" }}>
              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 20, color: "#0f1035", marginBottom: 20 }}>Mio + NFC / In-Store Experience</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "📡", step: "Tap NFC Tag", desc: "Open menu instantly" },
                  { icon: "🤖", step: "Order with Mio", desc: "Customise easily" },
                  { icon: "💳", step: "Pay Securely", desc: "Using saved card" },
                  { icon: "✅", step: "Get Confirmation", desc: "Track your order" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: "#ffffff", borderRadius: 14, border: "1px solid #ede9fe" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: i === 3 ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                      {s.icon}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f1035" }}>{s.step}</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{s.desc}</p>
                    </div>
                    <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, color: "#7c3aed" }}>Step {i+1}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(26px,3.5vw,38px)", color: "#0f1035", marginBottom: 12 }}>
                Tap. Order. <span className="gradient-text">Pay instantly.</span>
              </h2>
              <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                Place an NFC device in your restaurant, store, or venue. Customers tap, Mio opens their personalised menu, they order and pay — all in under 60 seconds.
              </p>
              <Link to="/easytap" className="btn-primary">Explore EasyTap Go <ArrowRightIcon size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-dark" style={{ padding: "80px 0" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "#ffffff", marginBottom: 16 }}>
            Ready to experience the future of AI commerce?
          </h2>
          <p style={{ color: "#a5b4fc", fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>
            Join over 1 million people who shop, dine, travel and pay with Mio every day.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/onboarding" className="btn-primary" style={{ fontSize: 16, padding: "15px 32px" }}>
              Get Mio Free <ArrowRightIcon size={18} />
            </Link>
            <Link to="/features" className="btn-secondary" style={{ fontSize: 16, padding: "15px 32px", color: "#ffffff", borderColor: "rgba(255,255,255,0.3)" }}>
              See All Features
            </Link>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 48, flexWrap: "wrap" }}>
            {[
              { icon: <ShieldIcon size={16} />, label: "Enterprise security" },
              { icon: <SmartphoneIcon size={16} />, label: "iOS & Android" },
              { icon: <ZapIcon size={16} />, label: "Works everywhere" },
            ].map(f => (
              <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 8, color: "#c4b5fd" }}>
                {f.icon}
                <span style={{ fontSize: 13, fontWeight: 500 }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#0f1035", color: "#9ca3af", padding: "40px 0 24px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div>
              <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20, background: "linear-gradient(135deg,#7c3aed,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Mio</span>
              <p style={{ fontSize: 13, lineHeight: 1.6, marginTop: 8, color: "#9ca3af" }}>Your AI assistant for everyday life — shop, dine, travel, and pay through conversation.</p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Onboarding", "Widget Demo"] },
              { title: "Business", links: ["Merchant Dashboard", "Admin Console", "Developer Portal", "Providers"] },
              { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact"] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontWeight: 700, color: "#ffffff", fontSize: 13, marginBottom: 12 }}>{col.title}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {col.links.map(l => <span key={l} style={{ fontSize: 13, color: "#9ca3af", cursor: "pointer" }}>{l}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #1e2155", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>© 2026 Mio AI. All rights reserved.</p>
            <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>Talk. Find. Book. Order. Pay.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
