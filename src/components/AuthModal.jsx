import { useState } from "react";
import { useAuth } from "../lib/useAuth.jsx";
import { IconSearch, IconUser, IconCheck } from "./MioIcons.jsx";
import { ArrowRight as ArrowRightIcon } from "lucide-react";
import { X as XIcon } from "lucide-react";

/* ── Auth Modal — Sign Up / Sign In ───────────────────────────────── */
export default function AuthModal({ mode = "signup", onClose, onSuccess }) {
  const { login, signup } = useAuth();
  const [tab, setTab] = useState(mode); // "signup" | "signin"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (tab === "signup") {
        await signup(email, password, name, "personal");
      } else {
        await login(email, password);
      }
      onSuccess?.();
      onClose?.();
    } catch (err) {
      const msg = err?.response?.message || err?.message || "Something went wrong — please try again.";
      setError(msg.includes("Failed to create") ? "An account with this email already exists. Try signing in." : msg.includes("credentials") || msg.includes("password") ? "Incorrect email or password." : msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={tab === "signup" ? "Create your Mio account" : "Sign in to Mio"}
      style={{ position:"fixed", inset:0, zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position:"absolute", inset:0, background:"rgba(15,16,53,0.55)", backdropFilter:"blur(4px)" }}
        aria-hidden="true"
      />

      {/* Panel */}
      <div style={{ position:"relative", width:"100%", maxWidth:420, background:"#fff", borderRadius:24, padding:32, boxShadow:"0 24px 80px rgba(15,16,53,0.2)" }}>
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{ position:"absolute", top:16, right:16, width:32, height:32, border:"none", background:"#f3f4f6", borderRadius:"50%", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
        >
          <XIcon size={16} />
        </button>

        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:24 }}>
          <span style={{ fontFamily:"Manrope,sans-serif", fontWeight:800, fontSize:28, color:"#0f1035", letterSpacing:"-0.04em" }}>
            Mio
          </span>
          <p style={{ margin:"6px 0 0", fontFamily:"Space Grotesk,sans-serif", fontSize:14, color:"#6b7280" }}>
            {tab === "signup" ? "Create your free account" : "Welcome back"}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", background:"#f3f4f6", borderRadius:12, padding:4, marginBottom:24 }}>
          {[["signup","Get Started"],["signin","Sign In"]].map(([t,label])=>(
            <button
              key={t}
              onClick={()=>{ setTab(t); setError(""); }}
              style={{ flex:1, padding:"8px 0", borderRadius:9, border:"none", cursor:"pointer", fontFamily:"Manrope,sans-serif", fontWeight:700, fontSize:14, transition:"all 0.18s",
                background: tab===t ? "#fff" : "transparent",
                color: tab===t ? "#7c3aed" : "#6b7280",
                boxShadow: tab===t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {tab === "signup" && (
            <div style={{ marginBottom:16 }}>
              <label htmlFor="auth-name" style={{ display:"block", fontFamily:"Manrope,sans-serif", fontWeight:600, fontSize:13, color:"#374151", marginBottom:6 }}>Your name</label>
              <input
                id="auth-name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={e=>setName(e.target.value)}
                placeholder="Jane Smith"
                style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1.5px solid #e5e7eb", fontFamily:"Space Grotesk,sans-serif", fontSize:15, color:"#0f1035", outline:"none", boxSizing:"border-box", transition:"border 0.15s" }}
                onFocus={e=>e.target.style.borderColor="#7c3aed"}
                onBlur={e=>e.target.style.borderColor="#e5e7eb"}
              />
            </div>
          )}

          <div style={{ marginBottom:16 }}>
            <label htmlFor="auth-email" style={{ display:"block", fontFamily:"Manrope,sans-serif", fontWeight:600, fontSize:13, color:"#374151", marginBottom:6 }}>Email address</label>
            <input
              id="auth-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e=>setEmail(e.target.value)}
              placeholder="jane@example.com"
              style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1.5px solid #e5e7eb", fontFamily:"Space Grotesk,sans-serif", fontSize:15, color:"#0f1035", outline:"none", boxSizing:"border-box", transition:"border 0.15s" }}
              onFocus={e=>e.target.style.borderColor="#7c3aed"}
              onBlur={e=>e.target.style.borderColor="#e5e7eb"}
            />
          </div>

          <div style={{ marginBottom:24 }}>
            <label htmlFor="auth-password" style={{ display:"block", fontFamily:"Manrope,sans-serif", fontWeight:600, fontSize:13, color:"#374151", marginBottom:6 }}>Password {tab==="signup" && <span style={{ color:"#9ca3af", fontWeight:400 }}>(min 8 characters)</span>}</label>
            <input
              id="auth-password"
              type="password"
              autoComplete={tab==="signup" ? "new-password" : "current-password"}
              required
              minLength={8}
              value={password}
              onChange={e=>setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width:"100%", padding:"11px 14px", borderRadius:10, border:"1.5px solid #e5e7eb", fontFamily:"Space Grotesk,sans-serif", fontSize:15, color:"#0f1035", outline:"none", boxSizing:"border-box", transition:"border 0.15s" }}
              onFocus={e=>e.target.style.borderColor="#7c3aed"}
              onBlur={e=>e.target.style.borderColor="#e5e7eb"}
            />
          </div>

          {error && (
            <div role="alert" style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:10, padding:"10px 14px", marginBottom:16 }}>
              <p style={{ margin:0, fontFamily:"Space Grotesk,sans-serif", fontSize:13, color:"#dc2626" }}>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{ width:"100%", padding:"13px 0", background:"linear-gradient(135deg,#7c3aed,#4f46e5)", color:"#fff", border:"none", borderRadius:12, fontFamily:"Manrope,sans-serif", fontWeight:700, fontSize:16, cursor:loading?"wait":"pointer", boxShadow:"0 6px 24px rgba(124,58,237,0.3)", opacity:loading?0.75:1, transition:"opacity 0.15s", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}
          >
            {loading ? "Please wait…" : tab === "signup" ? <>Get Mio Free <ArrowRightIcon size={16} /></> : "Sign In"}
          </button>
        </form>

        {tab === "signup" && (
          <div style={{ marginTop:20 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
              {["Free account — no credit card needed","Shop, dine, travel & pay through Mio","Upgrade to Personal or Business anytime"].map(t=>(
                <div key={t} style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:18, height:18, borderRadius:"50%", background:"#ecfdf5", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <IconCheck size={11} color="#10b981" />
                  </div>
                  <span style={{ fontFamily:"Space Grotesk,sans-serif", fontSize:12, color:"#6b7280" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p style={{ margin:"20px 0 0", textAlign:"center", fontFamily:"Space Grotesk,sans-serif", fontSize:12, color:"#9ca3af" }}>
          {tab==="signup" ? <>Already have an account? <button onClick={()=>setTab("signin")} style={{ background:"none", border:"none", color:"#7c3aed", fontWeight:700, cursor:"pointer", fontSize:12, padding:0, fontFamily:"inherit" }}>Sign in</button></> : <>No account yet? <button onClick={()=>setTab("signup")} style={{ background:"none", border:"none", color:"#7c3aed", fontWeight:700, cursor:"pointer", fontSize:12, padding:0, fontFamily:"inherit" }}>Create one free</button></>}
        </p>
      </div>
    </div>
  );
}
