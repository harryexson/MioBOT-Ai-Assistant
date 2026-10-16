import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import MicIcon from "icon:mic";
import PlayIcon from "icon:play-circle";
import ArrowRightIcon from "icon:arrow-right";
import CheckIcon from "icon:check-circle";
import MioVoiceBot from "../components/MioVoiceBot.jsx";
import { pb } from "../lib/pb.js";

/* ─── Categories — matching reference exactly ─────────────────────── */
const CATEGORIES = [
  { emoji: "🛍️", label: "Shopping", desc: "Find and buy anything", path: "/search?cat=shopping" },
  { emoji: "🍔", label: "Food & Dining", desc: "Order pickup or delivery", path: "/search?cat=food" },
  { emoji: "✈️", label: "Travel & Hotels", desc: "Book flights and hotels", path: "/search?cat=travel" },
  { emoji: "📅", label: "Services", desc: "Appointments & bookings", path: "/search?cat=services" },
  { emoji: "💳", label: "Payments", desc: "Pay bills, invoices & more", path: "/checkout" },
  { emoji: "🎟️", label: "Events", desc: "Find and book tickets", path: "/search?cat=events" },
  { emoji: "📡", label: "NFC & In-Store", desc: "Tap, order and pay", path: "/easytap" },
  { emoji: "✨", label: "And More", desc: "Explore all possibilities", path: "/features" },
];

const STATS = [
  { value: "1M+", label: "Happy Users" },
  { value: "50,000+", label: "Businesses" },
  { value: "4.8 ★", label: "App Rating" },
  { value: "All in One", label: "Shop. Book. Pay." },
];

