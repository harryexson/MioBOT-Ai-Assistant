import { useState } from "react";
import { Link } from "react-router";
import CheckIcon from "icon:check-circle";
import AlertIcon from "icon:alert-triangle";
import ClockIcon from "icon:clock";
import ZapIcon from "icon:zap";
import ShieldIcon from "icon:shield-check";
import ArrowRightIcon from "icon:arrow-right";
import RefreshIcon from "icon:refresh-cw";

const PROVIDERS = [
  {
    category: "Retail Shopping",
    emoji: "🛍️",
    status: "operational",
    latency: "142ms",
    uptime: "99.97%",
    providers: ["Amazon", "eBay", "Currys", "John Lewis", "ASOS", "Zalando"],
    ops: ["search", "getDetails", "getAvailability", "getPrice", "getOffers", "createCart", "prepareCheckout", "confirmTransaction", "getOrderStatus", "cancelOrRefund"],
  },
  {
    category: "Restaurants & Food",
    emoji: "🍔",
    status: "operational",
    latency: "98ms",
    uptime: "99.94%",
    providers: ["Just Eat", "Deliveroo", "Uber Eats", "OpenTable", "Resy"],
    ops: ["search", "getDetails", "getAvailability", "getPrice", "getOffers", "createCart", "prepareCheckout", "confirmTransaction", "getOrderStatus", "cancelOrRefund"],
  },
  {
    category: "Groceries",
    emoji: "🥦",
    status: "operational",
    latency: "115ms",
    uptime: "99.91%",
    providers: ["Ocado", "Tesco Online", "Sainsbury's", "Waitrose", "Morrisons"],
    ops: ["search", "getDetails", "getAvailability", "getPrice", "getOffers", "createCart", "prepareCheckout", "confirmTransaction", "getOrderStatus", "cancelOrRefund"],
  },
  {
    category: "Hotels",
    emoji: "🏨",
    status: "operational",
    latency: "203ms",
    uptime: "99.88%",
    providers: ["Booking.com", "Hotels.com", "Expedia", "Airbnb", "Marriott"],
    ops: ["search", "getDetails", "getAvailability", "getPrice", "getOffers", "prepareCheckout", "confirmTransaction", "getOrderStatus", "cancelOrRefund"],
  },
  {
    category: "Flights",
    emoji: "✈️",
    status: "degraded",
    latency: "487ms",
    uptime: "98.21%",
    providers: ["Skyscanner", "Kayak", "Google Flights", "British Airways", "easyJet"],
    ops: ["search", "getDetails", "getAvailability", "getPrice", "getOffers", "prepareCheckout", "confirmTransaction", "getOrderStatus"],
    note: "Elevated latency on Skyscanner API — fallback active",
  },
  {
    category: "Transportation",
    emoji: "🚗",
    status: "operational",
    latency: "131ms",
    uptime: "99.96%",
    providers: ["Uber", "Bolt", "Enterprise", "Hertz", "National Rail"],
    ops: ["search", "getDetails", "getAvailability", "getPrice", "getOffers", "createCart", "prepareCheckout", "confirmTransaction", "getOrderStatus", "cancelOrRefund"],
  },
  {
    category: "Appointments & Services",
    emoji: "📅",
    status: "operational",
    latency: "89ms",
    uptime: "99.99%",
    providers: ["Fresha", "Treatwell", "Doctify", "Calendly", "SimplyBook"],
    ops: ["search", "getDetails", "getAvailability", "prepareCheckout", "confirmTransaction", "getOrderStatus", "cancelOrRefund"],
  },
  {
    category: "Events & Tickets",
    emoji: "🎟️",
    status: "operational",
    latency: "177ms",
    uptime: "99.82%",
    providers: ["Ticketmaster", "Eventbrite", "StubHub", "AXS", "See Tickets"],
    ops: ["search", "getDetails", "getAvailability", "getPrice", "getOffers", "prepareCheckout", "confirmTransaction", "getOrderStatus"],
  },
  {
    category: "Payments & Billing",
    emoji: "💳",
    status: "operational",
    latency: "54ms",
    uptime: "99.999%",
    providers: ["Stripe", "Apple Pay", "Google Pay", "PayPal", "Open Banking"],
    ops: ["getPrice", "prepareCheckout", "confirmTransaction", "getOrderStatus", "cancelOrRefund"],
  },
  {
    category: "NFC & EasyTap Go",
    emoji: "📡",
    status: "operational",
    latency: "61ms",
    uptime: "99.98%",
    providers: ["EasyTap Go SDK", "NFC session gateway"],
    ops: ["getDetails", "getAvailability", "getPrice", "createCart", "prepareCheckout", "confirmTransaction"],
  },
];

const OPS_SHORT = ["search", "getDetails", "getAvail.", "getPrice", "getOffers", "createCart", "checkout", "confirm", "orderStatus", "cancel"];
const OPS_FULL = ["search", "getDetails", "getAvailability", "getPrice", "getOffers", "createCart", "prepareCheckout", "confirmTransaction", "getOrderStatus", "cancelOrRefund"];

function StatusBadge({ status }) {
  if (status === "operational") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
        Operational
      </span>
    );
  }
  if (status === "degraded") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/15 text-yellow-400 border border-yellow-500/20">
        <AlertIcon className="w-3 h-3" aria-hidden="true" />
        Degraded
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/15 text-red-400 border border-red-500/20">
      <span className="w-1.5 h-1.5 rounded-full bg-red-400" aria-hidden="true" />
      Outage
    </span>
  );
}

