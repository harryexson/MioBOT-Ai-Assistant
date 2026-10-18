import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import MicIcon from "icon:mic";
import PlayIcon from "icon:play-circle";
import ArrowRightIcon from "icon:arrow-right";
import CheckIcon from "icon:check-circle";
import MioVoiceBot from "../components/MioVoiceBot.jsx";
import { pb } from "../lib/pb.js";
import {
  IconShopping, IconFood, IconTravel, IconServices, IconPayments,
  IconEvents, IconNFC, IconMore, IconInvoicing, IconMic, IconSearch,
  IconHome, IconOrders, IconUser, IconApple, IconStar, IconCheck as ICheck, IconArrow,
} from "../components/MioIcons.jsx";

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
  { value: "Join Now", label: "Early Access Open" },
  { value: "Free", label: "To Get Started" },
  { value: "10+", label: "Service Categories" },
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

/* ─── Ultra-realistic iPhone 15 Pro — Natural Titanium finish ──────── */
function PhoneFrame({ children, width = 195, height = 400 }) {
  const BEZEL = 7;
  const OUTER_R = 54;
  const INNER_R = 48;

  // Titanium Natural — warm brushed-gold aluminum, flat sides, precise edge highlights
  // matching the Brex reference photo exactly
  return (
    <div style={{
      width,
      height,
      borderRadius: OUTER_R,
      // Outer frame: warm titanium gold gradient — matches Brex reference color exactly
      background: [
        "linear-gradient(165deg,",
        "#d4c5a0 0%,",   // top-left warm highlight
        "#b8a882 8%,",   // light gold
        "#9a8c6e 20%,",  // mid titanium
        "#8a7c60 35%,",  // brushed center
        "#9e9070 55%,",  // slight warm mid
        "#b5a47e 75%,",  // right side lightens
        "#c8b890 90%,",  // bottom-right catch
        "#e0d0a8 100%",  // corner highlight
        ")"
      ].join(""),
      padding: BEZEL,
      position: "relative",
      flexShrink: 0,
      boxShadow: [
        "0 40px 80px rgba(0,0,0,0.38)",
        "0 12px 32px rgba(0,0,0,0.22)",
        "0 2px 8px rgba(0,0,0,0.15)",
        // Inner bevel — dark line between frame and screen
        `inset 0 0 0 1px rgba(0,0,0,0.25)`,
        // Outer edge highlight
        "0 0 0 1px rgba(255,255,255,0.18)",
      ].join(", "),
    }}>
      {/* Frame face sheen — brushed metal highlights */}
      <div style={{ position:"absolute", inset:0, borderRadius:OUTER_R, pointerEvents:"none",
        background:[
          "linear-gradient(160deg,",
          "rgba(255,255,255,0.22) 0%,",
          "rgba(255,255,255,0.06) 20%,",
          "transparent 45%,",
          "rgba(0,0,0,0.04) 70%,",
          "rgba(255,255,255,0.10) 100%",
          ")"
        ].join(""),
        zIndex:10,
      }} />

      {/* Silent/mute switch */}
      <div style={{ position:"absolute", left:-3, top:"14%", width:3, height:14,
        background:"linear-gradient(to right,#7a6e52,#b8a882,#7a6e52)",
        borderRadius:"2px 0 0 2px",
        boxShadow:"-1px 0 2px rgba(0,0,0,0.3)",
      }} />
      {/* Volume up */}
      <div style={{ position:"absolute", left:-3, top:"21%", width:3, height:26,
        background:"linear-gradient(to right,#7a6e52,#b8a882,#7a6e52)",
        borderRadius:"2px 0 0 2px",
        boxShadow:"-1px 0 2px rgba(0,0,0,0.3)",
      }} />
      {/* Volume down */}
      <div style={{ position:"absolute", left:-3, top:"31%", width:3, height:26,
        background:"linear-gradient(to right,#7a6e52,#b8a882,#7a6e52)",
        borderRadius:"2px 0 0 2px",
        boxShadow:"-1px 0 2px rgba(0,0,0,0.3)",
      }} />
      {/* Power/sleep button */}
      <div style={{ position:"absolute", right:-3, top:"25%", width:3, height:52,
        background:"linear-gradient(to left,#7a6e52,#b8a882,#7a6e52)",
        borderRadius:"0 2px 2px 0",
        boxShadow:"1px 0 2px rgba(0,0,0,0.3)",
      }} />

      {/* Screen glass */}
      <div style={{
        background:"#fff",
        borderRadius: INNER_R,
        overflow:"hidden",
        height:"100%",
        position:"relative",
        // Subtle glass glare
        boxShadow:"inset 0 1px 3px rgba(255,255,255,0.6), inset 0 0 0 0.5px rgba(0,0,0,0.12)",
      }}>
        {/* Glass glare overlay */}
        <div style={{ position:"absolute", inset:0, borderRadius:INNER_R, pointerEvents:"none", zIndex:30,
          background:"linear-gradient(145deg,rgba(255,255,255,0.12) 0%,rgba(255,255,255,0.04) 30%,transparent 60%)",
        }} />

        {/* Dynamic Island — precise black pill */}
        <div style={{
          position:"absolute", top:10, left:"50%", transform:"translateX(-50%)",
          width: Math.round(width * 0.42),
          height: Math.round(height * 0.05),
          background:"#000",
          borderRadius:999,
          zIndex:22,
          boxShadow:"0 1px 4px rgba(0,0,0,0.4)",
        }} />

        {/* Status bar */}
        <div style={{
          position:"absolute", top:0, left:0, right:0,
          height: Math.round(height * 0.108),
          display:"flex", alignItems:"flex-end", justifyContent:"space-between",
          padding:`0 ${Math.round(width*0.09)}px 5px`,
          zIndex:21,
        }}>
          <span style={{ fontSize: Math.round(width*0.055), fontWeight:700, color:"#0f1035",
            letterSpacing:"-0.02em", fontFamily:"Manrope,sans-serif" }}>9:41</span>
          <div style={{ display:"flex", gap:2.5, alignItems:"center" }}>
            <svg width={Math.round(width*0.088)} height={Math.round(width*0.062)} viewBox="0 0 14 9" fill="none">
              <rect x="0" y="5" width="2.5" height="4" rx="0.6" fill="#0f1035"/>
              <rect x="3.5" y="3" width="2.5" height="6" rx="0.6" fill="#0f1035"/>
              <rect x="7" y="1" width="2.5" height="8" rx="0.6" fill="#0f1035"/>
              <rect x="10.5" y="0" width="2.5" height="9" rx="0.6" fill="#0f1035"/>
            </svg>
            <svg width={Math.round(width*0.072)} height={Math.round(width*0.062)} viewBox="0 0 12 9" fill="none">
              <path d="M6 8a1 1 0 100-2 1 1 0 000 2z" fill="#0f1035"/>
              <path d="M3 5.5A4.2 4.2 0 016 4.3a4.2 4.2 0 013 1.2" stroke="#0f1035" strokeWidth="1" strokeLinecap="round" fill="none"/>
              <path d="M1 3A6.8 6.8 0 016 1a6.8 6.8 0 015 2" stroke="#0f1035" strokeWidth="1" strokeLinecap="round" fill="none"/>
            </svg>
            <svg width={Math.round(width*0.095)} height={Math.round(width*0.062)} viewBox="0 0 22 9" fill="none">
              <rect x="0.5" y="0.5" width="18" height="8" rx="2" stroke="#0f1035" strokeWidth="0.8"/>
              <rect x="1.5" y="1.5" width="14" height="6" rx="1.2" fill="#0f1035"/>
              <path d="M19.5 3v3" stroke="#0f1035" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <div style={{ paddingTop: Math.round(height * 0.108), height:"100%", overflow:"hidden" }}>
          {children}
        </div>
      </div>

      {/* Bottom speaker grille */}
      <div style={{
        position:"absolute", bottom: BEZEL + 6, left:"50%", transform:"translateX(-50%)",
        display:"flex", gap:3, zIndex:15,
      }}>
        {[...Array(7)].map((_,i) => (
          <div key={i} style={{ width:2.5, height:2.5, borderRadius:"50%",
            background:"rgba(0,0,0,0.35)", boxShadow:"inset 0 0.5px 1px rgba(0,0,0,0.5)" }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Phone screen: Welcome ──────────────────────────────────────── */
function ScreenWelcome() {
  // Matches reference exactly: hero woman photo fills top 55%, Mio logo below, CTAs at bottom
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"#fff", overflow:"hidden" }}>
      {/* Woman photo — fills top half like reference */}
      <div style={{ height:"52%", position:"relative", overflow:"hidden", borderRadius:"0 0 24px 24px", flexShrink:0 }}>
        <img
          src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80&fit=crop&crop=top"
          alt="Woman using Mio"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center" }}
        />
        {/* Purple gradient overlay at bottom of photo */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"40%", background:"linear-gradient(to top,rgba(124,58,237,0.15),transparent)" }} />
        {/* Mio logo overlay top-left */}
        <div style={{ position:"absolute", top:10, left:12, display:"flex", alignItems:"center", gap:5 }}>
          <div style={{ width:22, height:22, borderRadius:7, background:"linear-gradient(135deg,#7c3aed,#4f46e5)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#fff", fontFamily:"Manrope,sans-serif", fontWeight:800, fontSize:11 }}>M</span>
          </div>
          <span style={{ fontFamily:"Manrope,sans-serif", fontWeight:800, fontSize:13, color:"#fff", textShadow:"0 1px 4px rgba(0,0,0,0.3)" }}>Mio</span>
        </div>
      </div>
      {/* Text + CTAs */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", padding:"12px 14px 14px", gap:6 }}>
        <p style={{ margin:0, fontFamily:"Manrope,sans-serif", fontWeight:800, fontSize:15, color:"#0f1035", lineHeight:1.2 }}>Your AI Assistant<br/>for Everyday Life</p>
        <p style={{ margin:0, fontSize:9, color:"#6b7280", lineHeight:1.4 }}>Shop, dine, travel & pay — all through simple conversation.</p>
        <div style={{ marginTop:"auto", display:"flex", flexDirection:"column", gap:6 }}>
          <div style={{ background:"linear-gradient(135deg,#7c3aed,#4f46e5)", color:"#fff", borderRadius:12, padding:"9px 0", textAlign:"center", fontSize:11, fontWeight:700, fontFamily:"Manrope,sans-serif", boxShadow:"0 4px 12px rgba(124,58,237,0.35)" }}>Get Started</div>
          <div style={{ border:"1.5px solid #e5e7eb", borderRadius:12, padding:"8px 0", textAlign:"center", fontSize:11, fontWeight:600, color:"#374151", fontFamily:"Manrope,sans-serif" }}>Sign In</div>
          <p style={{ textAlign:"center", fontSize:9, color:"#9ca3af", margin:0 }}>Skip for now</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Phone screen: Categories ───────────────────────────────────── */
function ScreenCategories() {
  const cats = [
    { e:"🛍️", bg:"#fef3c7", c:"#d97706", l:"Shopping" },
    { e:"🍔", bg:"#fee2e2", c:"#dc2626", l:"Food & Restaurants" },
    { e:"✈️", bg:"#dbeafe", c:"#2563eb", l:"Travel & Hotels" },
    { e:"📅", bg:"#d1fae5", c:"#059669", l:"Services & Bookings" },
    { e:"💳", bg:"#ede9fe", c:"#7c3aed", l:"Pay Bills & Invoices" },
    { e:"🎟️", bg:"#fce7f3", c:"#db2777", l:"Events & Tickets" },
    { e:"✨", bg:"#f3f4f6", c:"#374151", l:"Other" },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:"8px 10px 10px", background:"#fff", gap:4 }}>
      <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:1 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:2, width:14, flexShrink:0 }}>
          {[0,1,2].map(i=><div key={i} style={{ height:1.5, background:"#0f1035", borderRadius:1 }}/>)}
        </div>
        <p style={{ margin:0, fontSize:9.5, fontWeight:800, fontFamily:"Manrope,sans-serif", color:"#0f1035", lineHeight:1.2 }}>What would you like<br/>to use Mio for?</p>
      </div>
      <p style={{ margin:"0 0 2px", fontSize:7.5, color:"#6b7280" }}>Choose one or more. You can always add more later.</p>
      {cats.map(({e,bg,c,l}) => (
        <div key={l} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 7px", background:"#f9f7ff", borderRadius:8, border:"1px solid #f0eeff" }}>
          <div style={{ width:22, height:22, borderRadius:6, background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, flexShrink:0 }}>{e}</div>
          <span style={{ fontSize:9.5, fontWeight:600, color:"#0f1035", fontFamily:"Manrope,sans-serif", flex:1 }}>{l}</span>
          <div style={{ width:12, height:12, borderRadius:"50%", border:"1.5px solid #d1d5db", flexShrink:0 }}/>
        </div>
      ))}
      <div style={{ marginTop:"auto", background:"linear-gradient(135deg,#7c3aed,#4f46e5)", color:"#fff", borderRadius:10, padding:"8px 0", textAlign:"center", fontSize:10.5, fontWeight:700, fontFamily:"Manrope,sans-serif", boxShadow:"0 4px 12px rgba(124,58,237,0.3)" }}>Continue</div>
    </div>
  );
}

/* ─── Phone screen: AI Shopping ─────────────────────────────────── */
function ScreenShopping() {
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:"8px 10px", background:"#fff", gap:6 }}>
      <p style={{ margin:0, fontSize:10.5, fontWeight:800, fontFamily:"Manrope,sans-serif", color:"#0f1035" }}>AI Shopping<br/>Assistant</p>
      {/* Top-rated card */}
      <div style={{ background:"linear-gradient(135deg,#f5f3ff,#ede9fe)", borderRadius:10, padding:"8px 10px", position:"relative", border:"1px solid #ddd6fe" }}>
        <div style={{ display:"flex", gap:4, marginBottom:4 }}>
          <span style={{ background:"#7c3aed", color:"#fff", borderRadius:4, padding:"2px 5px", fontSize:7, fontWeight:700 }}>Top rated</span>
          <span style={{ background:"#10b981", color:"#fff", borderRadius:4, padding:"2px 5px", fontSize:7, fontWeight:700 }}>Best quality</span>
          <span style={{ background:"#f59e0b", color:"#fff", borderRadius:4, padding:"2px 5px", fontSize:7, fontWeight:700 }}>Top budget</span>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div style={{ width:52, height:52, borderRadius:10, background:"linear-gradient(135deg,#ede9fe,#c4b5fd)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:28 }}>🎧</div>
          <div>
            <p style={{ margin:0, fontSize:9, fontWeight:800, color:"#0f1035", fontFamily:"Manrope,sans-serif" }}>Sony WH-1000XMS</p>
            <p style={{ margin:0, fontSize:7.5, color:"#6b7280" }}>Best noise-cancelling headphones</p>
            <p style={{ margin:"3px 0 0", fontSize:18, fontWeight:800, color:"#7c3aed", fontFamily:"Manrope,sans-serif", lineHeight:1 }}>$399</p>
          </div>
        </div>
        <div style={{ marginTop:6, background:"linear-gradient(135deg,#7c3aed,#4f46e5)", color:"#fff", borderRadius:8, padding:"6px 0", textAlign:"center", fontSize:9.5, fontWeight:700, fontFamily:"Manrope,sans-serif" }}>Add to cart</div>
      </div>
      {/* Voice bar */}
      <div style={{ display:"flex", alignItems:"center", gap:6, background:"#f5f3ff", borderRadius:10, padding:"7px 10px", border:"1px solid #ede9fe" }}>
        <span style={{ fontSize:9, color:"#9ca3af", flex:1 }}>Ask anything...</span>
        <div style={{ width:22, height:22, borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#4f46e5)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <IconMic size={10} color="#fff" />
        </div>
      </div>
    </div>
  );
}

/* ─── Phone screen: Hotel Travel ─────────────────────────────────── */
function ScreenTravel() {
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:"8px 10px", background:"#fff", gap:5 }}>
      <p style={{ margin:0, fontSize:9, fontWeight:600, color:"#6b7280" }}>Find a hotel in Chicago next weekend</p>
      <div style={{ background:"#f5f3ff", borderRadius:8, padding:"5px 8px", fontSize:8.5, color:"#7c3aed", fontWeight:600, lineHeight:1.3, border:"1px solid #ede9fe" }}>Here are some top-rated options for Oct 24 - Oct 26 (2 nights):</div>
      {[
        { name:"The Langham Chicago", stars:"4.8", reviews:"341", price:"$229", tag:"View Details" },
        { name:"Renaissance Chicago", stars:"4.6", reviews:"892", price:"$189", tag:"View Details" },
        { name:"Hyatt Place Chicago", stars:"4.5", reviews:"3,201", price:"$149", tag:"View Details" },
      ].map((h,i) => (
        <div key={i} style={{ background:"#f9f7ff", borderRadius:8, padding:"6px 8px", border:"1px solid #f0eeff" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:3 }}>
            <p style={{ margin:0, fontSize:9, fontWeight:700, color:"#0f1035", fontFamily:"Manrope,sans-serif" }}>{h.name}</p>
            <p style={{ margin:0, fontSize:11, fontWeight:800, color:"#7c3aed", fontFamily:"Manrope,sans-serif", flexShrink:0 }}>{h.price}</p>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <p style={{ margin:0, fontSize:7.5, color:"#92400e" }}>★ {h.stars} · {h.reviews} reviews</p>
            <div style={{ background:"linear-gradient(135deg,#7c3aed,#4f46e5)", color:"#fff", borderRadius:6, padding:"3px 7px", fontSize:7.5, fontWeight:700 }}>View Details</div>
          </div>
        </div>
      ))}
      <div style={{ display:"flex", alignItems:"center", gap:6, background:"#f5f3ff", borderRadius:10, padding:"6px 10px", border:"1px solid #ede9fe" }}>
        <span style={{ fontSize:9, color:"#9ca3af", flex:1 }}>Ask a follow up...</span>
        <div style={{ width:20, height:20, borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#4f46e5)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <IconMic size={9} color="#fff" />
        </div>
      </div>
    </div>
  );
}

/* ─── Phone screen: Payment ──────────────────────────────────────── */
function ScreenPayment() {
  const methods = [
    { icon:"card", label:"Credit or Debit Card", sub:"Secured with Stripe" },
    { icon:"apple", label:"Apple Pay", sub:null },
    { icon:"G", label:"Google Pay", sub:null, goog:true },
    { icon:"🔗", label:"Link (Stripe)", sub:null },
    { icon:"P", label:"PayPal", sub:null, pp:true },
    { icon:"+", label:"Add Later", sub:null, plus:true },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:"8px 10px 10px", background:"#fff", gap:0 }}>
      <p style={{ margin:"0 0 8px", fontSize:11, fontWeight:800, fontFamily:"Manrope,sans-serif", color:"#0f1035" }}>Add a payment method</p>
      {methods.map((m,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:7, padding:"7px 0", borderBottom: i < methods.length-1 ? "1px solid #f3f4f6":"none" }}>
          <div style={{ width:28, height:28, borderRadius:8, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center",
            background: m.goog?"#fff":m.pp?"#003087":m.plus?"#f3f4f6":"#f3f4f6",
            border: m.goog?"1.5px solid #e5e7eb":"none",
            fontSize: 10, fontWeight:800,
            color: m.goog?"#4285f4":m.pp?"#fff":m.plus?"#7c3aed":"#374151" }}>
            {m.icon}
          </div>
          <div style={{ flex:1 }}>
            <p style={{ margin:0, fontSize:10, fontWeight:600, color:"#0f1035", fontFamily:"Manrope,sans-serif" }}>{m.label}</p>
            {m.sub && <p style={{ margin:0, fontSize:7.5, color:"#6b7280" }}>{m.sub}</p>}
          </div>
          <div style={{ width:14, height:14, borderRadius:"50%", border:"1.5px solid #e5e7eb", flexShrink:0 }}/>
        </div>
      ))}
      <div style={{ marginTop:8, background:"linear-gradient(135deg,#7c3aed,#4f46e5)", color:"#fff", borderRadius:10, padding:"9px 0", textAlign:"center", fontSize:10.5, fontWeight:700, fontFamily:"Manrope,sans-serif", boxShadow:"0 4px 12px rgba(124,58,237,0.3)" }}>Continue</div>
      <p style={{ textAlign:"center", fontSize:7.5, color:"#9ca3af", margin:"5px 0 0", lineHeight:1.3 }}>Your payment information is safe and securely encrypted.</p>
    </div>
  );
}