/* ─── Animated wave bars ─────────────────────────────────────────── */
function WaveBars({ color = "#7c3aed", size = 20 }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: size }}>
      {[0.5, 1, 0.7, 0.9, 0.6, 1, 0.75, 0.85].map((h, i) => (
        <div
          key={i}
          className="wave-bar"
          style={{
            width: 3,
            height: `${h * 100}%`,
            borderRadius: 2,
            background: color,
            animationDelay: `${i * 0.11}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Pixel-perfect phone frame (matching reference) ──────────────── */
function PhoneFrame({ children, width = 168, height = 340 }) {
  return (
    <div
      style={{
        width,
        height,
        background: "#1a1a2e",
        borderRadius: 40,
        padding: "10px 7px",
        boxShadow:
          "0 30px 80px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.07), inset 0 0 0 1px rgba(255,255,255,0.04)",
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Volume buttons left */}
      <div style={{ position: "absolute", left: -3.5, top: 76, width: 3.5, height: 28, background: "#0d0d1a", borderRadius: "3px 0 0 3px" }} />
      <div style={{ position: "absolute", left: -3.5, top: 116, width: 3.5, height: 28, background: "#0d0d1a", borderRadius: "3px 0 0 3px" }} />
      {/* Power button right */}
      <div style={{ position: "absolute", right: -3.5, top: 96, width: 3.5, height: 46, background: "#0d0d1a", borderRadius: "0 3px 3px 0" }} />
      {/* Screen */}
      <div
        style={{
          background: "#fff",
          borderRadius: 34,
          overflow: "hidden",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Dynamic island / notch */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 86,
            height: 26,
            background: "#1a1a2e",
            borderRadius: "0 0 18px 18px",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#0d0d1a" }} />
          <div style={{ width: 52, height: 4, background: "#0d0d1a", borderRadius: 2 }} />
        </div>
        <div style={{ paddingTop: 26, height: "100%" }}>{children}</div>
      </div>
    </div>
  );
}

/* ─── Phone screen: Welcome ──────────────────────────────────────── */
function ScreenWelcome() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "12px 13px 14px", background: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#71767f", marginBottom: 10 }}>
        <span style={{ fontWeight: 600 }}>9:41</span><span>●●● 🔋</span>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 20px rgba(124,58,237,0.35)" }}>
          <span style={{ color: "#fff", fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 24 }}>M</span>
        </div>
        <p style={{ margin: 0, fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 17, color: "#0f1035" }}>Mio</p>
        <p style={{ margin: 0, fontSize: 10, color: "#6b7280", textAlign: "center", lineHeight: 1.4 }}>Your AI Assistant<br />for Everyday Life</p>
        <p style={{ margin: "4px 0 0", fontSize: 9, color: "#6b6b80", fontWeight: 500 }}>Customise or more. You can<br />do much more with Mio.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 13, padding: "10px 0", textAlign: "center", fontSize: 12, fontWeight: 700, letterSpacing: 0.2 }}>Get Started</div>
        <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 13, padding: "9px 0", textAlign: "center", fontSize: 12, fontWeight: 600, color: "#374151" }}>Sign In</div>
        <p style={{ textAlign: "center", fontSize: 9, color: "#9ca3af", margin: "2px 0 0" }}>Skip for now</p>
      </div>
    </div>
  );
}

/* ─── Phone screen: Categories ───────────────────────────────────── */
function ScreenCategories() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 12px", background: "#fff", gap: 7 }}>
      <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: "#0f1035" }}>What would you like to use Mio for?</p>
      {[
        ["🛍️", "Shopping"],
        ["🍔", "Food & Restaurants"],
        ["✈️", "Travel & Hotels"],
        ["📅", "Services & Bookings"],
        ["💳", "Pay Bills & Invoices"],
        ["🎟️", "Events & Tickets"],
        ["✨", "Other"],
      ].map(([e, l]) => (
        <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", background: "#f8f7ff", borderRadius: 10, cursor: "pointer" }}>
          <span style={{ fontSize: 14 }}>{e}</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#0f1035" }}>{l}</span>
          <div style={{ marginLeft: "auto", width: 14, height: 14, borderRadius: "50%", border: "1.5px solid #d1d5db" }} />
        </div>
      ))}
      <div style={{ marginTop: "auto", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 11, padding: "9px 0", textAlign: "center", fontSize: 11, fontWeight: 700 }}>Continue</div>
    </div>
  );
}

/* ─── Phone screen: AI Shopping ─────────────────────────────────── */
function ScreenShopping() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 12px", background: "#fff", gap: 8 }}>
      <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#0f1035" }}>AI Shopping Assistant</p>
      <div style={{ background: "#f5f3ff", borderRadius: 10, padding: "8px 10px" }}>
        <p style={{ margin: "0 0 5px", fontSize: 9, color: "#7c3aed", fontWeight: 700 }}>⚡ Top pick for you</p>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#ede9fe,#ddd6fe)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🎧</div>
          <div>
            <p style={{ margin: 0, fontSize: 9, fontWeight: 700, color: "#0f1035" }}>Sony WH-1000XM5</p>
            <p style={{ margin: 0, fontSize: 8, color: "#6b7280" }}>Best noise-cancelling pick</p>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#7c3aed" }}>$399</p>
          </div>
        </div>
        <div style={{ marginTop: 6, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 8, padding: "6px 0", textAlign: "center", fontSize: 10, fontWeight: 700 }}>Add to cart</div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {[["🎵","$189"],["👟","$119"],["🧳","$89"]].map(([e, p]) => (
          <div key={p} style={{ flex: 1, background: "#f8f7ff", borderRadius: 8, padding: "7px 5px", textAlign: "center" }}>
            <span style={{ fontSize: 16 }}>{e}</span>
            <p style={{ margin: "3px 0 0", fontSize: 9, fontWeight: 700, color: "#7c3aed" }}>{p}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 6, background: "#f5f3ff", borderRadius: 10, padding: "7px 10px" }}>
        <WaveBars size={14} color="linear-gradient(135deg,#7c3aed,#a78bfa)" />
        <p style={{ margin: 0, fontSize: 10, color: "#6b7280", flex: 1 }}>Ask anything...</p>
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 10 }}>🎤</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Phone screen: Hotel Travel ─────────────────────────────────── */
function ScreenTravel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 12px", background: "#fff", gap: 6 }}>
      <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#0f1035" }}>Find a hotel in Chicago next weekend</p>
      <div style={{ background: "#f5f3ff", borderRadius: 8, padding: "5px 8px", fontSize: 9, color: "#7c3aed", fontWeight: 600 }}>Here are some hotel options for you in Chicago this weekend:</div>
      {[
        { name: "The Langham Chicago", stars: "4.8", price: "$229", reviews: "1,847 reviews" },
        { name: "Renaissance Chicago", stars: "4.6", price: "$189", reviews: "2,341 reviews" },
        { name: "Hyatt Place Chicago", stars: "4.5", price: "$149", reviews: "3,201 reviews" },
      ].map((h, i) => (
        <div key={i} style={{ display: "flex", gap: 7, alignItems: "center", background: "#f8f7ff", borderRadius: 8, padding: "7px 8px" }}>
          <div style={{ width: 32, height: 32, borderRadius: 7, background: "linear-gradient(135deg,#ede9fe,#c4b5fd)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🏨</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 8, fontWeight: 700, color: "#0f1035", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.name}</p>
            <p style={{ margin: 0, fontSize: 7, color: "#92400e" }}>★ {h.stars} · {h.reviews}</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 10, fontWeight: 800, color: "#7c3aed" }}>{h.price}</p>
            <p style={{ margin: 0, fontSize: 7, color: "#6b7280" }}>/night</p>
          </div>
          <div style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 6, padding: "4px 6px", fontSize: 7, fontWeight: 700 }}>View</div>
        </div>
      ))}
      <div style={{ background: "#f5f3ff", borderRadius: 8, padding: "6px 10px", fontSize: 9, color: "#6b7280" }}>Ask anything...</div>
    </div>
  );
}

/* ─── Phone screen: Payment ──────────────────────────────────────── */
function ScreenPayment() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 12px", background: "#fff", gap: 5 }}>
      <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#0f1035" }}>Add a payment method</p>
      {[
        { icon: "💳", label: "Credit or Debit Card", sub: "Secured with Stripe" },
        { icon: "🍎", label: "Apple Pay" },
        { icon: "G", label: "Google Pay", g: true },
        { icon: "🔗", label: "Link (Stripe)" },
        { icon: "P", label: "PayPal", p: true },
        { icon: "+", label: "Add Later", plus: true },
      ].map((m, i, arr) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, paddingBottom: i < arr.length - 1 ? 5 : 0, borderBottom: i < arr.length - 1 ? "1px solid #f3f4f6" : "none" }}>
          <div style={{ width: 26, height: 26, borderRadius: 7, background: m.g ? "#4285f4" : m.p ? "#003087" : "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: m.icon.length > 1 ? 11 : 13, fontWeight: 800, color: m.g || m.p ? "#fff" : "#374151", flexShrink: 0 }}>{m.icon}</div>
          <div>
            <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: "#0f1035" }}>{m.label}</p>
            {m.sub && <p style={{ margin: 0, fontSize: 8, color: "#6b7280" }}>{m.sub}</p>}
          </div>
          <div style={{ marginLeft: "auto", width: 14, height: 14, borderRadius: "50%", border: "1.5px solid #e5e7eb", flexShrink: 0 }} />
        </div>
      ))}
      <div style={{ marginTop: 6, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 11, padding: "9px 0", textAlign: "center", fontSize: 11, fontWeight: 700 }}>Continue</div>
      <p style={{ textAlign: "center", fontSize: 8, color: "#9ca3af", margin: "2px 0 0" }}>Your payment information is safe and securely encrypted.</p>
    </div>
  );
}

/* ─── Hero chat bubble ───────────────────────────────────────────── */
function HeroChatBubble({ text, category, delay = 0 }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  const catColors = {
    food: "#f97316", travel: "#3b82f6", shopping: "#10b981", events: "#f59e0b", services: "#8b5cf6",
  };
  const color = catColors[category] || "#7c3aed";
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.92)",
        transition: "all 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        background: "#fff",
        borderRadius: 14,
        padding: "10px 14px",
        boxShadow: "0 6px 24px rgba(0,0,0,0.10)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        maxWidth: 180,
        border: "1px solid rgba(124,58,237,0.08)",
      }}
    >
      <div style={{ width: 28, height: 28, borderRadius: 9, background: color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
        {{ food: "🍔", travel: "🏨", shopping: "🛍️", events: "🎟️", services: "📅" }[category] || "✨"}
      </div>
      <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#0f1035", lineHeight: 1.3 }}>{text}</p>
    </div>
  );
}

/* ─── Right panel chat demo ──────────────────────────────────────── */
function RightChatDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setStep(s => Math.min(s + 1, 4)), 1000);
    return () => clearTimeout(t);
  }, [step]);
  const msgs = [
    { role: "user", text: "Find me running shoes under $150" },
    { role: "mio", text: "Found 5 great options!" },
    { role: "mio", text: "Compare features" },
    { role: "mio", text: "Add to cart" },
    { role: "mio", text: "Secure checkout" },
  ];
  return (
    <div style={{ background: "#fff", borderRadius: 20, padding: "16px", border: "1.5px solid #ede9fe", boxShadow: "0 8px 32px rgba(124,58,237,0.08)" }}>
      {/* Search bar */}
      <div style={{ background: "#f5f3ff", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 20, height: 20, borderRadius: 6, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ color: "#fff", fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 9 }}>M</span>
        </div>
        <p style={{ margin: 0, fontSize: 12, color: "#7c3aed", fontWeight: 600 }}>Find me running shoes under $150</p>
      </div>
      {/* Chat steps */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {msgs.map((m, i) => i <= step && (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, opacity: 1, animation: "slide-up 0.4s ease" }}>
            {m.role === "mio" ? (
              <>
                <div style={{ width: 22, height: 22, borderRadius: 7, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "#fff", fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 9 }}>M</span>
                </div>
                <div style={{ background: "#f5f3ff", borderRadius: 10, padding: "6px 12px", fontSize: 11, fontWeight: 600, color: "#0f1035", flex: 1 }}>{m.text}</div>
              </>
            ) : (
              <>
                <div style={{ flex: 1 }} />
                <div style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", borderRadius: 10, padding: "6px 12px", fontSize: 11, fontWeight: 600, color: "#fff" }}>{m.text}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Waitlist form ──────────────────────────────────────────────── */
function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const errId = "waitlist-err";

  async function submit(e) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      await pb.collection("waitlist").create({ email, source: "homepage" });
      setStatus("done");
    } catch (err) {
      if (err?.data?.email?.code === "validation_not_unique") {
        setStatus("done");
      } else {
        setError("Something went wrong — please try again.");
        setStatus("idle");
      }
    }
  }

  if (status === "done") {
    return (
      <div role="status" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 16, padding: "16px 24px", display: "flex", alignItems: "center", gap: 10 }}>
        <CheckIcon size={20} color="#a3e635" />
        <p style={{ margin: 0, fontSize: 14, color: "#fff", fontWeight: 600 }}>You're on the list! We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate style={{ display: "flex", gap: 0, maxWidth: 440 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <label htmlFor="waitlist-email" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>Email address</label>
        <input
          id="waitlist-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-invalid={!!error}
          aria-describedby={error ? errId : undefined}
          required
          style={{ flex: 1, background: "rgba(255,255,255,0.95)", border: "none", borderRadius: "12px 0 0 12px", padding: "14px 18px", fontSize: 14, color: "#0f1035", outline: "none", minWidth: 0 }}
        />
        {error && <p id={errId} role="alert" style={{ margin: "4px 0 0 4px", fontSize: 12, color: "#b91c1c" }}>{error}</p>}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        style={{ background: "#7c3aed", color: "#fff", border: "none", borderRadius: "0 12px 12px 0", padding: "14px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
      >
        {status === "loading" ? "…" : "Get Early Access"}
      </button>
    </form>
  );
}

/* ─── Main Home ──────────────────────────────────────────────────── */
export default function Home() {
  const [showVoice, setShowVoice] = useState(false);
  const [voiceResult, setVoiceResult] = useState(null);

  return (
    <main>
      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section style={{ paddingTop: 64, minHeight: "100vh", background: "#fff", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center", minHeight: "calc(100vh - 64px)" }}>

            {/* LEFT — headline + CTAs */}
            <div style={{ paddingTop: 40, paddingBottom: 40 }}>
              {/* Badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 20, padding: "5px 12px", marginBottom: 20 }}>
                <WaveBars size={12} color="#7c3aed" />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", letterSpacing: 0.5, textTransform: "uppercase" }}>AI Powered Assistant</span>
              </div>

              {/* Headline — matching reference exactly */}
              <h1 style={{ fontFamily: "Syne,sans-serif", fontWeight: 900, fontSize: "clamp(40px,5.5vw,64px)", lineHeight: 1.06, color: "#0f1035", margin: "0 0 4px", letterSpacing: -1 }}>
                Talk. Find. Book.
              </h1>
              <h1 style={{ fontFamily: "Syne,sans-serif", fontWeight: 900, fontSize: "clamp(40px,5.5vw,64px)", lineHeight: 1.06, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: "0 0 20px", letterSpacing: -1 }}>
                Order. Pay.
              </h1>

              <p style={{ fontSize: "clamp(15px,1.4vw,18px)", fontWeight: 700, color: "#0f1035", margin: "0 0 6px" }}>
                One assistant. Endless possibilities.
              </p>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.6, margin: "0 0 28px", maxWidth: 420 }}>
                Mio helps you shop, dine, travel, book services and handle payments — all through natural conversation.
              </p>

              {/* CTA row */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
                <Link
                  to="/onboarding"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 12, padding: "13px 24px", fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 6px 24px rgba(124,58,237,0.35)" }}
                >
                  Get Mio Free <ArrowRightIcon size={16} />
                </Link>
                <button
                  onClick={() => setShowVoice(v => !v)}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: "1.5px solid #e5e7eb", color: "#0f1035", borderRadius: 12, padding: "13px 20px", fontWeight: 600, fontSize: 15, cursor: "pointer" }}
                >
                  <PlayIcon size={18} color="#7c3aed" />
                  Watch Demo
                </button>
              </div>

              {/* App store badges */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
                {[
                  { icon: "🍎", line1: "Download on the", line2: "App Store" },
                  { icon: "▶", line1: "GET IT ON", line2: "Google Play" },
                ].map((b) => (
                  <div key={b.line2} style={{ display: "flex", alignItems: "center", gap: 8, background: "#0f1035", borderRadius: 10, padding: "7px 14px", cursor: "pointer" }}>
                    <span style={{ fontSize: 18, color: "#fff" }}>{b.icon}</span>
                    <div>
                      <p style={{ margin: 0, fontSize: 8, color: "#71767f", letterSpacing: 0.3 }}>{b.line1}</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#fff", fontWeight: 700 }}>{b.line2}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats row — matching reference */}
              <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p style={{ margin: 0, fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 18, color: s.value === "All in One" ? "#7c3aed" : "#0f1035" }}>{s.value}</p>
                    <p style={{ margin: 0, fontSize: 11, color: "#6b7280", fontWeight: 500 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — hero image + floating bubbles */}
            <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 560 }}>
              {/* Purple glow circle */}
              <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.12) 0%,rgba(124,58,237,0) 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
              {/* Woman image placeholder — circular crop */}
              <div style={{ width: 340, height: 440, borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%", background: "linear-gradient(180deg,#f0ebff 0%,#e4d9ff 60%,#c4b0ff 100%)", display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
                <div style={{ fontSize: 120, marginBottom: -8 }}>👩</div>
              </div>

              {/* Floating category bubbles */}
              <div style={{ position: "absolute", top: "12%", right: -10 }}>
                <HeroChatBubble text="Mio, order my usual from McDonald's" category="food" delay={400} />
              </div>
              <div style={{ position: "absolute", top: "38%", right: -30 }}>
                <HeroChatBubble text="Food & Dining" category="food" delay={900} />
              </div>
              <div style={{ position: "absolute", bottom: "30%", right: -20 }}>
                <HeroChatBubble text="Hotels & Travel" category="travel" delay={1400} />
              </div>
              <div style={{ position: "absolute", bottom: "10%", right: 20 }}>
                <HeroChatBubble text="Shopping" category="shopping" delay={1800} />
              </div>
              <div style={{ position: "absolute", bottom: "18%", right: 220 }}>
                <HeroChatBubble text="Bookings & Services" category="services" delay={2200} />
              </div>

              {/* AI badge floating */}
              <div style={{ position: "absolute", top: "28%", left: -20, background: "#fff", borderRadius: 20, padding: "10px 14px", boxShadow: "0 8px 32px rgba(124,58,237,0.15)", display: "flex", alignItems: "center", gap: 8, border: "1px solid #ede9fe" }}>
                <WaveBars size={18} color="#7c3aed" />
                <div>
                  <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: "#0f1035" }}>AI Powered</p>
                  <p style={{ margin: 0, fontSize: 9, color: "#6b7280" }}>Understands you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VOICE BOT PANEL (toggled) ═══════════════════════════ */}
      {showVoice && (
        <section style={{ background: "#f8f7ff", padding: "40px 24px" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 24, color: "#0f1035", textAlign: "center", margin: "0 0 24px" }}>
              Try MioBot — Speak Your Request
            </h2>
            <MioVoiceBot onResult={setVoiceResult} />
            {voiceResult && (
              <div style={{ marginTop: 16, textAlign: "center" }}>
                <Link
                  to={`/search?cat=${voiceResult.category}&q=${encodeURIComponent(voiceResult.transcript)}`}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 12, padding: "12px 24px", fontWeight: 700, fontSize: 14, textDecoration: "none" }}
                >
                  See Full Results <ArrowRightIcon size={16} />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══ CATEGORIES — matching reference right panel ══════════ */}
      <section style={{ padding: "72px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

            {/* Left — "Everything You Need. Just Ask Mio." */}
            <div>
              <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 900, fontSize: "clamp(28px,3vw,42px)", color: "#0f1035", margin: "0 0 40px", lineHeight: 1.1 }}>
                Everything You Need.{" "}
                <span style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Just Ask Mio.
                </span>
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.label}
                    to={cat.path}
                    style={{ textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 10, padding: "20px 16px", borderRadius: 20, border: "1px solid #f3f4f6", background: "#fff", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#f5f3ff"; e.currentTarget.style.borderColor = "#ddd6fe"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "#f3f4f6"; }}
                  >
                    <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg,#f5f3ff,#ede9fe)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                      {cat.emoji}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 13, color: "#0f1035" }}>{cat.label}</p>
                      <p style={{ margin: "3px 0 0", fontSize: 11, color: "#6b7280" }}>{cat.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right — phone + chat demo */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <PhoneFrame width={210} height={400}>
                  <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px", background: "#fff", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 9, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "#fff", fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 12 }}>M</span>
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, fontFamily: "Syne,sans-serif", color: "#0f1035" }}>Mio</p>
                        <p style={{ margin: 0, fontSize: 8, color: "#6b7280" }}>Your AI Assistant for Everyday Life</p>
                      </div>
                    </div>
                    <div style={{ background: "#f5f3ff", borderRadius: 10, padding: "7px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                      <WaveBars size={14} color="#7c3aed" />
                      <p style={{ margin: 0, fontSize: 10, color: "#7c3aed", fontWeight: 600 }}>Ask Mio anything...</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                      {[["🛍️","Shopping"],["🍔","Food"],["✈️","Travel"],["🛎️","Services"],["💳","Payments"],["🎟️","Events"]].map(([e,l]) => (
                        <div key={l} style={{ background: "#f8f7ff", borderRadius: 8, padding: "7px 5px", textAlign: "center" }}>
                          <span style={{ fontSize: 14 }}>{e}</span>
                          <p style={{ margin: "2px 0 0", fontSize: 9, color: "#374151", fontWeight: 600 }}>{l}</p>
                        </div>
                      ))}
                    </div>
                    <p style={{ fontSize: 10, fontWeight: 700, color: "#0f1035", margin: "2px 0 0" }}>AI Picks for You</p>
                    <div style={{ display: "flex", gap: 5 }}>
                      {[["🎧","$349"],["👟","$119"],["🧳","$89"],["🎵","$189"]].map(([e,p]) => (
                        <div key={p} style={{ flex: 1, background: "#f5f3ff", borderRadius: 6, padding: "5px 3px", textAlign: "center" }}>
                          <span style={{ fontSize: 14 }}>{e}</span>
                          <p style={{ margin: "2px 0 0", fontSize: 8, color: "#7c3aed", fontWeight: 700 }}>{p}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </PhoneFrame>
              </div>
              <RightChatDemo />
            </div>
          </div>
        </div>
      </section>

      {/* ══ PHONE MOCKUPS SECTION — 5 phones matching reference ═ */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(180deg,#f8f7ff 0%,#fff 100%)", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 10px" }}>Mobile App Screens (Onboarding &amp; Key Flows)</p>
            <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 900, fontSize: "clamp(26px,3vw,38px)", color: "#0f1035", margin: 0 }}>
              Built for how people actually live
            </h2>
          </div>
          {/* 5 phones */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "flex-end", flexWrap: "wrap", overflowX: "auto", padding: "0 0 16px" }}>
            {[
              { Screen: ScreenWelcome, tall: false },
              { Screen: ScreenCategories, tall: true },
              { Screen: ScreenShopping, tall: true },
              { Screen: ScreenTravel, tall: true },
              { Screen: ScreenPayment, tall: false },
            ].map(({ Screen, tall }, i) => (
              <PhoneFrame key={i} width={168} height={tall ? 360 : 330}>
                <Screen />
              </PhoneFrame>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BUSINESS DASHBOARD PREVIEW ══════════════════════════ */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 10px" }}>Business Dashboard (Web)</p>
              <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 900, fontSize: "clamp(26px,3vw,38px)", color: "#0f1035", margin: "0 0 16px", lineHeight: 1.1 }}>
                Full visibility over your business
              </h2>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: "0 0 24px" }}>
                Real-time orders, revenue, team activity and customer data — all in one beautifully simple dashboard.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {["Live order tracking & revenue metrics", "Customer management & loyalty data", "Menu & product catalogue control", "Integration health & commission tracking"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckIcon size={16} color="#7c3aed" />
                    <p style={{ margin: 0, fontSize: 14, color: "#374151", fontWeight: 500 }}>{f}</p>
                  </div>
                ))}
              </div>
              <Link to="/merchant" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 12, padding: "12px 22px", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                View Dashboard <ArrowRightIcon size={15} />
              </Link>
            </div>

            {/* Dashboard mockup */}
            <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #e5e7eb", boxShadow: "0 16px 48px rgba(0,0,0,0.08)", overflow: "hidden" }}>
              {/* Top bar */}
              <div style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 14, color: "#0f1035" }}>Mio</div>
                <div style={{ flex: 1, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "5px 10px", fontSize: 11, color: "#9ca3af" }}>Search orders, products...</div>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 11, color: "#fff", fontWeight: 700 }}>KM</span>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                {/* Sidebar */}
                <div style={{ width: 120, background: "#fff", borderRight: "1px solid #f3f4f6", padding: "12px 0" }}>
                  {["Dashboard","Orders","Menu & Catalog","Reservations","Customers","Payments","Analytics","Marketing","Integrations","Team","Settings"].map((item, i) => (
                    <div key={item} style={{ padding: "6px 12px", fontSize: 10, fontWeight: i === 0 ? 700 : 500, color: i === 0 ? "#7c3aed" : "#6b7280", background: i === 0 ? "#f5f3ff" : "transparent", borderLeft: i === 0 ? "2px solid #7c3aed" : "2px solid transparent", cursor: "pointer" }}>
                      {item}
                    </div>
                  ))}
                </div>
                {/* Main area */}
                <div style={{ flex: 1, padding: 14 }}>
                  <p style={{ margin: "0 0 4px", fontSize: 12, fontWeight: 700, color: "#0f1035" }}>Good morning, Alex!</p>
                  <p style={{ margin: "0 0 12px", fontSize: 10, color: "#6b7280" }}>Here's what's happening at Bella Vista Restaurant today.</p>
                  {/* Stats row */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6, marginBottom: 12 }}>
                    {[
                      { label: "Your Orders", value: "1,248", delta: "+12%" },
                      { label: "Revenue", value: "$18,932", delta: "+18%" },
                      { label: "Customers", value: "892", delta: "+9%" },
                      { label: "Avg. Order Value", value: "$15.16", delta: "+3%" },
                    ].map(s => (
                      <div key={s.label} style={{ background: "#f9fafb", borderRadius: 8, padding: "8px 10px" }}>
                        <p style={{ margin: 0, fontSize: 8, color: "#6b7280" }}>{s.label}</p>
                        <p style={{ margin: "2px 0", fontSize: 13, fontWeight: 800, color: "#0f1035" }}>{s.value}</p>
                        <p style={{ margin: 0, fontSize: 8, color: "#166534", fontWeight: 600 }}>{s.delta}</p>
                      </div>
                    ))}
                  </div>
                  {/* Chart placeholder */}
                  <div style={{ background: "#f9fafb", borderRadius: 8, padding: "10px", marginBottom: 10 }}>
                    <p style={{ margin: "0 0 8px", fontSize: 9, fontWeight: 600, color: "#374151" }}>Orders &amp; Revenue</p>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 48 }}>
                      {[65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88, 70].map((h, i) => (
                        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 1, alignItems: "stretch" }}>
                          <div style={{ height: `${h * 0.55}%`, background: "linear-gradient(180deg,#7c3aed,#4f46e5)", borderRadius: "2px 2px 0 0", maxHeight: 26 }} />
                          <div style={{ height: `${h * 0.35}%`, background: "#ddd6fe", borderRadius: "0 0 2px 2px", maxHeight: 16 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Top items */}
                  <div>
                    <p style={{ margin: "0 0 6px", fontSize: 9, fontWeight: 600, color: "#374151" }}>Top Items</p>
                    {[["Margherita Pizza","342"],["Chicken Alfredo","289"],["Caesar Salad","314"],["Grilled Salmon","180"],["Tiramisu","162"]].map(([item, cnt]) => (
                      <div key={item} style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", borderBottom: "1px solid #f3f4f6" }}>
                        <span style={{ fontSize: 9, color: "#374151" }}>{item}</span>
                        <span style={{ fontSize: 9, fontWeight: 700, color: "#0f1035" }}>{cnt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ NFC / IN-STORE ══════════════════════════════════════ */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg,#f8f7ff,#fff)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            {/* NFC device mockup */}
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              {/* Physical device */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <div style={{ width: 130, height: 130, borderRadius: 28, background: "linear-gradient(135deg,#f5f3ff,#ede9fe)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 16px 40px rgba(124,58,237,0.15)" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 50, height: 50, borderRadius: 14, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, color: "#fff", fontSize: 22 }}>M</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: "#7c3aed" }}>Mio</p>
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 11, color: "#6b7280", fontWeight: 500 }}>EasyTap Go Device</p>
              </div>
              {/* Steps */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingTop: 8 }}>
                {[
                  ["📡", "Tap NFC Tag", "Open menu instantly"],
                  ["🛒", "Order with Mio", "Customise your order"],
                  ["🔒", "Pay Securely", "Using saved card"],
                  ["✅", "Get Confirmation", "Track your order"],
                ].map(([icon, title, sub]) => (
                  <div key={title} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "#fff", borderRadius: 12, border: "1px solid #ede9fe", boxShadow: "0 2px 8px rgba(124,58,237,0.05)" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{icon}</div>
                    <div>
                      <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "#0f1035" }}>{title}</p>
                      <p style={{ margin: 0, fontSize: 10, color: "#6b7280" }}>{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", letterSpacing: 1, textTransform: "uppercase", margin: "0 0 10px" }}>Mio + NFC / In-Store Experience</p>
              <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 900, fontSize: "clamp(26px,3vw,38px)", color: "#0f1035", margin: "0 0 16px", lineHeight: 1.1 }}>
                Tap your phone.<br />Order. Pay. Done.
              </h2>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: "0 0 24px" }}>
                Mio's EasyTap technology brings the AI assistant experience into the physical world — restaurants, stores, hotels, events.
              </p>
              <Link to="/easytap" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 12, padding: "12px 22px", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                Learn More <ArrowRightIcon size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ LIVE VOICE SEARCH CTA ═══════════════════════════════ */}
      <section style={{ padding: "80px 24px", background: "#0f1035" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.4)", borderRadius: 20, padding: "5px 12px", marginBottom: 20 }}>
            <WaveBars size={12} color="#a78bfa" />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#a78bfa", letterSpacing: 0.5, textTransform: "uppercase" }}>Voice Powered</span>
          </div>
          <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 900, fontSize: "clamp(28px,4vw,48px)", color: "#fff", margin: "0 0 16px", lineHeight: 1.1 }}>
            Just say what you need.<br />
            <span style={{ background: "linear-gradient(135deg,#a78bfa,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Mio handles everything.</span>
          </h2>
          <p style={{ fontSize: 16, color: "#a3aab5", lineHeight: 1.7, margin: "0 0 36px" }}>
            Shop, book, order, and pay through natural conversation — no apps to learn, no forms to fill.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <Link to="/onboarding" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 12, padding: "14px 28px", fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
              Start for Free <ArrowRightIcon size={16} />
            </Link>
            <button
              onClick={() => setShowVoice(v => !v)}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 12, padding: "14px 24px", fontWeight: 600, fontSize: 15, cursor: "pointer" }}
            >
              <MicIcon size={18} color="#a78bfa" />
              Try Voice Now
            </button>
          </div>
        </div>
      </section>

      {/* ══ WAITLIST ════════════════════════════════════════════ */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 900, fontSize: "clamp(26px,3vw,38px)", color: "#fff", margin: "0 0 12px" }}>
            Get early access to Mio
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", margin: "0 0 28px" }}>
            Join 50,000+ businesses and 1M+ users already on the waitlist.
          </p>
          <WaitlistForm />
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════ */}
      <footer style={{ background: "#0f1035", padding: "56px 0 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8" style={{ marginBottom: 40 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: 9, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: 13, fontFamily: "Syne,sans-serif" }}>M</span>
                </div>
                <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 18, background: "linear-gradient(135deg,#7c3aed,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Mio</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#a3aab5", margin: "0 0 16px" }}>Your AI assistant for everyday life — shop, dine, travel, and pay through natural conversation.</p>
              <div style={{ display: "flex", gap: 8 }}>
                {["🐦","📘","📸","💼"].map((icon, i) => (
                  <div key={i} style={{ width: 32, height: 32, borderRadius: 9, background: "#1a1b4b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer" }}>{icon}</div>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: [["Features","/features"],["Pricing","/pricing"],["Onboarding","/onboarding"],["Widget Demo","/widget"]] },
              { title: "Business", links: [["Merchant Dashboard","/merchant"],["Admin Console","/admin"],["Developer Portal","/developers"],["Integrations","/integrations"]] },
              { title: "Legal", links: [["Privacy Policy","#"],["Terms of Service","#"],["Cookie Policy","#"],["Contact","#"]] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontWeight: 700, color: "#e5e7eb", fontSize: 13, margin: "0 0 14px" }}>{col.title}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {col.links.map(([label, path]) => (
                    <Link key={label} to={path} style={{ fontSize: 13, color: "#a3aab5", textDecoration: "none" }}>{label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #1e2155", paddingTop: 22, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <p style={{ margin: 0, fontSize: 12, color: "#8b92a0" }}>© 2026 Mio AI. All rights reserved.</p>
            <p style={{ margin: 0, fontSize: 12, color: "#8b92a0" }}>Talk. Find. Book. Order. Pay.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