export default function Providers() {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("all");

  const filtered = PROVIDERS.filter(p =>
    filter === "all" ? true : p.status === filter
  );

  const operational = PROVIDERS.filter(p => p.status === "operational").length;
  const degraded = PROVIDERS.filter(p => p.status === "degraded").length;

  return (
    <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 text-xs font-medium text-violet-300 mb-6">
            <ZapIcon className="w-3.5 h-3.5" aria-hidden="true" />
            Provider Gateway
          </div>
          <h1 className="font-display font-800 text-5xl sm:text-6xl text-navy mb-4 leading-tight">
            Universal provider<br />
            <span className="gradient-text">connectivity</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Mio connects to verified providers across all 10 service categories through a unified gateway — with health monitoring, rate-limit policies, and graceful fallback.
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total providers", value: "40+", sub: "across all categories", icon: <ZapIcon className="w-4 h-4" aria-hidden="true" /> },
            { label: "Operational", value: operational, sub: "of 10 categories", icon: <CheckIcon className="w-4 h-4" aria-hidden="true" />, color: "text-green-400" },
            { label: "Degraded", value: degraded, sub: "with active fallback", icon: <AlertIcon className="w-4 h-4" aria-hidden="true" />, color: "text-yellow-400" },
            { label: "Avg uptime", value: "99.87%", sub: "last 30 days", icon: <ClockIcon className="w-4 h-4" aria-hidden="true" /> },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-border shadow-sm rounded-2xl p-5 border border-white/10">
              <div className={`mb-2 ${s.color || "text-violet-400"}`}>{s.icon}</div>
              <div className={`font-display font-800 text-2xl text-navy mb-0.5 ${s.color || ""}`}>{s.value}</div>
              <div className="text-gray-500 text-xs">{s.label}</div>
              <div className="text-navy/35 text-[10px] mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {["all", "operational", "degraded"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all border capitalize ${
                filter === f
                  ? "gradient-bg text-navy border-transparent"
                  : "bg-white border border-border shadow-sm border-white/10 text-gray-500 hover:text-navy"
              }`}
            >
              {f === "all" ? "All categories" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-gray-400 text-xs">
            <RefreshIcon className="w-3.5 h-3.5" aria-hidden="true" />
            Updated live
          </div>
        </div>

        {/* Provider cards */}
        <div className="space-y-3 mb-16">
          {filtered.map((p, i) => (
            <div key={p.category} className={`bg-white border border-border shadow-sm rounded-2xl border transition-all ${expanded === i ? "border-violet-500/30" : "border-white/10 hover:border-white/20"}`}>
              {/* Row header */}
              <button
                className="w-full flex items-center gap-4 p-5 text-left"
                onClick={() => setExpanded(expanded === i ? null : i)}
                aria-expanded={expanded === i}
              >
                <span className="text-2xl shrink-0" aria-hidden="true">{p.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-navy text-sm">{p.category}</div>
                  <div className="text-navy/45 text-xs mt-0.5 truncate">
                    {p.providers.slice(0, 3).join(", ")}{p.providers.length > 3 ? ` +${p.providers.length - 3} more` : ""}
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <div className="text-gray-700 text-xs font-medium">{p.latency}</div>
                    <div className="text-gray-400 text-[10px]">latency</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 text-xs font-medium">{p.uptime}</div>
                    <div className="text-gray-400 text-[10px]">uptime</div>
                  </div>
                </div>
                <StatusBadge status={p.status} />
                <span className="text-navy/30 text-xs ml-2">{expanded === i ? "▲" : "▼"}</span>
              </button>

              {/* Expanded detail */}
              {expanded === i && (
                <div className="border-t border-white/10 p-5">
                  {p.note && (
                    <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-4 py-2.5 mb-5 text-xs text-yellow-300">
                      <AlertIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
                      {p.note}
                    </div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Connected providers</h3>
                      <div className="flex flex-wrap gap-2">
                        {p.providers.map((pv) => (
                          <span key={pv} className="bg-white border border-border shadow-sm px-2.5 py-1 rounded-lg text-xs text-gray-600 border border-white/10">
                            {pv}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">Supported operations</h3>
                      <div className="grid grid-cols-2 gap-1.5">
                        {OPS_FULL.map((op, oi) => {
                          const supported = p.ops.includes(op);
                          return (
                            <div key={op} className={`flex items-center gap-1.5 text-xs ${supported ? "text-gray-600" : "text-navy/25"}`}>
                              {supported
                                ? <CheckIcon className="w-3 h-3 text-green-400 shrink-0" aria-hidden="true" />
                                : <span className="w-3 h-3 flex items-center justify-center text-navy/20 shrink-0" aria-hidden="true">–</span>
                              }
                              {OPS_SHORT[oi]}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Architecture note */}
        <div className="bg-white border border-border shadow-sm rounded-3xl p-10 border border-white/10 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <ShieldIcon className="w-6 h-6 text-violet-400" aria-hidden="true" />
            <h2 className="font-display font-700 text-navy text-xl">Gateway architecture</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Sandbox & production", desc: "Every provider has a full sandbox mode. No live charges happen during testing — ever." },
              { title: "Health monitoring", desc: "Latency, error rates, and availability are checked continuously. Degraded providers trigger automatic fallback." },
              { title: "No unauthorised scraping", desc: "Mio only connects to providers through their official APIs or verified partnership agreements." },
            ].map((n) => (
              <div key={n.title} className="bg-white border border-border shadow-sm rounded-xl p-5 border border-white/5">
                <h3 className="font-semibold text-navy text-sm mb-2">{n.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/developers"
            className="inline-flex items-center gap-2 gradient-bg text-navy font-semibold px-10 py-4 rounded-xl hover:opacity-90 transition-all shadow-xl glow-violet text-lg"
          >
            View Developer Docs
            <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </main>
  );
}
