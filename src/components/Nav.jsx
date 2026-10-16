import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import MenuIcon from "icon:menu";
import XIcon from "icon:x";
import SearchIcon from "icon:search";
import AuthModal from "./AuthModal.jsx";
import UserIcon from "icon:user";
import { useAuth } from "../lib/useAuth.jsx";

const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Solutions", href: "/providers" },
  { label: "Integrations", href: "/integrations" },
  { label: "Pricing", href: "/pricing" },
  { label: "Developers", href: "/developers" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null); // "signup" | "signin" | null
  const location = useLocation();
  const { user, logout, isLoggedIn } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setUserMenuOpen(false); }, [location]);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(255,255,255,0.97)" : "#ffffff",
        boxShadow: scrolled ? "0 1px 24px rgba(124,58,237,0.08)" : "0 1px 0 #ede9fe",
        backdropFilter: "blur(12px)",
        transition: "all 0.3s",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo — matching reference: bold black "Mio" text */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 0 }}>
          <span className="logo-text">Mio</span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "none", gap: 32, alignItems: "center" }} className="md-nav-links">
          <style>{`@media(min-width:768px){.md-nav-links{display:flex!important}.mobile-nav-btn{display:none!important}}`}</style>
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              to={l.href}
              style={{ fontSize: 14, fontWeight: 500, textDecoration: "none", color: location.pathname === l.href ? "#7c3aed" : "#4b5563", transition: "color 0.2s", fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.01em" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div style={{ display: "none", alignItems: "center", gap: 10 }} className="md-nav-links">
          {/* Search shortcut */}
          <Link to="/search" style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 50, background: "#f8f7ff", border: "1.5px solid #ede9fe", textDecoration: "none", color: "#6b7280", fontSize: 13 }}>
            <SearchIcon size={14} />
            Search
          </Link>

          {isLoggedIn ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setUserMenuOpen(o => !o)}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 50, background: "#f5f3ff", border: "1.5px solid #ede9fe", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#7c3aed" }}
                aria-label="User menu"
                aria-expanded={userMenuOpen}
              >
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <UserIcon size={14} style={{ color: "#fff" }} />
                </div>
                {user?.name?.split(" ")[0] || "Account"}
              </button>
              {userMenuOpen && (
                <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: "#fff", borderRadius: 16, border: "1.5px solid #ede9fe", boxShadow: "0 12px 40px rgba(124,58,237,0.14)", padding: "8px", minWidth: 180, zIndex: 100 }}>
                  <p style={{ padding: "8px 12px", margin: 0, fontSize: 12, color: "#6b7280", borderBottom: "1px solid #f3f4f6" }}>{user?.email}</p>
                  <Link to="/merchant" style={{ display: "block", padding: "9px 12px", fontSize: 13, color: "#374151", textDecoration: "none", borderRadius: 10 }}>Dashboard</Link>
                  <Link to="/search" style={{ display: "block", padding: "9px 12px", fontSize: 13, color: "#374151", textDecoration: "none", borderRadius: 10 }}>My Orders</Link>
                  <button onClick={logout} style={{ width: "100%", textAlign: "left", padding: "9px 12px", fontSize: 13, color: "#dc2626", background: "none", border: "none", cursor: "pointer", borderRadius: 10, fontFamily: "DM Sans,sans-serif" }}>Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={()=>setAuthModal("signin")} style={{ fontSize:14, fontWeight:500, color:"#0f1035", padding:"9px 16px", fontFamily:"Space Grotesk,sans-serif", background:"none", border:"none", cursor:"pointer" }}>Sign In</button>
              <button onClick={()=>setAuthModal("signup")} style={{ fontSize:14, fontWeight:700, color:"#fff", background:"#7c3aed", borderRadius:50, padding:"10px 24px", boxShadow:"0 4px 20px rgba(124,58,237,0.35)", fontFamily:"Space Grotesk,sans-serif", letterSpacing:"-0.01em", border:"none", cursor:"pointer" }}>Get Started</button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-nav-btn"
          style={{ padding: "8px", borderRadius: 10, color: "#374151", background: "none", border: "none", cursor: "pointer" }}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <XIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div style={{ borderTop: "1px solid #ede9fe", background: "#ffffff" }}>
          <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
            <Link to="/search" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 12, background: "#f8f7ff", border: "1.5px solid #ede9fe", textDecoration: "none", color: "#374151", fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
              <SearchIcon size={16} style={{ color: "#7c3aed" }} /> Search Mio
            </Link>
            {NAV_LINKS.map(l => (
              <Link
                key={l.href}
                to={l.href}
                style={{ display: "block", padding: "10px 12px", borderRadius: 12, fontSize: 14, fontWeight: 500, textDecoration: "none", color: location.pathname === l.href ? "#7c3aed" : "#374151", background: location.pathname === l.href ? "#f5f3ff" : "transparent" }}
              >
                {l.label}
              </Link>
            ))}
            <div style={{ paddingTop: 12, marginTop: 8, borderTop: "1px solid #ede9fe", display: "flex", flexDirection: "column", gap: 8 }}>
              {isLoggedIn ? (
                <>
                  <Link to="/merchant" className="btn-secondary" style={{ textAlign: "center", justifyContent: "center" }}>Dashboard</Link>
                  <button onClick={logout} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>Sign Out</button>
                </>
              ) : (
                <>
                  <button onClick={()=>{ setOpen(false); setAuthModal("signin"); }} className="btn-secondary" style={{ textAlign:"center", justifyContent:"center", cursor:"pointer" }}>Sign In</button>
                  <button onClick={()=>{ setOpen(false); setAuthModal("signup"); }} className="btn-primary" style={{ textAlign:"center", justifyContent:"center", cursor:"pointer" }}>Get Started Free</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
