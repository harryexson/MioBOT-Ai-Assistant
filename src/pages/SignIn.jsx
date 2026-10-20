import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { backendConfigured, unavailableMessage } from "../lib/pb";
import { Zap as ZapIcon } from "lucide-react";
import { useAuth } from "../lib/useAuth.jsx";

export default function SignIn() {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await signup(email, password, name);
      }
      const next = params.get("next");
      navigate(["/dashboard", "/commissions", "/settings"].includes(next) ? next : "/dashboard");
    } catch (err) {
      setStatus("error");
      const msg = err?.response?.message || err?.message || "Something went wrong. Please try again.";
      if (msg.includes("Failed to authenticate")) {
        setErrorMsg("Incorrect email or password. Please try again.");
      } else if (msg.includes("already exists")) {
        setErrorMsg("An account with this email already exists. Sign in instead.");
      } else {
        setErrorMsg(msg);
      }
    }
  };

  return (
    <div style={{ paddingTop: 72, minHeight: "100vh", background: "#f8f7ff", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 24px 60px" }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12, boxShadow: "0 8px 24px rgba(124,58,237,0.3)" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 26, fontFamily: "Manrope,sans-serif" }}>M</span>
          </div>
          <h1 style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 26, color: "#0f1035", margin: "0 0 6px" }}>
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
            {mode === "login" ? "Sign in to your Mio account" : "Start shopping, dining and travelling with AI"}
          </p>
        </div>

        {/* Card */}
        <div className="glass" style={{ borderRadius: 28, padding: "36px 32px", border: "1.5px solid #ede9fe" }}>
          {/* Mode toggle */}
          <div style={{ display: "flex", background: "#f3f4f6", borderRadius: 12, padding: 4, marginBottom: 24 }}>
            {["login", "signup"].map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setErrorMsg(""); setStatus("idle"); }}
                style={{
                  flex: 1, padding: "9px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, transition: "all 0.2s",
                  background: mode === m ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "transparent",
                  color: mode === m ? "#fff" : "#6b7280",
                  fontFamily: "DM Sans,sans-serif",
                }}
              >
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {!backendConfigured && <p role="status" className="connection-note">{unavailableMessage} <Link to="/app">Explore the preview →</Link></p>}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {mode === "signup" && (
              <div>
                <label htmlFor="auth-name" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Full name</label>
                <input
                  id="auth-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Jane Smith"
                  required
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e5e7eb", fontSize: 14, fontFamily: "DM Sans,sans-serif", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            )}
            <div>
              <label htmlFor="auth-email" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email address</label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e5e7eb", fontSize: 14, fontFamily: "DM Sans,sans-serif", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label htmlFor="auth-password" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Password</label>
              <input
                id="auth-password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
                required
                minLength={8}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e5e7eb", fontSize: 14, fontFamily: "DM Sans,sans-serif", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            {status === "error" && (
              <div role="alert" style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#991b1b" }}>
                {errorMsg}
              </div>
            )}

            <button type="submit" className="btn-primary" disabled={!backendConfigured || status === "loading"} style={{ width: "100%", justifyContent: "center", marginTop: 4, fontSize: 15 }}>
              {status === "loading" ? (mode === "login" ? "Signing in…" : "Creating account…") : (mode === "login" ? "Sign In" : "Create Account")}
            </button>
          </form>

          {mode === "login" && (
            <p style={{ textAlign: "center", fontSize: 13, color: "#6b7280", margin: "18px 0 0" }}>
              Don't have an account?{" "}
              <button onClick={() => setMode("signup")} style={{ background: "none", border: "none", color: "#7c3aed", fontWeight: 600, cursor: "pointer", fontSize: 13, padding: 0, fontFamily: "DM Sans,sans-serif" }}>
                Sign up free
              </button>
            </p>
          )}
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "#6d727a", marginTop: 20 }}>
          By continuing you agree to Mio's{" "}
          <Link to="#" style={{ color: "#7c3aed" }}>Terms of Service</Link> and{" "}
          <Link to="#" style={{ color: "#7c3aed" }}>Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
