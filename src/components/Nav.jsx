import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "../lib/useAuth";
export default function Nav() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.key]);
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  return (
    <>
      <a className="skip-link" href={`${location.pathname}#main`}>
        Skip to content
      </a>
      <header className="site-nav">
        <div className="nav-inner">
          <Link to="/" className="wordmark" aria-label="Mio home">
            mio<span>✳</span>
          </Link>
          <nav
            aria-label="Main navigation"
            className={open ? "nav-links is-open" : "nav-links"}
          >
            {[
              ["Explore Mio", "/features"],
              ["Integrations", "/providers"],
              ["For business", "/business"],
              ["EasyTap", "/easytap"],
              ["Developers", "/developers"],
              ["Pricing", "/pricing"],
              [user ? "My account" : "Sign in", user ? "/dashboard" : "/signin"],
            ].map(([label, path]) => (
              <NavLink key={path} to={path}>
                {label}
              </NavLink>
            ))}
          </nav>
          <Link className="nav-demo" to="/app">
            Try the demo <ArrowUpRight size={16} />
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </>
  );
}
