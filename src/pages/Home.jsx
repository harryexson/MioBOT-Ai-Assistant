import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import ArrowRightIcon from "icon:arrow-right";
import CheckIcon from "icon:check-circle";
import ZapIcon from "icon:zap";
import ShieldIcon from "icon:shield-check";
import SmartphoneIcon from "icon:smartphone";
import SearchIcon from "icon:search";
import ShoppingCartIcon from "icon:shopping-cart";
import LockIcon from "icon:lock";
import StarIcon from "icon:star";
import MicIcon from "icon:mic";
import PlayIcon from "icon:play-circle";
import TrendingUpIcon from "icon:trending-up";
import UsersIcon from "icon:users";
import DollarSignIcon from "icon:dollar-sign";
import WifiIcon from "icon:wifi";
import MapPinIcon from "icon:map-pin";
import ClockIcon from "icon:clock";
import { pb } from "../lib/pb.js";
import { searchProducts, SUBSCRIPTION_PLANS } from "../lib/mockProviders.js";

/* ─── Category data ─────────────────────────────────────────────────── */
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
  { value: "4.8★", label: "App Rating" },
  { value: "All in One", label: "Shop. Book. Pay." },
];

const CHAT_STEPS = [
  { role: "user", text: "Mio, find me running shoes under $150." },
  { role: "mio", text: "Found 5 great options! Nike Air Max 270 at $119.99 is the top pick — 4.7 stars, 2-day delivery." },
  { role: "user", text: "Add the Nike ones to cart." },
  { role: "mio", text: "Added to cart. Ready to checkout? I can apply your saved card in one tap 🎉" },
];

