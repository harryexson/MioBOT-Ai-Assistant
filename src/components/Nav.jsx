import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router";
import MenuIcon from "icon:menu";
import XIcon from "icon:x";
import ChevronDownIcon from "icon:chevron-down";

const NAV_GROUPS = [
  {
    label: "Features",
    items: [
      { to: "/features", label: "Features", desc: "All 10 service modules" },
      { to: "/pricing", label: "Pricing", desc: "Free, Pro & Business tiers" },
      { to: "/widget", label: "Widget Demo", desc: "Embed Mio anywhere" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { to: "/checkout", label: "Payments", desc: "How Mio handles checkout" },
      { to: "/easytap", label: "EasyTap Go", desc: "NFC in-store experience" },
      { to: "/providers", label: "Provider Status", desc: "Live gateway health" },
    ],
  },
  {
    label: "Integrations",
    items: [
      { to: "/merchant", label: "Merchant Dashboard", desc: "Orders, menus, analytics" },
      { to: "/developers", label: "Developer Portal", desc: "API docs and SDKs" },
    ],
  },
];

function DropdownMenu({ group, onClose }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-[#e8e4ff] rounded-2xl shadow-xl overflow-hidden z-50">
      <div className="p-2">
        {group.items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all group ${
                isActive ? "bg-violet-50" : "hover:bg-[#f8f7ff]"
              }`
            }
          >
            <div>
              <div className="text-[#0f1035] text-sm font-medium leading-tight">{item.label}</div>
              <div className="text-[#0f1035]/50 text-xs mt-0.5">{item.desc}</div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenGroup(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#e8e4ff] py-3 shadow-sm"
          : "bg-white py-4 border-b border-[#f0edff]"
      }`}
      ref={navRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label="Mio AI home">
          <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white font-display font-800 text-base leading-none">M</span>
          </div>
          <span className="font-display font-700 text-[#0f1035] text-xl tracking-tight">Mio</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="relative">
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  openGroup === group.label
                    ? "text-[#0f1035] bg-[#f0edff]"
                    : "text-[#0f1035]/70 hover:text-[#0f1035] hover:bg-[#f8f7ff]"
                }`}
                onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                aria-expanded={openGroup === group.label}
                aria-haspopup="true"
              >
                {group.label}
                <ChevronDownIcon
                  className={`w-3.5 h-3.5 transition-transform ${openGroup === group.label ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              {openGroup === group.label && (
                <DropdownMenu group={group} onClose={() => setOpenGroup(null)} />
              )}
            </div>
          ))}
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? "text-[#7c3aed] bg-[#f0edff]" : "text-[#0f1035]/70 hover:text-[#0f1035] hover:bg-[#f8f7ff]"
              }`
            }
          >
            Pricing
          </NavLink>
          <NavLink
            to="/developers"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive ? "text-[#7c3aed] bg-[#f0edff]" : "text-[#0f1035]/70 hover:text-[#0f1035] hover:bg-[#f8f7ff]"
              }`
            }
          >
            Developers
          </NavLink>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
                isActive
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-[#e8e4ff] text-[#0f1035]/50 hover:text-[#0f1035]/80 hover:bg-[#f8f7ff]"
              }`
            }
          >
            Admin ↗
          </NavLink>
          <Link
            to="/onboarding"
            className="text-sm text-[#0f1035]/70 hover:text-[#0f1035] transition-colors px-3 py-2 font-medium"
          >
            Sign In
          </Link>
          <Link
            to="/onboarding"
            className="gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-md"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-[#0f1035]/70 hover:text-[#0f1035] transition-colors p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <XIcon className="w-6 h-6" aria-hidden="true" /> : <MenuIcon className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-[#e8e4ff] mt-0">
          <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Mobile navigation">
            {NAV_GROUPS.map((group) => (
              <div key={group.label}>
                <div className="text-[#0f1035]/40 text-xs font-semibold uppercase tracking-wider px-2 py-2 mt-2">
                  {group.label}
                </div>
                {group.items.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `py-2.5 px-2 text-base font-medium border-b border-[#f0edff] transition-colors block ${
                        isActive ? "text-[#7c3aed]" : "text-[#0f1035]/80 hover:text-[#0f1035]"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            ))}
            <NavLink
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="mt-3 py-2.5 px-2 text-base font-medium text-[#0f1035]/40 block"
            >
              Admin ↗
            </NavLink>
            <Link
              to="/onboarding"
              onClick={() => setMenuOpen(false)}
              className="mt-4 gradient-bg text-white font-semibold text-center py-3.5 rounded-xl block"
            >
              Get Started Free
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