/* ─── Floating product card (animated) ──────────────────────────── */
function FloatingCard({ children, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      position: "absolute",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.9)",
      transition: "all 0.55s cubic-bezier(0.34,1.56,0.64,1)",
      background: "#fff",
      borderRadius: 16,
      padding: "10px 14px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 1px 0 rgba(124,58,237,0.05)",
      display: "flex",
      alignItems: "center",
      gap: 10,
      maxWidth: 200,
      border: "1px solid rgba(124,58,237,0.08)",
      animation: visible ? "floatBob 4s ease-in-out infinite" : "none",
      animationDelay: `${delay * 0.001 + 0.6}s`,
      ...style,
    }}>
      {children}
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
          <span style={{ color: "#fff", fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 9 }}>M</span>
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
                  <span style={{ color: "#fff", fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 9 }}>M</span>
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
  const [memberCount, setMemberCount] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    pb.collection("users").getList(1, 1, { signal: controller.signal })
      .then(r => setMemberCount(r.totalItems))
      .catch(() => {});
    return () => controller.abort();
  }, []);

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

              {/* Headline — matching reference: "Life is easier with Mio." */}
              <h1 style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: "clamp(42px,5.5vw,76px)", lineHeight: 1.02, color: "#0f1035", margin: "0 0 6px", letterSpacing: "-0.04em" }}>
                Life is easier
              </h1>
              <h1 style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: "clamp(42px,5.5vw,76px)", lineHeight: 1.02, margin: "0 0 24px", letterSpacing: "-0.04em", display:"flex", alignItems:"baseline", gap:"0.22em", flexWrap:"wrap" }}>
                with{" "}
                <span style={{ background: "linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Mio.
                </span>
              </h1>

              <p style={{ fontFamily: "Space Grotesk,sans-serif", fontSize: "clamp(15px,1.2vw,18px)", color: "#4b5563", lineHeight: 1.65, margin: "0 0 30px", maxWidth: 440, fontWeight: 400 }}>
                Just ask. Mio finds, books, orders, pays and gets it done — for everyday life and for your business.
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
                  { icon: "apple", line1: "Download on the", line2: "App Store" },
                  { icon: "play", line1: "GET IT ON", line2: "Google Play" },
                ].map((b) => (
                  <div key={b.line2} style={{ display: "flex", alignItems: "center", gap: 8, background: "#0f1035", borderRadius: 10, padding: "7px 14px", cursor: "pointer" }}>
                    {b.icon==="apple" ? <IconApple size={20} color="#fff" /> : <svg width={18} height={18} viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
                    <div>
                      <p style={{ margin: 0, fontSize: 8, color: "#71767f", letterSpacing: 0.3 }}>{b.line1}</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#fff", fontWeight: 700 }}>{b.line2}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats row — live member count + service categories */}
              <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                <div>
                  <p style={{ margin: 0, fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 18, color: "#0f1035" }}>
                    {memberCount === null ? "—" : memberCount === 0 ? "Be First" : `${memberCount.toLocaleString()}+`}
                  </p>
                  <p style={{ margin: 0, fontSize: 11, color: "#6b7280", fontWeight: 500 }}>
                    {memberCount === 0 ? "Early Access Open" : "Members & Growing"}
                  </p>
                </div>
                <div>
                  <p style={{ margin: 0, fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 18, color: "#0f1035" }}>Free</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#6b7280", fontWeight: 500 }}>To Get Started</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 18, color: "#0f1035" }}>10+</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#6b7280", fontWeight: 500 }}>Service Categories</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 18, color: "#7c3aed" }}>All in One</p>
                  <p style={{ margin: 0, fontSize: 11, color: "#6b7280", fontWeight: 500 }}>Shop. Book. Pay.</p>
                </div>
              </div>
            </div>

            {/* RIGHT — hero image + floating bubbles */}
            <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 560 }}>
              {/* Purple glow circle */}
              <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(124,58,237,0.12) 0%,rgba(124,58,237,0) 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
              {/* Hero woman photo */}
              <div style={{ width: 340, height: 460, borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%", background: "linear-gradient(180deg,#ede9fe 0%,#c4b5fd 100%)", overflow: "hidden", flexShrink: 0, position: "relative" }}>
                <img
                  src="/static/stock_mio-hero-woman-140ab8-0.jpg"
                  alt="Person using the Mio AI assistant on their phone"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                />
              </div>

              {/* Floating category bubbles — with real product photos */}
              <FloatingCard delay={400} style={{ top: "6%", right: -20 }}>
                <img src="/static/stock_product-food-06237b-0.jpg" alt="Food & Dining" style={{ width: 36, height: 36, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                <div><p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#0f1035" }}>Food & Dining</p><p style={{ margin: 0, fontSize: 10, color: "#6b7280" }}>Order pickup or delivery</p></div>
              </FloatingCard>
              <FloatingCard delay={800} style={{ top: "36%", right: -40 }}>
                <img src="/static/stock_product-hotel-6d4d42-0.jpg" alt="Hotels & Travel" style={{ width: 36, height: 36, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                <div><p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#0f1035" }}>Hotels & Travel</p><p style={{ margin: 0, fontSize: 10, color: "#6b7280" }}>Book flights and hotels</p></div>
              </FloatingCard>
              <FloatingCard delay={1200} style={{ bottom: "28%", right: -30 }}>
                <img src="/static/stock_product-shoes-e23c7b-0.jpg" alt="Shopping" style={{ width: 36, height: 36, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                <div><p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#0f1035" }}>Shopping</p><p style={{ margin: 0, fontSize: 10, color: "#6b7280" }}>Find and buy anything</p></div>
              </FloatingCard>
              <FloatingCard delay={1600} style={{ bottom: "8%", right: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#f5f3ff,#ede9fe)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📅</div>
                <div><p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: "#0f1035" }}>Bookings & Services</p><p style={{ margin: 0, fontSize: 10, color: "#6b7280" }}>Appointments & more</p></div>
              </FloatingCard>

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

      {/* ══ CATEGORY STRIP — horizontal icon row matching reference ═ */}
      <section style={{ padding:"24px 24px", background:"#fff", borderTop:"1px solid #f3f4f6", borderBottom:"1px solid #f3f4f6" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:16 }}>
          {[
            
            { Icon:IconShopping, bg:'#fff7ed', color:'#d97706', label:'Shopping', desc:'Find and buy anything' },
            { Icon:IconFood, bg:'#fef9c3', color:'#b45309', label:'Food & Dining', desc:'Order pickup or delivery' },
            { Icon:IconTravel, bg:'#eff6ff', color:'#2563eb', label:'Travel & Hotels', desc:'Book flights, hotels and more' },
            { Icon:IconServices, bg:'#f0fdf4', color:'#059669', label:'Bookings & Services', desc:'Appointments, events, etc.' },
            { Icon:IconPayments, bg:'#faf5ff', color:'#7c3aed', label:'Payments', desc:'Pay bills, invoices and NFC' },
            { Icon:IconInvoicing, bg:'#fff1f2', color:'#e11d48', label:'Invoicing', desc:'Create & send invoices with AI' },
            { Icon:IconMore, bg:'#f0f9ff', color:'#0891b2', label:'And More', desc:'One assistant for everything' },
          ].map(cat => (
            <Link key={cat.label} to="/features" style={{ textDecoration:"none", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", gap:6, flex:"1 1 100px", minWidth:80 }}>
              <div style={{ width:44, height:44, borderRadius:14, background:cat.bg, display:"flex", alignItems:"center", justifyContent:"center" }}><cat.Icon size={20} color={cat.color} /></div>
              <p style={{ margin:0, fontFamily:"Manrope,sans-serif", fontWeight:700, fontSize:12, color:"#0f1035" }}>{cat.label}</p>
              <p style={{ margin:0, fontSize:10, color:"#6b7280", lineHeight:1.3 }}>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ══ VOICE BOT PANEL (toggled) ═══════════════════════════ */}
      {showVoice && (
        <section style={{ background: "#f8f7ff", padding: "40px 24px" }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 24, color: "#0f1035", textAlign: "center", margin: "0 0 24px" }}>
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

      {/* ══ CATEGORIES — matching reference exactly ══════════════ */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Section heading — centered like reference */}
          <h2 style={{ fontFamily:"Manrope,sans-serif", fontWeight:800, fontSize:"clamp(28px,3.5vw,46px)", color:"#0f1035", margin:"0 0 56px", lineHeight:1.08, letterSpacing:"-0.03em", textAlign:"center" }}>
            Everything You Need.{" "}
            <span style={{ background:"linear-gradient(135deg,#7c3aed,#4f46e5)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
              Just Ask Mio.
            </span>
          </h2>

          {/* 4-column icon grid — exactly matching reference */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:32, maxWidth:900, margin:"0 auto 72px" }}>
            {[
              { Icon:IconShopping, color:"#d97706", bg:"#fff7ed", label:"Shopping", desc:"Find and buy anything" },
              { Icon:IconFood, color:"#b45309", bg:"#fef9c3", label:"Food & Dining", desc:"Order pickup or delivery" },
              { Icon:IconTravel, color:"#2563eb", bg:"#eff6ff", label:"Travel & Hotels", desc:"Book flights and hotels" },
              { Icon:IconServices, color:"#059669", bg:"#f0fdf4", label:"Services", desc:"Appointments & bookings" },
              { Icon:IconPayments, color:"#7c3aed", bg:"#faf5ff", label:"Payments", desc:"Pay bills, invoices & more" },
              { Icon:IconEvents, color:"#db2777", bg:"#fdf4ff", label:"Events", desc:"Find and book tickets" },
              { Icon:IconNFC, color:"#0891b2", bg:"#f0fdf4", label:"NFC & In-Store", desc:"Tap, order and pay" },
              { Icon:IconMore, color:"#4f46e5", bg:"#eff6ff", label:"and More", desc:"Explore all possibilities" },
            ].map((cat) => (
              <Link
                key={cat.label}
                to="/features"
                style={{ textDecoration:"none", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", gap:12, padding:"24px 16px", borderRadius:20, transition:"all 0.2s", cursor:"pointer" }}
                onMouseEnter={e => { e.currentTarget.style.background="#f5f3ff"; e.currentTarget.style.boxShadow="0 4px 20px rgba(124,58,237,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.boxShadow="none"; }}
              >
                <div style={{ width:64, height:64, borderRadius:20, background:cat.bg, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 2px 12px rgba(0,0,0,0.06)` }}>
                  <cat.Icon size={28} color={cat.color} />
                </div>
                <div>
                  <p style={{ margin:0, fontFamily:"Manrope,sans-serif", fontWeight:700, fontSize:14, color:"#0f1035" }}>{cat.label}</p>
                  <p style={{ margin:"4px 0 0", fontSize:12, color:"#6b7280", lineHeight:1.4 }}>{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Phone + chat demo below the grid */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>

            {/* Right — phone + chat demo */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <PhoneFrame width={210} height={400}>
                  <div style={{ display: "flex", flexDirection: "column", height: "100%", padding: "10px 14px", background: "#fff", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 9, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "#fff", fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 12 }}>M</span>
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: 11, fontWeight: 800, fontFamily: "Manrope,sans-serif", color: "#0f1035" }}>Mio</p>
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
                      {[
                        { img:"/static/stock_product-headphones-dca952-0.jpg", alt:"Headphones", price:"$349" },
                        { img:"/static/stock_mio-shoes-9fc268-0.jpg", alt:"Shoes", price:"$119" },
                        { img:"/static/stock_mio-hotel-d2dcfd-0.jpg", alt:"Hotel", price:"$229" },
                        { img:"/static/stock_mio-food-cd2d10-0.jpg", alt:"Food", price:"$14" },
                      ].map(({img,alt,price}) => (
                        <div key={price} style={{ flex: 1, background: "#f5f3ff", borderRadius: 6, overflow:"hidden", textAlign: "center" }}>
                          <img src={img} alt={alt} style={{ width:"100%", height:28, objectFit:"cover" }}/>
                          <p style={{ margin: "2px 0 3px", fontSize: 8, color: "#7c3aed", fontWeight: 700 }}>{price}</p>
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

      {/* ══ EVERYTHING YOU CAN DO — photo card horizontal scroll ═ */}
      <section style={{ padding:"72px 0 72px 24px", background:"#fff", overflow:"hidden" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingRight:24, marginBottom:32 }}>
            <h2 style={{ fontFamily:"Manrope,sans-serif", fontWeight:800, fontSize:"clamp(24px,3vw,38px)", color:"#0f1035", margin:0, letterSpacing:"-0.03em" }}>
              Everything You Can Do with{" "}
              <span style={{ background:"linear-gradient(135deg,#7c3aed,#4f46e5)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Mio</span>
            </h2>
            <Link to="/features" style={{ display:"inline-flex", alignItems:"center", gap:6, color:"#7c3aed", fontWeight:700, fontSize:14, textDecoration:"none", flexShrink:0 }}>
              View All Features <ArrowRightIcon size={14} />
            </Link>
          </div>
          {/* Horizontal scroll photo cards */}
          <div style={{ display:"flex", gap:16, overflowX:"auto", paddingBottom:16, paddingRight:24, scrollbarWidth:"none" }}>
            {[
              { img:"/static/stock_mio-product-shoes-a8da9f-0.jpg", title:"Shop Anything", desc:"Top brands to everyday essentials, compare and buy in one place." },
              { img:"/static/stock_mio-food-dining-3591b8-0.jpg", title:"Food & Dining", desc:"Order from your favourite restaurants, schedule pickup or delivery." },
              { img:"/static/stock_mio-travel-hotel-58c54f-0.jpg", title:"Travel & Hotels", desc:"Find and book flights, hotels and more at the best rates." },
              { img:"/static/stock_mio-services-ee812e-0.jpg", title:"Invoicing & Business", desc:"Create estimates, send invoices, track payments with Invoingo." },
              { img:"/static/stock_mio-services-ee812e-1.jpg", title:"Bookings & Services", desc:"Appointments, events, tickets and local services." },
              { img:"/static/stock_mio-payments-07d846-0.jpg", title:"Payments", desc:"Secure and simple checkout with multiple payment methods." },
              { img:"/static/stock_mio-nfc-47e2ad-0.jpg", title:"NFC & In-Store", desc:"Tap anywhere to open Mio, order, book or pay." },
            ].map(card => (
              <div key={card.title} style={{ flexShrink:0, width:200, borderRadius:20, overflow:"hidden", background:"#f8f7ff", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", transition:"transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(124,58,237,0.12)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.06)"; }}>
                <img src={card.img} alt={card.title} style={{ width:"100%", height:140, objectFit:"cover" }} />
                <div style={{ padding:"14px 14px 16px" }}>
                  <p style={{ margin:"0 0 6px", fontFamily:"Manrope,sans-serif", fontWeight:700, fontSize:14, color:"#0f1035" }}>{card.title}</p>
                  <p style={{ margin:0, fontSize:12, color:"#6b7280", lineHeight:1.5 }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PHONE MOCKUPS SECTION — 5 phones matching reference ═ */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(180deg,#f8f7ff 0%,#fff 100%)", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#0f1035", margin: "0 0 6px", letterSpacing:"-0.01em" }}>Mobile App – Onboarding &amp; Key Flows</p>
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
              <div key={i} className="phone-animate" style={{ animationDelay: `${i * 0.12}s` }}>
                <PhoneFrame width={195} height={tall ? 420 : 380}>
                  <Screen />
                </PhoneFrame>
              </div>
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
              <h2 style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: "clamp(26px,3vw,38px)", color: "#0f1035", margin: "0 0 16px", lineHeight: 1.1 }}>
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
                <div style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 14, color: "#0f1035" }}>Mio</div>
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
                      <span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, color: "#fff", fontSize: 22 }}>M</span>
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
              <h2 style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: "clamp(26px,3vw,38px)", color: "#0f1035", margin: "0 0 16px", lineHeight: 1.1 }}>
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

      {/* ══ MORE APP SCREENS — 4 phones matching reference ══════ */}
      <section style={{ padding:"72px 24px", background:"#f8f7ff" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:40 }}>
            <h2 style={{ fontFamily:"Manrope,sans-serif", fontWeight:800, fontSize:"clamp(22px,2.5vw,34px)", color:"#0f1035", margin:0, letterSpacing:"-0.03em" }}>More App Screens</h2>
            <Link to="/features" style={{ display:"inline-flex", alignItems:"center", gap:6, color:"#7c3aed", fontWeight:700, fontSize:13, textDecoration:"none" }}>
              See All Screens <IconArrow size={13} color="#7c3aed" />
            </Link>
          </div>
          <div style={{ display:"flex", gap:20, justifyContent:"center", flexWrap:"wrap" }}>
            {/* Phone: Invoice/Create */}
            <PhoneFrame width={195} height={400}>
              <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"#fff" }}>
                <div style={{ padding:"8px 10px 6px", borderBottom:"1px solid #f3f4f6" }}>
                  <p style={{ margin:0, fontSize:10, fontWeight:800, fontFamily:"Manrope,sans-serif", color:"#0f1035" }}>Create Invoice<br/>with MioBot</p>
                </div>
                <div style={{ flex:1, padding:"8px 10px", display:"flex", flexDirection:"column", gap:6 }}>
                  <div style={{ background:"#f5f3ff", borderRadius:10, padding:"8px 10px" }}>
                    <p style={{ margin:0, fontSize:8, color:"#7c3aed", fontWeight:600 }}>Create an invoice for ABC Company for 3 office chairs at $120 each. Here is the summary:</p>
                  </div>
                  <div style={{ background:"#f8f7ff", borderRadius:8, padding:"8px 10px", border:"1px solid #ede9fe" }}>
                    <p style={{ margin:"0 0 4px", fontSize:9, fontWeight:700, color:"#0f1035", fontFamily:"Manrope,sans-serif" }}>Invoice Draft</p>
                    <p style={{ margin:"0 0 2px", fontSize:8, color:"#374151" }}>ABC Company</p>
                    {[["3 × Office Chair","$600.00"],["Subtotal","$600.00"],["Tax (8%)","$48.00"],["Total","$648.00"]].map(([l,v])=>(
                      <div key={l} style={{ display:"flex", justifyContent:"space-between" }}>
                        <span style={{ fontSize:8, color:"#6b7280" }}>{l}</span>
                        <span style={{ fontSize:8, fontWeight:600, color:"#0f1035" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", gap:6 }}>
                    <div style={{ flex:1, border:"1.5px solid #e5e7eb", borderRadius:8, padding:"7px 0", textAlign:"center", fontSize:9, fontWeight:600, color:"#374151" }}>Edit</div>
                    <div style={{ flex:1, background:"linear-gradient(135deg,#7c3aed,#4f46e5)", borderRadius:8, padding:"7px 0", textAlign:"center", fontSize:9, fontWeight:700, color:"#fff" }}>Send Invoice</div>
                  </div>
                </div>
                <div style={{ display:"flex", justifyContent:"space-around", padding:"6px 0 8px", borderTop:"1px solid #f3f4f6" }}>
                  {[["home",IconHome],["search",IconSearch],["mic",IconMic],["orders",IconOrders],["user",IconUser]].map(([k,Ic],i)=>(
                    <div key={k} style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                      {i===2 ? <div style={{ width:24, height:24, borderRadius:"50%", background:"linear-gradient(135deg,#7c3aed,#4f46e5)", display:"flex", alignItems:"center", justifyContent:"center" }}><Ic size={11} color="#fff" /></div> : <Ic size={13} color="#9ca3af" />}
                    </div>
                  ))}
                </div>
              </div>
            </PhoneFrame>

            {/* Phone: Travel */}
            <PhoneFrame width={195} height={400}>
              <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"#fff" }}>
                <div style={{ padding:"8px 10px 6px", borderBottom:"1px solid #f3f4f6" }}>
                  <p style={{ margin:0, fontSize:10.5, fontWeight:800, fontFamily:"Manrope,sans-serif", color:"#0f1035" }}>Travel</p>
                  <div style={{ display:"flex", gap:4, marginTop:5 }}>
                    {["Flights","Hotels","Cars","Trains"].map((t,i)=>(
                      <span key={t} style={{ fontSize:7.5, fontWeight:600, padding:"2px 6px", borderRadius:6, background:i===0?"#7c3aed":"#f3f4f6", color:i===0?"#fff":"#6b7280" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ flex:1, padding:"8px 10px", display:"flex", flexDirection:"column", gap:5 }}>
                  <div style={{ background:"#f5f3ff", borderRadius:8, padding:"6px 8px", fontSize:8.5, color:"#7c3aed", fontWeight:600 }}>Chicago (ORD) → New York (JFK)</div>
                  <p style={{ margin:0, fontSize:8, color:"#6b7280" }}>Mar 12 – Mar 16 · 1 Adult</p>
                  <p style={{ margin:"2px 0", fontSize:9, fontWeight:700, color:"#0f1035", fontFamily:"Manrope,sans-serif" }}>Best Deals</p>
                  {[["Delta","2h 10m","$214"],["United","2h 15m","$228"],["American","2h 30m","$236"]].map(([a,t,p])=>(
                    <div key={a} style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 7px", background:"#f9f7ff", borderRadius:7, border:"1px solid #f0eeff" }}>
                      <div style={{ width:20, height:20, borderRadius:5, background:"linear-gradient(135deg,#7c3aed,#4f46e5)", display:"flex", alignItems:"center", justifyContent:"center" }}><IconTravel size={10} color="#fff" /></div>
                      <div style={{ flex:1 }}><p style={{ margin:0, fontSize:8.5, fontWeight:700, color:"#0f1035", fontFamily:"Manrope,sans-serif" }}>{a}</p><p style={{ margin:0, fontSize:7.5, color:"#6b7280" }}>{t}</p></div>
                      <p style={{ margin:0, fontSize:10, fontWeight:800, color:"#7c3aed", fontFamily:"Manrope,sans-serif" }}>{p}</p>
                    </div>
                  ))}
                </div>
                <div style={{ padding:"0 10px 10px" }}>
                  <div style={{ background:"linear-gradient(135deg,#7c3aed,#4f46e5)", color:"#fff", borderRadius:10, padding:"8px 0", textAlign:"center", fontSize:10, fontWeight:700, fontFamily:"Manrope,sans-serif" }}>Search Flights</div>
                </div>
              </div>
            </PhoneFrame>

            {/* Phone: Food & Dining */}
            <PhoneFrame width={195} height={400}>
              <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"#fff" }}>
                <div style={{ padding:"8px 10px 6px", borderBottom:"1px solid #f3f4f6" }}>
                  <p style={{ margin:0, fontSize:10.5, fontWeight:800, fontFamily:"Manrope,sans-serif", color:"#0f1035" }}>Food & Dining</p>
                  <div style={{ display:"flex", gap:4, marginTop:5 }}>
                    {["Nearby","Fast Food","Pizza","Sushi"].map((t,i)=>(
                      <span key={t} style={{ fontSize:7, fontWeight:600, padding:"2px 5px", borderRadius:5, background:i===0?"#7c3aed":"#f3f4f6", color:i===0?"#fff":"#6b7280" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ flex:1, overflow:"hidden", padding:"6px 10px", display:"flex", flexDirection:"column", gap:5 }}>
                  {[
                    { img:"/static/stock_mio-food-dining-3591b8-0.jpg", name:"McDonald's", dist:"0.3 mi · Fast Food", rating:"4.2" },
                    { img:"/static/stock_mio-restaurant-642a3f-0.jpg", name:"Starbucks", dist:"0.4 mi · Coffee", rating:"4.6" },
                    { img:"/static/stock_mio-food-dining-3591b8-1.jpg", name:"Chipotle", dist:"0.6 mi · Mexican", rating:"4.4" },
                    { img:"/static/stock_mio-services-ee812e-0.jpg", name:"Panda Express", dist:"0.9 mi · Chinese", rating:"4.1" },
                  ].map(r=>(
                    <div key={r.name} style={{ display:"flex", gap:7, alignItems:"center" }}>
                      <img src={r.img} alt={r.name} style={{ width:32, height:32, borderRadius:8, objectFit:"cover", flexShrink:0 }}/>
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ margin:0, fontSize:9, fontWeight:700, color:"#0f1035", fontFamily:"Manrope,sans-serif" }}>{r.name}</p>
                        <p style={{ margin:0, fontSize:7.5, color:"#6b7280" }}>{r.dist} · <span style={{ color:"#f59e0b" }}>★</span> {r.rating}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PhoneFrame>

            {/* Phone: Services */}
            <PhoneFrame width={195} height={400}>
              <div style={{ display:"flex", flexDirection:"column", height:"100%", background:"#fff" }}>
                <div style={{ padding:"8px 10px 6px", borderBottom:"1px solid #f3f4f6" }}>
                  <p style={{ margin:0, fontSize:10.5, fontWeight:800, fontFamily:"Manrope,sans-serif", color:"#0f1035" }}>Services</p>
                  <div style={{ background:"#f5f3ff", borderRadius:7, padding:"5px 8px", marginTop:5, display:"flex", alignItems:"center", gap:5 }}>
                    <IconSearch size={9} color="#9ca3af" />
                    <span style={{ fontSize:8.5, color:"#9ca3af" }}>Search restaurants & more...</span>
                  </div>
                </div>
                <div style={{ flex:1, overflow:"hidden", padding:"6px 10px", display:"flex", flexDirection:"column", gap:6 }}>
                  {[
                    { Icon:IconServices, bg:"#f0fdf4", color:"#059669", label:"Home Services", sub:"Plumbing, cleaning, repairs" },
                    { Icon:IconNFC, bg:"#fdf4ff", color:"#db2777", label:"Beauty & Wellness", sub:"Salons, spas, gyms" },
                    { Icon:IconTravel, bg:"#eff6ff", color:"#2563eb", label:"Auto Services", sub:"Mechanics, car wash" },
                    { Icon:IconMore, bg:"#fff7ed", color:"#d97706", label:"Professional Services", sub:"Lawyers, accountants" },
                  ].map(s=>(
                    <div key={s.label} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 8px", background:"#f9f7ff", borderRadius:8 }}>
                      <div style={{ width:28, height:28, borderRadius:8, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><s.Icon size={14} color={s.color} /></div>
                      <div>
                        <p style={{ margin:0, fontSize:9, fontWeight:700, color:"#0f1035", fontFamily:"Manrope,sans-serif" }}>{s.label}</p>
                        <p style={{ margin:0, fontSize:7.5, color:"#6b7280" }}>{s.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PhoneFrame>
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
          <h2 style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "#fff", margin: "0 0 16px", lineHeight: 1.1 }}>
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
          <h2 style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: "clamp(26px,3vw,38px)", color: "#fff", margin: "0 0 12px" }}>
            Get early access to Mio
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", margin: "0 0 28px" }}>
            Be among the first to experience Mio — early access is free and open now.
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
                <span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 22, color: "#fff" }}>Mio</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: "#a3aab5", margin: "0 0 16px" }}>Your AI assistant for everyday life — shop, dine, travel, and pay through natural conversation.</p>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { label: "X (Twitter)", path: "https://twitter.com", svg: <><path d="M4 4l16 16M20 4L4 20" stroke="#a3aab5" strokeWidth="1.8" strokeLinecap="round"/></> },
                  { label: "LinkedIn", path: "https://linkedin.com", svg: <><rect x="2" y="2" width="20" height="20" rx="4" stroke="#a3aab5" strokeWidth="1.8"/><path d="M7 10v7M7 7v.5M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" stroke="#a3aab5" strokeWidth="1.8" strokeLinecap="round"/></> },
                  { label: "Instagram", path: "https://instagram.com", svg: <><rect x="3" y="3" width="18" height="18" rx="5" stroke="#a3aab5" strokeWidth="1.8"/><circle cx="12" cy="12" r="4" stroke="#a3aab5" strokeWidth="1.8"/><circle cx="17" cy="7" r="1" fill="#a3aab5"/></> },
                ].map(({ label, path, svg }) => (
                  <a key={label} href={path} aria-label={label} target="_blank" rel="noopener noreferrer" style={{ width: 32, height: 32, borderRadius: 9, background: "#1a1b4b", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">{svg}</svg>
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Product", links: [["Features","/features"],["Pricing","/pricing"],["Onboarding","/onboarding"],["Widget Demo","/widget"]] },
              { title: "Business", links: [["Merchant Dashboard","/merchant"],["Admin Console","/admin"],["Developer Portal","/developers"],["Integrations","/integrations"]] },
              { title: "Company", links: [["About Mio","/about"],["Privacy Policy","/privacy"],["Terms of Service","/terms"],["Contact Us","/about#contact"]] },
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
