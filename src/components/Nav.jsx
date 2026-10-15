import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import MenuIcon from "icon:menu";
import XIcon from "icon:x";

const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Solutions", href: "/providers" },
  { label: "Integrations", href: "/easytap" },
  { label: "Pricing", href: "/pricing" },
  { label: "Developers", href: "/developers" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "#ffffff",
        boxShadow: scrolled ? "0 1px 24px rgba(124,58,237,0.08)" : "0 1px 0 #ede9fe",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span
            className="text-2xl font-display font-bold"
            style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Mio
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              to={l.href}
              className="text-sm font-medium no-underline transition-colors"
              style={{ color: location.pathname === l.href ? "#7c3aed" : "#374151" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/onboarding" className="text-sm font-semibold no-underline" style={{ color: "#374151" }}>
            Sign In
          </Link>
          <Link to="/onboarding" className="btn-primary text-sm px-5 py-2.5">
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: "#374151" }}
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <XIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t" style={{ background: "#ffffff", borderColor: "#ede9fe" }}>
          <div className="px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(l => (
              <Link
                key={l.href}
                to={l.href}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium no-underline"
                style={{ color: location.pathname === l.href ? "#7c3aed" : "#374151", background: location.pathname === l.href ? "#f5f3ff" : "transparent" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t flex flex-col gap-2" style={{ borderColor: "#ede9fe" }}>
              <Link to="/onboarding" className="btn-secondary text-center justify-center">Sign In</Link>
              <Link to="/onboarding" className="btn-primary text-center justify-center">Get Started Free</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
