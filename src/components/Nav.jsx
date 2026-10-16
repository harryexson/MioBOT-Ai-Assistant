import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router";
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
  const navigate = useNavigate();
  const { user, logout, isLoggedIn } = useAuth();

  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  // Escape key closes drawer and user menu
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        if (open) {
          setOpen(false);
          hamburgerRef.current?.focus();
        }
        if (userMenuOpen) {
          setUserMenuOpen(false);
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, userMenuOpen]);

  // Focus trap inside mobile drawer
  useEffect(() => {
    if (!open) return;
    // Move focus to close button when drawer opens
    closeButtonRef.current?.focus();

    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusable = drawer.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const trap = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    drawer.addEventListener("keydown", trap);
    return () => drawer.removeEventListener("keydown", trap);
  }, [open]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close user menu on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    const onClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [userMenuOpen]);

  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => {
    setOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  return (
    <>
      {/* Skip-to-main-content link for keyboard users */}
      <a
        href="#main-content"
        style={{
          position: "absolute",
          top: -100,
          left: 16,
          zIndex: 9999,
          padding: "10px 20px",
          background: "#7c3aed",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
          borderRadius: 8,
          textDecoration: "none",
          transition: "top 0.2s",
        }}
        onFocus={(e) => { e.currentTarget.style.top = "16px"; }}
        onBlur={(e) => { e.currentTarget.style.top = "-100px"; }}
      >
        Skip to main content
      </a>

      <nav
        aria-label="Main navigation"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(255,255,255,0.97)" : "#ffffff",
          boxShadow: scrolled ? "0 1px 24px rgba(124,58,237,0.08)" : "0 1px 0 #ede9fe",
          backdropFilter: "blur(12px)",
          transition: "all 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: 1280, margin: "0 auto", padding: "0 24px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            height: 64,
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              textDecoration: "none", display: "flex", alignItems: "center",
              fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 22,
              color: "#0f1035", letterSpacing: "-0.03em",
            }}
            aria-label="Mio AI — home"
          >
            Mio
          </Link>

          {/* Desktop links */}
          <div
            style={{
              display: "flex", gap: 32, alignItems: "center",
            }}
            className="nav-desktop-links"
          >
            <style>{`
              .nav-desktop-links { display: none !important; }
              .nav-desktop-cta   { display: none !important; }
              .nav-hamburger     { display: flex !important; }
              @media (min-width: 768px) {
                .nav-desktop-links { display: flex !important; }
                .nav-desktop-cta   { display: flex !important; }
                .nav-hamburger     { display: none !important; }
              }
            `}</style>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                style={{
                  fontSize: 14, fontWeight: 500, textDecoration: "none",
                  color: location.pathname === l.href ? "#7c3aed" : "#374151",
                  transition: "color 0.2s",
                  fontFamily: "Space Grotesk, sans-serif",
                  letterSpacing: "-0.01em",
                }}
                aria-current={location.pathname === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div
            className="nav-desktop-cta"
            style={{ alignItems: "center", gap: 10 }}
          >
            <Link
              to="/search"
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "7px 14px", borderRadius: 50,
                background: "#f8f7ff", border: "1.5px solid #ede9fe",
                textDecoration: "none", color: "#374151", fontSize: 13,
              }}
            >
              <SearchIcon size={14} />
              Search
            </Link>

            {isLoggedIn ? (
              <div style={{ position: "relative" }} ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "7px 14px", borderRadius: 50,
                    background: "#f5f3ff", border: "1.5px solid #ede9fe",
                    cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#7c3aed",
                  }}
                  aria-label="User menu"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="menu"
                >
                  <div
                    style={{
                      width: 26, height: 26, borderRadius: "50%",
                      background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <UserIcon size={14} style={{ color: "#fff" }} />
                  </div>
                  {user?.name?.split(" ")[0] || "Account"}
                </button>

                {userMenuOpen && (
                  <div
                    role="menu"
                    style={{
                      position: "absolute", right: 0, top: "calc(100% + 8px)",
                      background: "#fff", borderRadius: 16,
                      border: "1.5px solid #ede9fe",
                      boxShadow: "0 12px 40px rgba(124,58,237,0.14)",
                      padding: "8px", minWidth: 180, zIndex: 100,
                    }}
                  >
                    <p style={{ padding: "8px 12px", margin: 0, fontSize: 12, color: "#374151", borderBottom: "1px solid #f3f4f6" }}>
                      {user?.email}
                    </p>
                    <Link role="menuitem" to="/dashboard" style={{ display: "block", padding: "9px 12px", fontSize: 13, color: "#374151", textDecoration: "none", borderRadius: 10 }}>My Dashboard</Link>
                    <Link role="menuitem" to="/voice"     style={{ display: "block", padding: "9px 12px", fontSize: 13, color: "#374151", textDecoration: "none", borderRadius: 10 }}>Search &amp; Shop</Link>
                    <Link role="menuitem" to="/pricing"   style={{ display: "block", padding: "9px 12px", fontSize: 13, color: "#374151", textDecoration: "none", borderRadius: 10 }}>Upgrade Plan</Link>
                    <button
                      role="menuitem"
                      onClick={logout}
                      style={{
                        width: "100%", textAlign: "left", padding: "9px 12px",
                        fontSize: 13, color: "#dc2626", background: "none",
                        border: "none", cursor: "pointer", borderRadius: 10,
                        fontFamily: "Space Grotesk, sans-serif",
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => setAuthModal("signin")}
                  style={{
                    fontSize: 14, fontWeight: 500, color: "#374151",
                    padding: "9px 16px", fontFamily: "Space Grotesk, sans-serif",
                    background: "none", border: "none", cursor: "pointer",
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthModal("signup")}
                  style={{
                    fontSize: 14, fontWeight: 700, color: "#fff",
                    background: "#7c3aed", borderRadius: 50,
                    padding: "10px 24px",
                    boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
                    fontFamily: "Space Grotesk, sans-serif",
                    letterSpacing: "-0.01em",
                    border: "none", cursor: "pointer",
                  }}
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            className="nav-hamburger"
            style={{
              padding: "8px", borderRadius: 10,
              color: "#374151", background: "none",
              border: "none", cursor: "pointer",
              alignItems: "center", justifyContent: "center",
            }}
            onClick={openDrawer}
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="mobile-drawer"
          >
            <MenuIcon size={22} />
          </button>
        </div>

        {/* Mobile backdrop */}
        {open && (
          <div
            aria-hidden="true"
            onClick={closeDrawer}
            style={{
              position: "fixed", inset: 0, zIndex: 60,
              background: "rgba(15,16,53,0.45)",
              backdropFilter: "blur(2px)",
            }}
          />
        )}

        {/* Mobile drawer — slides in from right */}
        <div
          id="mobile-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          style={{
            position: "fixed", top: 0, right: 0, bottom: 0,
            width: "min(85vw, 340px)",
            background: "#ffffff",
            zIndex: 70,
            boxShadow: "-8px 0 40px rgba(15,16,53,0.15)",
            display: "flex", flexDirection: "column",
            transform: open ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
            overflowY: "auto",
          }}
        >
          {/* Drawer header */}
          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "0 20px", height: 64,
              borderBottom: "1px solid #ede9fe",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "Manrope, sans-serif", fontWeight: 800,
                fontSize: 22, color: "#0f1035", letterSpacing: "-0.03em",
              }}
            >
              Mio
            </span>
            <button
              ref={closeButtonRef}
              onClick={closeDrawer}
              style={{
                padding: "8px", borderRadius: 10,
                color: "#374151", background: "none",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              aria-label="Close navigation menu"
            >
              <XIcon size={22} />
            </button>
          </div>

          {/* Drawer body */}
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4, flexGrow: 1 }}>
            <Link
              to="/search"
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 12px", borderRadius: 12,
                background: "#f8f7ff", border: "1.5px solid #ede9fe",
                textDecoration: "none", color: "#374151",
                fontSize: 14, fontWeight: 600, marginBottom: 8,
              }}
            >
              <SearchIcon size={16} style={{ color: "#7c3aed" }} />
              Search Mio
            </Link>

            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                style={{
                  display: "block", padding: "10px 12px", borderRadius: 12,
                  fontSize: 14, fontWeight: 500, textDecoration: "none",
                  color: location.pathname === l.href ? "#7c3aed" : "#374151",
                  background: location.pathname === l.href ? "#f5f3ff" : "transparent",
                }}
                aria-current={location.pathname === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}

            <div
              style={{
                paddingTop: 16, marginTop: 12,
                borderTop: "1px solid #ede9fe",
                display: "flex", flexDirection: "column", gap: 10,
              }}
            >
              {isLoggedIn ? (
                <>
                  <p style={{ margin: "0 0 4px", padding: "0 4px", fontSize: 12, color: "#374151" }}>
                    Signed in as {user?.email}
                  </p>
                  <Link
                    to="/dashboard"
                    style={{
                      display: "block", textAlign: "center", padding: "11px 20px",
                      borderRadius: 50, fontSize: 14, fontWeight: 600,
                      color: "#7c3aed", border: "1.5px solid #7c3aed",
                      textDecoration: "none", background: "#f5f3ff",
                    }}
                  >
                    My Dashboard
                  </Link>
                  <Link
                    to="/voice"
                    style={{
                      display: "block", textAlign: "center", padding: "11px 20px",
                      borderRadius: 50, fontSize: 14, fontWeight: 600,
                      color: "#374151", border: "1.5px solid #e5e7eb",
                      textDecoration: "none",
                    }}
                  >
                    Search &amp; Shop
                  </Link>
                  <Link
                    to="/pricing"
                    style={{
                      display: "block", textAlign: "center", padding: "11px 20px",
                      borderRadius: 50, fontSize: 14, fontWeight: 600,
                      color: "#374151", border: "1.5px solid #e5e7eb",
                      textDecoration: "none",
                    }}
                  >
                    Upgrade Plan
                  </Link>
                  <button
                    onClick={logout}
                    style={{
                      padding: "11px 20px", borderRadius: 50,
                      fontSize: 14, fontWeight: 600, color: "#dc2626",
                      border: "1.5px solid #fca5a5", background: "#fff7f7",
                      cursor: "pointer", fontFamily: "Space Grotesk, sans-serif",
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { closeDrawer(); setAuthModal("signin"); }}
                    style={{
                      padding: "11px 20px", borderRadius: 50,
                      fontSize: 14, fontWeight: 600,
                      color: "#374151", border: "1.5px solid #e5e7eb",
                      background: "#fff", cursor: "pointer",
                      fontFamily: "Space Grotesk, sans-serif",
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { closeDrawer(); setAuthModal("signup"); }}
                    style={{
                      padding: "11px 20px", borderRadius: 50,
                      fontSize: 14, fontWeight: 700,
                      color: "#fff", background: "#7c3aed",
                      border: "none", cursor: "pointer",
                      boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
                      fontFamily: "Space Grotesk, sans-serif",
                    }}
                  >
                    Get Started Free
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSuccess={() => { setAuthModal(null); navigate("/dashboard"); }}
        />
      )}
    </>
  );
}