/* ─── Animated AI wave ─────────────────────────────────────────────── */
function AIWave({ size = 24 }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2.5, height: size }}>
      {[0.5, 1, 0.7, 0.9, 0.6, 1, 0.8].map((h, i) => (
        <div
          key={i}
          className="wave-bar"
          style={{
            width: 3,
            height: `${h * 100}%`,
            borderRadius: 2,
            background: "linear-gradient(180deg,#a78bfa,#7c3aed)",
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Phone screen content ────────────────────────────────────────── */
function PhoneWelcome() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "16px 14px 14px", background: "#fff" }}>
      {/* Status bar */}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#6d727a", marginBottom: 12 }}>
        <span>9:41</span>
        <span>📶 🔋</span>
      </div>
      {/* Logo */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, justifyContent: "center", gap: 8 }}>
        <div style={{ width: 56, height: 56, borderRadius: 18, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 26, fontFamily: "Syne, sans-serif" }}>M</span>
        </div>
        <p style={{ margin: 0, fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 18, color: "#0f1035" }}>Mio</p>
        <p style={{ margin: 0, fontSize: 11, color: "#6b7280", textAlign: "center" }}>Your AI Assistant{"\n"}for Everyday Life</p>
      </div>
      {/* Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 14, padding: "11px 0", textAlign: "center", fontSize: 13, fontWeight: 700 }}>Get Started</div>
        <div style={{ border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "10px 0", textAlign: "center", fontSize: 13, fontWeight: 600, color: "#374151" }}>Sign In</div>
        <p style={{ textAlign: "center", fontSize: 10, color: "#6d727a", margin: "4px 0 0" }}>Skip for now</p>
      </div>
    </div>
  );
}

function PhoneCategories() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "12px 14px", background: "#fff", gap: 10 }}>
      <div style={{ fontSize: 10, color: "#6d727a", fontWeight: 500 }}>What would you like to use Mio for?</div>
      {[
        ["🛍️", "Shopping"],
        ["🍔", "Food & Restaurants"],
        ["✈️", "Travel & Hotels"],
        ["📅", "Services & Bookings"],
        ["💳", "Pay Bills & Invoices"],
        ["🎟️", "Events & Tickets"],
        ["✨", "Other"],
      ].map(([e, l]) => (
        <div key={l} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: "#f8f7ff", borderRadius: 12, cursor: "pointer" }}>
          <span style={{ fontSize: 16 }}>{e}</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#0f1035" }}>{l}</span>
          <div style={{ marginLeft: "auto", width: 16, height: 16, borderRadius: "50%", border: "1.5px solid #e5e7eb" }} />
        </div>
      ))}
    </div>
  );
}

function PhoneShopping() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "12px 14px", background: "#fff", gap: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#0f1035" }}>AI Shopping Assistant</div>
      <div style={{ background: "#f5f3ff", borderRadius: 12, padding: "10px 12px" }}>
        <p style={{ margin: "0 0 6px", fontSize: 10, color: "#7c3aed", fontWeight: 600 }}>⚡ Top pick for you</p>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg,#ede9fe,#ddd6fe)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🎧</div>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: "#0f1035" }}>Sony WH-1000XM5</p>
            <p style={{ margin: 0, fontSize: 9, color: "#55606e" }}>Best noise-cancelling pick</p>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#7c3aed" }}>$349</p>
          </div>
        </div>
        <div style={{ marginTop: 8, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 10, padding: "7px 0", textAlign: "center", fontSize: 11, fontWeight: 700 }}>Add to cart</div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {[["🎵","$189"],["👟","$119"],["🧳","$89"]].map(([e, p]) => (
          <div key={p} style={{ flex: 1, background: "#f8f7ff", borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
            <span style={{ fontSize: 18 }}>{e}</span>
            <p style={{ margin: "4px 0 0", fontSize: 10, fontWeight: 700, color: "#7c3aed" }}>{p}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f8f7ff", borderRadius: 12, padding: "8px 12px", marginTop: "auto" }}>
        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 9, color: "#fff", fontWeight: 800 }}>M</span>
        </div>
        <p style={{ margin: 0, fontSize: 10, color: "#6d727a", flex: 1 }}>Ask anything...</p>
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 10 }}>🎤</span>
        </div>
      </div>
    </div>
  );
}

function PhoneTravel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "12px 14px", background: "#fff", gap: 8 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#0f1035" }}>Hotels in Chicago</div>
      <div style={{ background: "#f5f3ff", borderRadius: 10, padding: "6px 8px", fontSize: 10, color: "#7c3aed", fontWeight: 600 }}>Finding top-rated hotels in Chicago for you</div>
      {[
        { name: "The Langham Chicago", stars: "4.8", price: "$229", img: "🏨", reviews: "1,847 reviews" },
        { name: "Renaissance Chicago", stars: "4.6", price: "$189", img: "🏩", reviews: "2,341 reviews" },
        { name: "Hyatt Place Chicago", stars: "4.5", price: "$149", img: "🛎️", reviews: "3,201 reviews" },
      ].map((h, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", background: "#f8f7ff", borderRadius: 10, padding: "8px 10px" }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg,#ede9fe,#c4b5fd)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{h.img}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 9, fontWeight: 700, color: "#0f1035", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{h.name}</p>
            <p style={{ margin: 0, fontSize: 8, color: "#9d6607" }}>★ {h.stars}</p>
            <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: "#7c3aed" }}>{h.price}<span style={{ fontSize: 8, color: "#6d727a", fontWeight: 400 }}>/night</span></p>
          </div>
          <div style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 8, padding: "5px 8px", fontSize: 8, fontWeight: 700, flexShrink: 0 }}>View</div>
        </div>
      ))}
    </div>
  );
}

function PhonePayment() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "12px 14px", background: "#fff", gap: 6 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#0f1035" }}>Add a payment method</div>
      {[
        { icon: "💳", label: "Credit or Debit Card", sub: "Secured with Stripe" },
        { icon: "🍎", label: "Apple Pay", sub: "" },
        { icon: "G", label: "Google Pay", sub: "" },
        { icon: "🔗", label: "Link (Stripe)", sub: "" },
        { icon: "🅿️", label: "PayPal", sub: "" },
      ].map((m, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: i < 4 ? "1px solid #f3f4f6" : "none" }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: m.icon === "G" ? 13 : 15, fontWeight: 800, color: "#374151", flexShrink: 0 }}>{m.icon}</div>
          <div>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: "#0f1035" }}>{m.label}</p>
            {m.sub && <p style={{ margin: 0, fontSize: 9, color: "#6d727a" }}>{m.sub}</p>}
          </div>
          <div style={{ marginLeft: "auto", width: 18, height: 18, borderRadius: "50%", border: "1.5px solid #e5e7eb", flexShrink: 0 }} />
        </div>
      ))}
      <div style={{ marginTop: 8, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", borderRadius: 12, padding: "10px 0", textAlign: "center", fontSize: 12, fontWeight: 700 }}>Continue</div>
      <p style={{ textAlign: "center", fontSize: 9, color: "#6d727a", margin: "4px 0 0" }}>Your payment info is safe and securely encrypted.</p>
    </div>
  );
}

/* ─── Realistic phone frame ─────────────────────────────────────────── */
function PhoneFrame({ children, width = 175, tall = false }) {
  const height = tall ? 380 : 330;
  return (
    <div style={{
      width,
      height,
      background: "#0f1035",
      borderRadius: 44,
      padding: "10px 8px",
      boxShadow: "0 32px 80px rgba(15,16,53,0.35), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.05)",
      position: "relative",
      flexShrink: 0,
    }}>
      {/* Side buttons */}
      <div style={{ position: "absolute", left: -3, top: 80, width: 3, height: 32, background: "#1a1b2e", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", left: -3, top: 124, width: 3, height: 32, background: "#1a1b2e", borderRadius: "2px 0 0 2px" }} />
      <div style={{ position: "absolute", right: -3, top: 100, width: 3, height: 52, background: "#1a1b2e", borderRadius: "0 2px 2px 0" }} />
      {/* Screen */}
      <div style={{ background: "#fff", borderRadius: 38, overflow: "hidden", height: "100%", position: "relative" }}>
        {/* Notch */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 90, height: 28, background: "#0f1035", borderRadius: "0 0 20px 20px", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1a1b2e" }} />
          <div style={{ width: 60, height: 4, background: "#1a1b2e", borderRadius: 2 }} />
        </div>
        <div style={{ paddingTop: 28, height: "100%" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── Hero phone (center) ─────────────────────────────────────────── */
function HeroPhone() {
  return (
    <PhoneFrame width={200} tall>
      <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px", background: "#fff", gap: 10 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 10, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 13, fontFamily: "Syne,sans-serif" }}>M</span>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 800, color: "#0f1035", fontFamily: "Syne,sans-serif" }}>Mio</p>
            <p style={{ margin: 0, fontSize: 9, color: "#6d727a" }}>Your AI Assistant for Everyday Life</p>
          </div>
        </div>
        {/* Voice prompt */}
        <div style={{ background: "#f5f3ff", borderRadius: 12, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
          <AIWave size={16} />
          <p style={{ margin: 0, fontSize: 10, color: "#7c3aed", fontWeight: 600 }}>Ask Mio anything...</p>
        </div>
        {/* Category grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {[["🛍️","Shopping"],["🍔","Food"],["✈️","Travel"],["🛎️","Services"],["💳","Payments"],["🎟️","Events"]].map(([e,l]) => (
            <div key={l} style={{ background: "#f8f7ff", borderRadius: 10, padding: "8px 6px", textAlign: "center" }}>
              <span style={{ fontSize: 16 }}>{e}</span>
              <p style={{ margin: "2px 0 0", fontSize: 9, color: "#374151", fontWeight: 600 }}>{l}</p>
            </div>
          ))}
        </div>
        {/* Picks */}
        <p style={{ fontSize: 10, fontWeight: 700, color: "#0f1035", margin: "4px 0 2px" }}>AI Picks for You</p>
        <div style={{ display: "flex", gap: 6 }}>
          {[["🎧","$349"],["👟","$119"],["🧳","$89"],["🎵","$189"]].map(([e,p]) => (
            <div key={p} style={{ flex: 1, background: "#f5f3ff", borderRadius: 8, padding: "6px 4px", textAlign: "center" }}>
              <span style={{ fontSize: 16 }}>{e}</span>
              <p style={{ margin: "2px 0 0", fontSize: 9, color: "#7c3aed", fontWeight: 700 }}>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

/* ─── Chat demo ───────────────────────────────────────────────────── */
function ChatDemo() {
  const [visible, setVisible] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || visible >= CHAT_STEPS.length) return;
    const t = setTimeout(() => setVisible(v => v + 1), 1600);
    return () => clearTimeout(t);
  }, [visible, isPlaying]);

  const replay = () => { setVisible(0); setIsPlaying(true); };

  return (
    <div className="glass" style={{ borderRadius: 24, padding: "20px 24px", maxWidth: 360, border: "1.5px solid #ede9fe" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontWeight: 800, fontSize: 16, fontFamily: "Syne,sans-serif" }}>M</span>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f1035" }}>Mio AI Assistant</p>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981" }} />
            <span style={{ fontSize: 11, color: "#6b7280" }}>Online — processing in real-time</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 180 }}>
        {CHAT_STEPS.slice(0, visible).map((msg, i) => (
          <div key={i} className="animate-slide-up" style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "mio" && (
              <div style={{ width: 24, height: 24, borderRadius: 8, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 6, flexShrink: 0, alignSelf: "flex-end" }}>
                <span style={{ color: "#fff", fontSize: 9, fontWeight: 800 }}>M</span>
              </div>
            )}
            <div style={{
              background: msg.role === "user" ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#f5f3ff",
              color: msg.role === "user" ? "#fff" : "#0f1035",
              borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              padding: "9px 14px",
              fontSize: 13,
              maxWidth: "78%",
              fontWeight: 500,
              lineHeight: 1.5,
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {visible < CHAT_STEPS.length && visible > 0 && (
          <div style={{ display: "flex", gap: 4, padding: "4px 12px" }}>
            {[0,1,2].map(i => (
              <div key={i} className="wave-bar" style={{ width: 7, height: 7, borderRadius: "50%", background: "#c4b5fd", animationDelay: `${i * 0.18}s` }} />
            ))}
          </div>
        )}
      </div>
      <button onClick={replay} style={{ marginTop: 12, width: "100%", background: "transparent", border: "none", color: "#7c3aed", fontSize: 12, fontWeight: 600, cursor: "pointer", textAlign: "center" }}>
        ↺ Replay demo
      </button>
    </div>
  );
}

/* ─── AI search prompt bubble (hero overlay) ─────────────────────── */
function PromptBubble({ text, top, left, right, delay = 0 }) {
  return (
    <div className="animate-float" style={{
      position: "absolute", top, left, right,
      background: "#fff",
      borderRadius: 16,
      padding: "10px 16px",
      boxShadow: "0 8px 32px rgba(124,58,237,0.18)",
      border: "1.5px solid #ede9fe",
      fontSize: 12,
      fontWeight: 600,
      color: "#0f1035",
      whiteSpace: "nowrap",
      animationDelay: `${delay}s`,
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      gap: 8,
    }}>
      <div style={{ width: 20, height: 20, borderRadius: 7, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 8, color: "#fff", fontWeight: 800 }}>M</span>
      </div>
      {text}
    </div>
  );
}

/* ─── Category chips (floating in hero) ────────────────────────────── */
function CategoryChip({ emoji, label, top, right, left, delay = 0 }) {
  return (
    <div className="animate-float" style={{
      position: "absolute", top, right, left,
      background: "#fff",
      borderRadius: 16,
      padding: "10px 16px",
      boxShadow: "0 8px 32px rgba(124,58,237,0.15)",
      border: "1.5px solid #ede9fe",
      display: "flex",
      alignItems: "center",
      gap: 10,
      animationDelay: `${delay}s`,
      zIndex: 10,
      whiteSpace: "nowrap",
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg,#f5f3ff,#ede9fe)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{emoji}</div>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#0f1035" }}>{label}</span>
    </div>
  );
}

/* ─── Waitlist form ─────────────────────────────────────────────── */
function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setError("");
    try {
      await pb.collection("waitlist").create({ email: email.trim() });
      setStatus("success");
      setEmail("");
    } catch (err) {
      if (err?.response?.data?.email?.code === "validation_not_unique") {
        setError("You're already on the list! We'll be in touch soon.");
        setStatus("error");
      } else {
        setError("Something went wrong. Please try again.");
        setStatus("error");
      }
    }
  };

  if (status === "success") {
    return (
      <div role="status" style={{ background: "#d1fae5", border: "1.5px solid #6ee7b7", borderRadius: 14, padding: "14px 20px", fontSize: 14, fontWeight: 600, color: "#065f46", textAlign: "center" }}>
        🎉 You're on the list! We'll notify you when Mio launches.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: 220 }}>
        <label htmlFor="waitlist-email" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>Email address</label>
        <input
          id="waitlist-email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "waitlist-error" : undefined}
          style={{ width: "100%", padding: "13px 18px", borderRadius: 50, border: "1.5px solid #e5e7eb", fontSize: 14, outline: "none", fontFamily: "DM Sans, sans-serif" }}
        />
      </div>
      <button type="submit" className="btn-primary" disabled={status === "loading"} style={{ whiteSpace: "nowrap" }}>
        {status === "loading" ? "Joining..." : "Get Early Access"}
        {status !== "loading" && <ArrowRightIcon size={16} />}
      </button>
      {status === "error" && (
        <p id="waitlist-error" style={{ width: "100%", margin: 0, fontSize: 13, color: "#991b1b", padding: "0 4px" }}>{error}</p>
      )}
    </form>
  );
}

/* ─── Main Home ─────────────────────────────────────────────────── */
export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeCategory, setActiveCategory] = useState("shopping");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const results = await searchProducts(searchQuery, activeCategory);
      setSearchResults(results);
      // Save search
      try {
        await pb.collection("searches").create({ query: searchQuery, category: activeCategory, results_count: results.length });
      } catch (_) { /* not critical */ }
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main style={{ background: "#ffffff" }}>

      {/* ══════════════════════════════════════════════════
          HERO SECTION — matches reference exactly
      ══════════════════════════════════════════════════ */}
      <section style={{ paddingTop: 72, background: "#ffffff", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 24px 60px" }}>
          <div className="grid md:grid-cols-2 gap-10" style={{ alignItems: "center" }}>

            {/* LEFT ─ copy + CTAs */}
            <div>
              {/* Badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f5f3ff", border: "1px solid #ede9fe", borderRadius: 50, padding: "5px 14px", marginBottom: 20 }}>
                <ZapIcon size={12} style={{ color: "#7c3aed" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed", letterSpacing: "0.04em" }}>AI POWERED ASSISTANT</span>
              </div>

              {/* Headline */}
              <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px,5.5vw,64px)", lineHeight: 1.06, color: "#0f1035", margin: "0 0 8px" }}>
                Talk. Find. Book.<br />
                <span className="gradient-text">Order. Pay.</span>
              </h1>
              <p style={{ fontSize: 19, color: "#374151", lineHeight: 1.5, fontWeight: 600, margin: "0 0 8px" }}>
                One assistant. Endless possibilities.
              </p>
              <p style={{ fontSize: 15, color: "#6b7280", lineHeight: 1.7, margin: "0 0 28px", maxWidth: 440 }}>
                Mio helps you shop, dine, travel, book services and handle payments — all through natural conversation.
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
                <Link to="/search" className="btn-primary" style={{ fontSize: 15 }}>
                  Get Mio Free <ArrowRightIcon size={16} />
                </Link>
                <Link to="/features" className="btn-secondary" style={{ fontSize: 15 }}>
                  <PlayIcon size={15} style={{ color: "#7c3aed" }} /> Watch Video
                </Link>
              </div>

              {/* App store badges */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
                {[
                  { icon: "🍎", top: "Download on the", main: "App Store" },
                  { icon: "▶", top: "GET IT ON", main: "Google Play" },
                ].map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: "#0f1035", color: "#fff", borderRadius: 12, padding: "8px 16px", cursor: "pointer" }}>
                    <span style={{ fontSize: 20 }}>{b.icon}</span>
                    <div>
                      <p style={{ margin: 0, fontSize: 9, color: "#9ca3af" }}>{b.top}</p>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700 }}>{b.main}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 28 }}>
                {STATS.map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 22, color: "#7c3aed" }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT ─ hero image + phone + floating chips */}
            <div style={{ position: "relative", height: 540, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Soft purple orb behind */}
              <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />

              {/* Hero woman photo — centered */}
              <img
                src="/static/stock_mio-hero-woman-a20595-0.jpg"
                alt="Woman using Mio AI assistant on her phone"
                style={{ height: 480, width: "auto", maxWidth: 340, objectFit: "cover", borderRadius: 32, position: "absolute", zIndex: 1, boxShadow: "0 24px 72px rgba(124,58,237,0.2)" }}
              />

              {/* Floating AI prompt bubble */}
              <PromptBubble text='Mio, order my usual from McDonald&apos;s.' top="6%" right="0%" delay={0} />

              {/* Floating category chips */}
              <CategoryChip emoji="🍔" label="Food & Dining" top="32%" right="-2%" delay={0.8} />
              <CategoryChip emoji="🏨" label="Hotels & Travel" top="55%" right="-2%" delay={1.4} />
              <CategoryChip emoji="🛍️" label="Shopping" top="75%" right="8%" delay={2} />
              <CategoryChip emoji="📅" label="Bookings & Services" top="87%" left="0%" delay={2.5} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          LIVE SEARCH DEMO
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#f8f7ff", padding: "64px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: "clamp(24px,3.5vw,38px)", color: "#0f1035", margin: "0 0 10px" }}>
              Search, Compare & Buy — <span className="gradient-text">Right Here</span>
            </h2>
            <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 540, margin: "0 auto" }}>
              Real results from top providers. Ask in plain language — Mio finds the best deals with referral commissions that keep the platform free.
            </p>
          </div>

          {/* Category tabs */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginBottom: 20 }}>
            {[
              { key: "shopping", label: "🛍️ Shopping" },
              { key: "food", label: "🍔 Food" },
              { key: "travel", label: "✈️ Travel" },
              { key: "events", label: "🎟️ Events" },
              { key: "services", label: "📅 Services" },
            ].map(cat => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                style={{
                  padding: "8px 18px", borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "1.5px solid",
                  borderColor: activeCategory === cat.key ? "#7c3aed" : "#e5e7eb",
                  background: activeCategory === cat.key ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#fff",
                  color: activeCategory === cat.key ? "#fff" : "#374151",
                  transition: "all 0.2s",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, maxWidth: 600, margin: "0 auto 32px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, position: "relative", minWidth: 240 }}>
              <label htmlFor="hero-search" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>Search Mio</label>
              <SearchIcon size={16} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#6d727a" }} />
              <input
                id="hero-search"
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeCategory}...`}
                style={{ width: "100%", padding: "14px 16px 14px 44px", borderRadius: 50, border: "1.5px solid #e5e7eb", fontSize: 14, fontFamily: "DM Sans, sans-serif", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ borderRadius: 50, fontSize: 14 }} disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </button>
          </form>

          {/* Results grid */}
          {searchResults.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16, maxWidth: 1100, margin: "0 auto" }}>
              {searchResults.map(item => (
                <div key={item.id} className="card-hover" style={{ background: "#fff", borderRadius: 20, padding: "20px", border: "1px solid #ede9fe" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#f5f3ff,#ede9fe)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
                      {item.emoji}
                    </div>
                    {item.badge && (
                      <span style={{ background: "#fef3c7", color: "#92400e", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 50 }}>{item.badge}</span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 14, color: "#0f1035", margin: "0 0 4px", lineHeight: 1.3 }}>{item.name}</h3>
                  {item.restaurant && <p style={{ margin: "0 0 4px", fontSize: 12, color: "#6b7280" }}>{item.restaurant}</p>}
                  {item.city && <p style={{ margin: "0 0 4px", fontSize: 12, color: "#6b7280" }}><MapPinIcon size={11} style={{ verticalAlign: "middle" }} /> {item.city}</p>}
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
                    <StarIcon size={12} style={{ color: "#f59e0b" }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{item.rating}</span>
                    <span style={{ fontSize: 11, color: "#6d727a" }}>({item.reviews?.toLocaleString()})</span>
                    {item.deliveryTime && <><ClockIcon size={11} style={{ color: "#6b7280", marginLeft: 4 }} /><span style={{ fontSize: 11, color: "#6b7280" }}>{item.deliveryTime}</span></>}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 18, color: "#7c3aed" }}>
                        {typeof item.price === "number" ? `$${item.price}` : item.price}
                      </span>
                      {item.originalPrice && <span style={{ fontSize: 11, color: "#6d727a", marginLeft: 4, textDecoration: "line-through" }}>${item.originalPrice}</span>}
                      {item.price && activeCategory === "travel" && <span style={{ fontSize: 11, color: "#6d727a" }}>/night</span>}
                    </div>
                    <button className="btn-primary" style={{ padding: "8px 14px", fontSize: 12, borderRadius: 12 }}>
                      {activeCategory === "shopping" ? "Add to Cart" : activeCategory === "food" ? "Order" : activeCategory === "travel" ? "Book" : "Get Tickets"}
                    </button>
                  </div>
                  <p style={{ margin: "8px 0 0", fontSize: 10, color: "#6d727a" }}>via {item.provider}</p>
                </div>
              ))}
            </div>
          )}

          {searchResults.length === 0 && (
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <p style={{ color: "#6d727a", fontSize: 14 }}>Try searching "headphones", "pizza near me", "hotel Chicago"…</p>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          EVERYTHING YOU NEED — category grid
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#ffffff", padding: "72px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: "clamp(26px,3.8vw,42px)", color: "#0f1035", margin: "0 0 10px" }}>
              Everything You Need. <span className="gradient-text">Just Ask Mio.</span>
            </h2>
            <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
              One AI assistant that handles every part of your daily life — from shopping to travel to payments.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 18 }}>
            {CATEGORIES.map(cat => (
              <Link key={cat.label} to={cat.path} style={{ textDecoration: "none" }}>
                <div className="card-hover" style={{ background: "#fff", borderRadius: 22, padding: "28px 20px", border: "1px solid #ede9fe", textAlign: "center", cursor: "pointer" }}>
                  <div style={{ width: 64, height: 64, borderRadius: 20, background: "#f5f3ff", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>
                    {cat.emoji}
                  </div>
                  <h3 style={{ fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 14, color: "#0f1035", margin: "0 0 4px" }}>{cat.label}</h3>
                  <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PHONE MOCKUP SCREENS — 5 phones like reference
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#f8f7ff", padding: "72px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: "clamp(24px,3.5vw,38px)", color: "#0f1035", margin: "0 0 10px" }}>
              Mobile App Screens — <span className="gradient-text">Onboarding & Key Flows</span>
            </h2>
            <p style={{ color: "#6b7280", fontSize: 15 }}>Available on iOS and Android. Beautifully designed for natural interaction.</p>
          </div>

          {/* 5-phone row */}
          <div style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "flex-end", flexWrap: "wrap", overflowX: "auto", paddingBottom: 16 }}>
            <div className="animate-float" style={{ animationDelay: "0s" }}>
              <PhoneFrame width={155}>
                <PhoneWelcome />
              </PhoneFrame>
            </div>
            <div className="animate-float" style={{ animationDelay: "0.4s" }}>
              <PhoneFrame width={155}>
                <PhoneCategories />
              </PhoneFrame>
            </div>
            {/* Centre phone — taller, hero */}
            <div className="animate-float" style={{ animationDelay: "0.8s" }}>
              <PhoneFrame width={170} tall>
                <PhoneShopping />
              </PhoneFrame>
            </div>
            <div className="animate-float" style={{ animationDelay: "1.2s" }}>
              <PhoneFrame width={155}>
                <PhoneTravel />
              </PhoneFrame>
            </div>
            <div className="animate-float" style={{ animationDelay: "1.6s" }}>
              <PhoneFrame width={155}>
                <PhonePayment />
              </PhoneFrame>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <Link to="/onboarding" className="btn-primary">Try the Full Onboarding Flow <ArrowRightIcon size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          RIGHT-SIDE SEARCH RESULT PANEL (as in reference)
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#ffffff", padding: "72px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div className="grid md:grid-cols-2 gap-16" style={{ alignItems: "center" }}>
            {/* Left — chat */}
            <div>
              <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: "clamp(24px,3.5vw,38px)", color: "#0f1035", margin: "0 0 12px" }}>
                Understand exactly <span className="gradient-text">what you mean</span>
              </h2>
              <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.7, margin: "0 0 28px" }}>
                Ask in natural language. Mio searches multiple providers, compares prices, and confirms with you before any action — all with real-time commissions that keep the platform running.
              </p>
              <ChatDemo />
            </div>
            {/* Right — result steps (as reference) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <div className="glass" style={{ borderRadius: 24, padding: "24px", border: "1.5px solid #ede9fe" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, background: "#f5f3ff", borderRadius: 12, padding: "10px 14px" }}>
                  <div style={{ width: 24, height: 24, borderRadius: 8, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 10, color: "#fff", fontWeight: 800 }}>M</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#0f1035" }}>Find me running shoes under $150</span>
                </div>
                {[
                  { icon: <SearchIcon size={15} />, text: "Found 5 great options", sub: "across Amazon, Walmart & Target" },
                  { icon: "≡", text: "Compare features", sub: "Size, colour, rating, delivery" },
                  { icon: <ShoppingCartIcon size={15} />, text: "Add to cart", sub: "Nike Air Max 270 — $119.99" },
                  { icon: <LockIcon size={15} />, text: "Secure checkout", sub: "Encrypted · Stripe · Apple Pay" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", background: i === 2 ? "#f5f3ff" : "#fafafa", borderRadius: 14, border: `1px solid ${i === 2 ? "#ddd6fe" : "#f3f4f6"}`, marginBottom: 8 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 12, background: i === 2 ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", color: i === 2 ? "#fff" : "#7c3aed", fontSize: 16, border: "1px solid #ede9fe", flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0f1035" }}>{item.text}</p>
                      <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>{item.sub}</p>
                    </div>
                    <div style={{ marginLeft: "auto", width: 20, height: 20, borderRadius: "50%", background: "#10b981", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <CheckIcon size={11} style={{ color: "#fff" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BUSINESS DASHBOARD
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#f8f7ff", padding: "72px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div className="grid md:grid-cols-2 gap-16" style={{ alignItems: "center" }}>
            <div>
              <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: "clamp(24px,3.5vw,38px)", color: "#0f1035", margin: "0 0 12px" }}>
                Business Dashboard <span className="gradient-text">(Web)</span>
              </h2>
              <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.7, margin: "0 0 24px" }}>
                Run your restaurant, shop, or service business with real-time analytics. Track orders, revenue, and customers — all in one place.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {["Real-time order tracking & dispatch", "Revenue analytics & commission reports", "Menu & inventory management", "Team roles & permissions", "NFC payment integrations"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckIcon size={15} style={{ color: "#7c3aed", flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: "#374151" }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/merchant" className="btn-primary">View Dashboard <ArrowRightIcon size={16} /></Link>
            </div>

            {/* Dashboard preview card */}
            <div className="glass" style={{ borderRadius: 24, padding: 24, border: "1.5px solid #ede9fe" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <p style={{ margin: 0, fontFamily: "Syne,sans-serif", fontWeight: 700, fontSize: 15, color: "#0f1035" }}>Good morning, Alex!</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>Here's what's happening at Bella Vista Restaurant today</p>
                </div>
                <span style={{ fontSize: 11, color: "#6b6f78", background: "#f3f4f6", padding: "4px 8px", borderRadius: 8 }}>Last 7 days</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                {[
                  { label: "Total Orders", value: "1,248", change: "+12%", icon: <ShoppingCartIcon size={14} /> },
                  { label: "Revenue", value: "$18,932", change: "+10%", icon: <DollarSignIcon size={14} /> },
                  { label: "Customers", value: "892", change: "+14%", icon: <UsersIcon size={14} /> },
                  { label: "Avg Order", value: "$15.16", change: "+6.6%", icon: <TrendingUpIcon size={14} /> },
                ].map(s => (
                  <div key={s.label} style={{ background: "#f8f7ff", borderRadius: 14, padding: "12px 14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <p style={{ margin: 0, fontSize: 11, color: "#6d727a" }}>{s.label}</p>
                      <div style={{ color: "#7c3aed" }}>{s.icon}</div>
                    </div>
                    <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0f1035", fontFamily: "Syne,sans-serif" }}>{s.value}</p>
                    <p style={{ margin: 0, fontSize: 11, color: "#0b815a", fontWeight: 600 }}>{s.change}</p>
                  </div>
                ))}
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#0f1035", margin: "0 0 8px" }}>Top Items</p>
                {[["Margherita Pizza","342"],["Chicken Alfredo","281"],["Caesar Salad","214"],["Grilled Salmon","188"],["Tiramisu","162"]].map(([name, n]) => (
                  <div key={name} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#374151", padding: "5px 0", borderBottom: "1px solid #f3f4f6" }}>
                    <span>{name}</span>
                    <span style={{ color: "#7c3aed", fontWeight: 700 }}>{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          NFC / IN-STORE with real photo
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#ffffff", padding: "72px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div className="grid md:grid-cols-2 gap-16" style={{ alignItems: "center" }}>
            {/* NFC steps */}
            <div className="glass" style={{ borderRadius: 24, padding: 32, border: "1.5px solid #ede9fe" }}>
              <h3 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 20, color: "#0f1035", margin: "0 0 20px" }}>Mio + NFC / In-Store Experience</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { icon: "📡", step: "Tap NFC Tag", desc: "Open menu instantly", highlight: false },
                  { icon: "🤖", step: "Order with Mio", desc: "Customise your order easily", highlight: false },
                  { icon: "💳", step: "Pay Securely", desc: "Using saved card or Apple Pay", highlight: false },
                  { icon: "✅", step: "Get Confirmation", desc: "Track your order in real-time", highlight: true },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", background: s.highlight ? "linear-gradient(135deg,#f5f3ff,#ede9fe)" : "#ffffff", borderRadius: 14, border: `1px solid ${s.highlight ? "#ddd6fe" : "#f3f4f6"}` }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: s.highlight ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#f5f3ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                      {s.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#0f1035" }}>{s.step}</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#6b7280" }}>{s.desc}</p>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#7c3aed", background: "#f5f3ff", padding: "4px 10px", borderRadius: 50 }}>Step {i+1}</span>
                  </div>
                ))}
              </div>
              {/* Real NFC product photo */}
              <img src="/static/stock_mio-nfc-store-b8eea7-0.jpg" alt="NFC tap to pay in-store experience" style={{ width: "100%", borderRadius: 16, marginTop: 16, objectFit: "cover", height: 140 }} />
            </div>

            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f5f3ff", border: "1px solid #ede9fe", borderRadius: 50, padding: "5px 14px", marginBottom: 16 }}>
                <WifiIcon size={12} style={{ color: "#7c3aed" }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#7c3aed" }}>NFC & IN-STORE</span>
              </div>
              <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: "clamp(24px,3.5vw,38px)", color: "#0f1035", margin: "0 0 14px" }}>
                Tap. Order. <span className="gradient-text">Pay instantly.</span>
              </h2>
              <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.7, margin: "0 0 24px" }}>
                Place a Mio NFC device in your restaurant, shop, or venue. Customers tap, Mio opens their personalised menu, they order and pay — all in under 60 seconds. No app download required.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {["Works on all modern smartphones", "No app download required", "Supports 20+ payment methods", "Real-time order notification to kitchen", "Custom branded NFC tags available"].map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckIcon size={15} style={{ color: "#7c3aed", flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: "#374151" }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/easytap" className="btn-primary">Explore EasyTap Go <ArrowRightIcon size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MONETISATION — PRICING PREVIEW
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "#f8f7ff", padding: "72px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: "clamp(24px,3.5vw,38px)", color: "#0f1035", margin: "0 0 10px" }}>
              Simple pricing. <span className="gradient-text">Revenue that scales.</span>
            </h2>
            <p style={{ color: "#6b7280", fontSize: 15, maxWidth: 540, margin: "0 auto" }}>
              User subscriptions + business subscriptions + referral commissions from every transaction. Three streams, one platform.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20, maxWidth: 1050, margin: "0 auto" }}>
            {SUBSCRIPTION_PLANS.map(plan => (
              <div key={plan.id} className="card-hover" style={{
                background: plan.popular ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#fff",
                borderRadius: 24, padding: "28px 24px",
                border: plan.popular ? "none" : "1.5px solid #ede9fe",
                position: "relative",
              }}>
                {plan.popular && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#f59e0b", color: "#1a0e00", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 50, whiteSpace: "nowrap" }}>
                    ⭐ Most Popular
                  </div>
                )}
                <h3 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 18, color: plan.popular ? "#fff" : "#0f1035", margin: "0 0 6px" }}>{plan.name}</h3>
                <p style={{ fontSize: 13, color: plan.popular ? "#c4b5fd" : "#6b7280", margin: "0 0 16px" }}>{plan.description}</p>
                {plan.price !== null ? (
                  <div style={{ marginBottom: 20 }}>
                    <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 32, color: plan.popular ? "#fff" : "#0f1035" }}>${plan.price}</span>
                    <span style={{ fontSize: 13, color: plan.popular ? "#c4b5fd" : "#6b7280" }}>/month</span>
                  </div>
                ) : (
                  <div style={{ marginBottom: 20, fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 24, color: plan.popular ? "#fff" : "#0f1035" }}>Custom</div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  {plan.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      <CheckIcon size={14} style={{ color: plan.popular ? "#a78bfa" : "#7c3aed", flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontSize: 13, color: plan.popular ? "#e9d5ff" : "#374151" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link to="/pricing" style={{
                  display: "block", textAlign: "center", padding: "12px", borderRadius: 14, fontSize: 13, fontWeight: 700, textDecoration: "none",
                  background: plan.popular ? "#fff" : "linear-gradient(135deg,#7c3aed,#4f46e5)",
                  color: plan.popular ? "#7c3aed" : "#fff",
                }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Commission model callout */}
          <div style={{ marginTop: 40, background: "linear-gradient(135deg,#0f1035,#1a1b4b)", borderRadius: 24, padding: "32px 40px", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between", maxWidth: 900, margin: "40px auto 0" }}>
            <div>
              <h3 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", margin: "0 0 8px" }}>+ Referral Commission Revenue</h3>
              <p style={{ color: "#a5b4fc", fontSize: 14, margin: 0, maxWidth: 480 }}>
                Every transaction through Mio earns 3–15% referral commission from our partner providers — Amazon, DoorDash, Booking.com, Ticketmaster and 200+ others.
              </p>
            </div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[["Shopping","4%"],["Food","3–5%"],["Travel","4–6%"],["Events","5–10%"],["Services","10–15%"]].map(([cat, rate]) => (
                <div key={cat} style={{ textAlign: "center" }}>
                  <p style={{ margin: 0, fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 18, color: "#a78bfa" }}>{rate}</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#6b7280" }}>{cat}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WAITLIST / CTA
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg,#0f1035 0%,#1a1b4b 100%)", padding: "80px 0" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: "clamp(26px,4vw,46px)", color: "#ffffff", margin: "0 0 16px" }}>
            Ready to experience the future of AI commerce?
          </h2>
          <p style={{ color: "#a5b4fc", fontSize: 16, margin: "0 0 36px", lineHeight: 1.7 }}>
            Join over 1 million people who shop, dine, travel and pay with Mio every day. Every enquiry is saved and waiting for you.
          </p>
          <WaitlistForm />
          <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 44, flexWrap: "wrap" }}>
            {[
              { icon: <ShieldIcon size={15} />, label: "Enterprise security" },
              { icon: <SmartphoneIcon size={15} />, label: "iOS & Android" },
              { icon: <ZapIcon size={15} />, label: "Works everywhere" },
            ].map(f => (
              <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 8, color: "#c4b5fd" }}>
                {f.icon}
                <span style={{ fontSize: 13, fontWeight: 500 }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════ */}
      <footer style={{ background: "#0f1035", padding: "48px 0 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8" style={{ marginBottom: 40 }}>
            <div>
              <span style={{ fontFamily: "Syne,sans-serif", fontWeight: 800, fontSize: 22, background: "linear-gradient(135deg,#7c3aed,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Mio</span>
              <p style={{ fontSize: 13, lineHeight: 1.6, marginTop: 8, color: "#a3aab5" }}>Your AI assistant for everyday life — shop, dine, travel, and pay through natural conversation.</p>
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                {["🐦", "📘", "📸", "💼"].map((icon, i) => (
                  <div key={i} style={{ width: 34, height: 34, borderRadius: 10, background: "#1a1b4b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, cursor: "pointer" }}>{icon}</div>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: [["Features", "/features"], ["Pricing", "/pricing"], ["Onboarding", "/onboarding"], ["Widget Demo", "/widget"]] },
              { title: "Business", links: [["Merchant Dashboard", "/merchant"], ["Admin Console", "/admin"], ["Developer Portal", "/developers"], ["Providers", "/providers"]] },
              { title: "Legal", links: [["Privacy Policy", "#"], ["Terms of Service", "#"], ["Cookie Policy", "#"], ["Contact", "#"]] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontWeight: 700, color: "#e5e7eb", fontSize: 13, margin: "0 0 14px" }}>{col.title}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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
