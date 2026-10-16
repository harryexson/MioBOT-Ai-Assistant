import { useState } from "react";
import { IconShopping,IconFood,IconTravel,IconServices,IconPayments,IconEvents,IconNFC,IconInvoicing,IconMore } from '../components/MioIcons.jsx';
import { Link } from "react-router";
import ArrowRightIcon from "icon:arrow-right";
import CheckIcon from "icon:check-circle";
import MicIcon from "icon:mic";
import SearchIcon from "icon:search";
import ShieldIcon from "icon:shield-check";
import ZapIcon from "icon:zap";
import WifiIcon from "icon:wifi";
import BarChartIcon from "icon:bar-chart-2";

const SERVICE_MODULES = [
  {
    id: "shopping",
    iconEl: <IconShopping size={22} color="#d97706" />,
    title: "Retail Shopping",
    desc: "Find and buy anything across dozens of verified retailers — comparing price, availability, specs, shipping, and offers in a single conversation.",
    points: [
      "Real-time multi-provider price comparison",
      "Product specs, reviews, and delivery estimates",
      "Cart management across multiple merchants",
      "Order tracking and cancellation where supported",
    ],
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  },
  {
    id: "food",
    iconEl: <IconFood size={22} color="#b45309" />,
    title: "Restaurants & Food",
    desc: "Order delivery, pickup, or reserve a table — by voice or chat. Mio knows your preferences and never confirms an order without showing you the total first.",
    points: [
      "Live menu browsing and customisation",
      "Dietary preference memory and filtering",
      "Delivery and pickup scheduling",
      "Table reservations via OpenTable, Resy and partners",
    ],
    badge: "bg-orange-500/15 text-orange-300 border-orange-500/25",
  },
  {
    id: "groceries",
    iconEl: <IconFood size={22} color="#059669" />,
    title: "Groceries",
    desc: "Shop your weekly groceries from verified supermarket partners. Mio checks freshness, price per unit, and delivery slots before you commit.",
    points: [
      "Multi-supermarket basket comparison",
      "Recurring order suggestions based on history",
      "Delivery slot availability in real time",
      "Substitution preferences saved automatically",
    ],
    badge: "bg-green-500/15 text-green-300 border-green-500/25",
  },
  {
    id: "hotels",
    iconEl: <IconTravel size={22} color="#2563eb" />,
    title: "Hotels",
    desc: "Search, compare, and book hotels by voice — with verified availability, total-cost pricing, and instant confirmation. No hidden fees.",
    points: [
      "Verified real-time availability",
      "Full price breakdown before confirmation",
      "Instant booking confirmation",
      "Cancellation workflows where supported",
    ],
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/25",
  },
  {
    id: "flights",
    iconEl: <IconTravel size={22} color="#2563eb" />,
    title: "Flights",
    desc: "Search across aggregators for the best combination of price, layovers, and baggage policy. Mio summarises and compares — you confirm.",
    points: [
      "Multi-aggregator live price search",
      "Layover and duration preferences",
      "Baggage and fare-class comparison",
      "Booking confirmation and e-ticket storage",
    ],
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/25",
  },
  {
    id: "transport",
    iconEl: <IconNFC size={22} color="#0891b2" />,
    title: "Transportation & Car Rental",
    desc: "Book a ride, reserve a hire car, or plan rail travel — all inside one conversation with Mio. Pricing is live and confirmed before charging.",
    points: [
      "Ride-hailing across Uber, Bolt, and partners",
      "Car rental comparison and reservation",
      "National Rail journey planning and booking",
      "Real-time estimated arrival and pricing",
    ],
    badge: "bg-teal-500/15 text-teal-300 border-teal-500/25",
  },
  {
    id: "appointments",
    iconEl: <IconServices size={22} color="#059669" />,
    title: "Appointments & Professional Services",
    desc: "Book salons, clinics, personal trainers, or any appointment-based service. Mio checks live calendars and confirms your slot instantly.",
    points: [
      "Real-time availability from live calendars",
      "Voice or chat booking in seconds",
      "Reminders added to your schedule",
      "Easy cancellation and rescheduling",
    ],
    badge: "bg-pink-500/15 text-pink-300 border-pink-500/25",
  },
  {
    id: "events",
    iconEl: <IconEvents size={22} color="#db2777" />,
    title: "Events & Tickets",
    desc: "Find and book concerts, sports, theatre, and more across all the major ticketing platforms — with verified seating and no duplicate purchases.",
    points: [
      "Multi-platform event and ticket search",
      "Verified seat availability only",
      "Idempotent booking (no duplicate charges)",
      "E-ticket delivery and digital wallet storage",
    ],
    badge: "bg-yellow-500/15 text-yellow-300 border-yellow-500/25",
  },
  {
    id: "payments",
    iconEl: <IconPayments size={22} color="#7c3aed" />,
    title: "Payments & Transaction History",
    desc: "Pay bills, split costs, send money, or check your spending — all within Mio. Every transaction is logged, searchable, and confirmed before it happens.",
    points: [
      "Card, Apple Pay, Google Pay, and PayPal",
      "Tokenised — raw credentials never stored",
      "Full transaction history in-app",
      "Refunds and cancellations within Mio",
    ],
    badge: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
  },
  {
    id: "nfc",
    iconEl: <IconNFC size={22} color="#0891b2" />,
    title: "NFC & EasyTap Go",
    desc: "Tap an NFC tag at any partnered venue to open a full, contextual Mio session — menu, booking, or payment — without waiting in a queue.",
    points: [
      "Works at restaurants, shops, events, and clinics",
      "Signed, expiring session tokens — nothing stored in tags",
      "Full menu or catalog loaded by tap",
      "Confirm and pay without leaving the Mio experience",
    ],
    badge: "bg-red-500/15 text-red-300 border-red-500/25",
  },
];

