import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router";
import MenuIcon from "icon:menu";
import XIcon from "icon:x";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { to: "/features", label: "Features" },
    { to: "/pricing", label: "Pricing" },
    { to: "/merchant", label: "Merchants" },
    { to: "/developers", label: "Developers" },
    { to: "/widget", label: "Widget Demo" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/10 py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="Mio AI home">
          <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-display font-800 text-base leading-none">M</span>
          </div>
          <span className="font-display font-700 text-white text-xl tracking-tight">Mio</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-violet-light" : "text-white/70 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
                isActive
                  ? "border-red-500/40 bg-red-500/15 text-red-300"
                  : "border-white/10 text-white/50 hover:text-white/80 hover:bg-white/5"
              }`
            }
          >
            Admin
          </NavLink>
          <Link
            to="/onboarding"
            className="text-sm text-white/70 hover:text-white transition-colors px-3 py-2"
          >
            Sign In
          </Link>
          <Link
            to="/onboarding"
            className="gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/80 hover:text-white transition-colors p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-white/10 mt-2">
          <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Mobile navigation">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-base font-medium border-b border-white/5 transition-colors ${
                    isActive ? "text-violet-light" : "text-white/80 hover:text-white"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-3 text-base font-medium border-b border-white/5 transition-colors ${
                  isActive ? "text-violet-light" : "text-white/80 hover:text-white"
                }`
              }
            >
              Admin
            </NavLink>
            <Link
              to="/onboarding"
              onClick={() => setMenuOpen(false)}
              className="mt-4 gradient-bg text-white font-semibold text-center py-3 rounded-xl"
            >
              Get Started Free
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