const CORE_FEATURES = [
  {
    icon: <MicIcon className="w-6 h-6" aria-hidden="true" />,
    title: "Natural Voice Conversations",
    desc: "Speak as you would to a person. Mio understands intent, asks clarifying questions, and handles complex multi-step requests across any service.",
  },
  {
    icon: <SearchIcon className="w-6 h-6" aria-hidden="true" />,
    title: "Multi-Provider Intelligence",
    desc: "One question, dozens of providers checked simultaneously — comparing price, availability, ratings, and delivery times in real time.",
  },
  {
    icon: <ShieldIcon className="w-6 h-6" aria-hidden="true" />,
    title: "Explicit Confirmation Always",
    desc: "Mio never makes a purchase, booking, or reservation without your explicit approval. Full summary shown first — always.",
  },
  {
    icon: <ZapIcon className="w-6 h-6" aria-hidden="true" />,
    title: "Context Memory",
    desc: "Mio remembers your preferences, saved addresses, and past orders across sessions — with full consent controls to clear at any time.",
  },
  {
    icon: <WifiIcon className="w-6 h-6" aria-hidden="true" />,
    title: "Embeddable Widget",
    desc: "Drop the Mio assistant into any website or app. Customers get the full AI experience without ever leaving your page.",
  },
  {
    icon: <BarChartIcon className="w-6 h-6" aria-hidden="true" />,
    title: "Business Dashboard",
    desc: "A full merchant console — orders, revenue, customers, menus, analytics, and integrations — all in one real-time view.",
  },
];

export default function Features() {
  const [activeModule, setActiveModule] = useState(0);
  const mod = SERVICE_MODULES[activeModule];

  return (
    <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 text-xs font-medium text-violet-300 mb-6">
            What Mio Can Do
          </div>
          <h1 className="font-display font-800 text-5xl sm:text-6xl text-navy mb-4 leading-tight">
            10 service modules.<br />
            <span className="gradient-text">One conversation.</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Mio is the only assistant that handles every aspect of daily life — from finding the best deal to confirming your booking.
          </p>
        </div>

        {/* 10 service modules — tabbed */}
        <section className="mb-24">
          <h2 className="font-display font-700 text-2xl text-navy mb-6">Service modules</h2>
          <div className="grid lg:grid-cols-[280px_1fr] gap-4">
            {/* Module list */}
            <nav aria-label="Service modules" className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {SERVICE_MODULES.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => setActiveModule(i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left shrink-0 lg:shrink transition-all whitespace-nowrap lg:whitespace-normal ${
                    activeModule === i
                      ? "gradient-bg text-navy border-transparent glow-violet"
                      : "bg-white border border-border shadow-sm border-white/10 text-gray-600 hover:text-navy hover:bg-white/8"
                  }`}
                  aria-current={activeModule === i ? "true" : undefined}
                >
                  <span aria-hidden="true">{m.iconEl}</span>
                  <span className="text-sm font-medium">{m.title}</span>
                </button>
              ))}
            </nav>

            {/* Module detail */}
            <div className={`bg-white border border-border shadow-sm rounded-2xl p-8 border ${mod.badge.includes("violet") ? "border-violet-500/25" : mod.badge.includes("orange") ? "border-orange-500/25" : mod.badge.includes("green") ? "border-green-500/25" : mod.badge.includes("blue") ? "border-blue-500/25" : mod.badge.includes("sky") ? "border-sky-500/25" : mod.badge.includes("teal") ? "border-teal-500/25" : mod.badge.includes("pink") ? "border-pink-500/25" : mod.badge.includes("yellow") ? "border-yellow-500/25" : mod.badge.includes("indigo") ? "border-indigo-500/25" : "border-red-500/25"}`}>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border mb-6 ${mod.badge}`}>
                <span aria-hidden="true">{mod.iconEl}</span>
                {mod.title}
              </div>
              <h3 className="font-display font-800 text-navy text-2xl sm:text-3xl mb-4">{mod.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-xl">{mod.desc}</p>
              <ul className="space-y-3">
                {mod.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700 text-sm">{p}</span>
                  </li>
                ))}
              </ul>
              {mod.id === "nfc" && (
                <Link to="/easytap" className="inline-flex items-center gap-2 mt-8 text-violet-300 text-sm font-medium hover:text-violet-200 transition-colors">
                  Learn about EasyTap Go <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                </Link>
              )}
              {mod.id === "payments" && (
                <Link to="/checkout" className="inline-flex items-center gap-2 mt-8 text-violet-300 text-sm font-medium hover:text-violet-200 transition-colors">
                  See how checkout works <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Core AI features */}
        <section className="mb-24">
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-navy text-center mb-4">
            The Mio AI engine
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            Every service module is powered by the same centralized intelligence layer — so your preferences, context, and payment methods carry across all of them.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_FEATURES.map((f) => (
              <div key={f.title} className="bg-white border border-border shadow-sm rounded-2xl p-7 hover:bg-white/8 transition-all group border border-white/10">
                <div className="text-violet-400 mb-4 group-hover:scale-110 transition-transform w-fit">
                  {f.icon}
                </div>
                <h3 className="font-display font-700 text-navy text-base mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Provider link */}
        <div className="bg-white border border-border shadow-sm rounded-2xl p-8 border border-white/10 flex flex-col sm:flex-row items-center gap-6 mb-16">
          <div className="flex-1">
            <h2 className="font-display font-700 text-navy text-xl mb-2">See all connected providers</h2>
            <p className="text-gray-500 text-sm">Live health status, supported operations, latency, and uptime — for all 40+ providers across every category.</p>
          </div>
          <Link
            to="/providers"
            className="inline-flex items-center gap-2 gradient-bg text-navy font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all shrink-0"
          >
            Provider status <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 gradient-bg text-navy font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-xl glow-violet text-lg"
          >
            Get Mio Free
            <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </main>
  );
}
