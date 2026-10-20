import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight as ArrowRightIcon } from "lucide-react";
import { CheckCircle as CheckIcon } from "lucide-react";
import { Zap as ZapIcon } from "lucide-react";
import { ShieldCheck as ShieldIcon } from "lucide-react";
import { Smartphone as SmartphoneIcon } from "lucide-react";
import { Wifi as WifiIcon } from "lucide-react";
import { Store as StoreIcon } from "lucide-react";
import { Utensils as UtensilsIcon } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import { CreditCard as CreditCardIcon } from "lucide-react";

const SCENARIOS = [
  {
    icon: <UtensilsIcon className="w-6 h-6" aria-hidden="true" />,
    emoji: "🍔",
    title: "Restaurant Ordering",
    desc: "Customer taps the NFC tag at the table. Mio opens the full menu with their dietary preferences already applied. They order by voice, confirm, and pay — all without waiting for a server.",
    steps: ["Tap NFC tag at table", "Mio loads menu with preferences", "Order by voice or chat", "Confirm and pay instantly"],
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30",
    badge: "bg-orange-500/20 text-orange-300",
  },
  {
    icon: <StoreIcon className="w-6 h-6" aria-hidden="true" />,
    emoji: "🛍️",
    title: "Retail Shopping",
    desc: "Tap a product tag to see full specs, reviews, similar items, and pricing across providers. Add to cart, checkout, or choose in-store pickup — all within the Mio assistant.",
    steps: ["Tap product or shelf tag", "Full product details and comparisons", "Add to cart or buy now", "In-store or home delivery"],
    color: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/30",
    badge: "bg-violet-500/20 text-violet-300",
  },
  {
    icon: <CalendarIcon className="w-6 h-6" aria-hidden="true" />,
    emoji: "📅",
    title: "Service Booking",
    desc: "At a salon, gym, or clinic — tap to view availability and book on the spot. Mio checks the live calendar, confirms the slot, and adds it to your schedule.",
    steps: ["Tap tag at service location", "Real-time availability shown", "Book the slot by voice", "Confirmation and calendar sync"],
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    badge: "bg-blue-500/20 text-blue-300",
  },
  {
    icon: <CreditCardIcon className="w-6 h-6" aria-hidden="true" />,
    emoji: "💳",
    title: "Payments Only",
    desc: "For quick tap-to-pay at any EasyTap Go terminal. Mio handles the transaction with your saved wallet, shows the receipt instantly, and logs it to your payment history.",
    steps: ["Tap EasyTap Go terminal", "Saved payment method selected", "Explicit confirmation prompt", "Receipt saved to history"],
    color: "from-green-500/20 to-teal-500/20",
    border: "border-green-500/30",
    badge: "bg-green-500/20 text-green-300",
  },
];

const SECURITY = [
  { title: "Signed session tokens", desc: "Every NFC tap generates a short-lived, signed session token — it expires in minutes and cannot be reused." },
  { title: "No secrets in tags", desc: "NFC tags contain only a public session ID. No payment data, merchant keys, or credentials are ever stored in or exposed by the tag." },
  { title: "Explicit confirmation", desc: "Mio always shows the full order and price before any transaction is finalised. No tap ever charges without your say-so." },
  { title: "Merchant isolation", desc: "Each venue's NFC session is isolated — one merchant cannot access another's data, inventory, or customer sessions." },
];

const SDK_STEPS = [
  { step: "01", title: "Register your venue", desc: "Add your business in the Merchant Dashboard and generate your EasyTap Go integration key." },
  { step: "02", title: "Tag your space", desc: "Order pre-programmed NFC tags from us, or use the SDK to write your own with any compatible NFC writer." },
  { step: "03", title: "Configure Mio context", desc: "Tell Mio what to show when a customer taps: your menu, service catalog, product list, or payment terminal." },
  { step: "04", title: "Test, then go live", desc: "Use the sandbox mode to test every tap interaction before enabling live transactions for real customers." },
];

export default function EasyTapGo() {
  const [activeScenario, setActiveScenario] = useState(0);

  return (
    <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 text-xs font-medium text-violet-300 mb-6">
            <WifiIcon className="w-3.5 h-3.5" aria-hidden="true" />
            EasyTap Go · Concept flow
          </div>
          <h1 className="font-display font-800 text-5xl sm:text-6xl text-navy mb-6 leading-tight">
            One tap.<br />
            <span className="gradient-text">The whole experience.</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-10">
            Explore how a venue’s NFC tag could open a contextual Mio experience for ordering, booking, shopping, or paying. NFC hardware and live checkout are not connected in this preview.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/merchant"
              className="inline-flex items-center justify-center gap-2 gradient-bg text-navy font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-xl glow-violet"
            >
              Set Up for Your Business
              <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
            </Link>
            <Link
              to="/developers"
              className="inline-flex items-center justify-center gap-2 bg-white border border-border shadow-sm text-navy font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all border border-white/10"
            >
              Developer Docs
            </Link>
          </div>
        </div>

        {/* Visual tap demo */}
        <div className="relative flex justify-center mb-24">
          <div className="relative w-64 h-64">
            {/* Ripple rings */}
            <div className="absolute inset-0 rounded-full border-2 border-violet-500/30 animate-ping" style={{ animationDuration: "2s" }} aria-hidden="true" />
            <div className="absolute inset-4 rounded-full border-2 border-violet-400/20 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.4s" }} aria-hidden="true" />
            <div className="absolute inset-8 rounded-full border-2 border-violet-300/15 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.8s" }} aria-hidden="true" />
            {/* Center icon */}
            <div className="absolute inset-16 gradient-bg rounded-full flex items-center justify-center shadow-2xl glow-violet">
              <WifiIcon className="w-10 h-10 text-navy" aria-hidden="true" />
            </div>
          </div>
          {/* Floating context cards */}
          <div className="absolute top-4 -left-4 md:left-0 bg-white border border-border shadow-sm rounded-xl px-3 py-2 text-xs text-navy animate-float hidden sm:block">
            <span className="text-violet-300 font-semibold">Menu loaded</span> · Table 7
          </div>
          <div className="absolute bottom-8 -right-4 md:right-0 bg-white border border-border shadow-sm rounded-xl px-3 py-2 text-xs text-navy animate-float-delay hidden sm:block">
            <span className="text-green-400 font-semibold">Payment confirmed</span> · £12.50
          </div>
          <div className="absolute top-20 -right-8 md:right-4 bg-white border border-border shadow-sm rounded-xl px-3 py-2 text-xs text-navy animate-float hidden sm:block" style={{ animationDelay: "0.7s" }}>
            📍 The Kensington Grill
          </div>
        </div>

        {/* Scenarios */}
        <section className="mb-24">
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-navy text-center mb-4">
            What a tap can do
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            Configure each tag for the exact experience your venue needs — Mio handles the rest.
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {SCENARIOS.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setActiveScenario(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                  activeScenario === i
                    ? "gradient-bg text-navy border-transparent glow-violet"
                    : "bg-white border border-border shadow-sm border-white/10 text-gray-500 hover:text-navy hover:bg-white/10"
                }`}
              >
                {s.emoji} {s.title}
              </button>
            ))}
          </div>

          {/* Active scenario card */}
          {SCENARIOS.map((s, i) =>
            i === activeScenario ? (
              <div key={s.title} className={`bg-white border border-border shadow-sm rounded-2xl p-8 border ${s.border} bg-gradient-to-br ${s.color} max-w-3xl mx-auto`}>
                <div className="flex items-start gap-6 mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 ${s.badge} border ${s.border}`}>
                    {s.emoji}
                  </div>
                  <div>
                    <h3 className="font-display font-700 text-navy text-xl mb-2">{s.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {s.steps.map((step, si) => (
                    <div key={step} className="bg-white border border-border shadow-sm rounded-xl p-3 text-center">
                      <div className={`text-xs font-semibold mb-1.5 ${s.badge.split(" ")[1]}`}>Step {si + 1}</div>
                      <p className="text-navy text-xs leading-snug">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </section>

        {/* Security */}
        <section className="mb-24">
          <div className="bg-white border border-border shadow-sm rounded-3xl p-10 border border-white/10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
                <ShieldIcon className="w-5 h-5 text-navy" aria-hidden="true" />
              </div>
              <h2 className="font-display font-700 text-navy text-2xl">Security by design</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SECURITY.map((s) => (
                <div key={s.title} className="bg-white border border-border shadow-sm rounded-xl p-5 border border-white/5">
                  <CheckIcon className="w-5 h-5 text-violet-400 mb-3" aria-hidden="true" />
                  <h3 className="font-semibold text-navy text-sm mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-gray-500 text-xs text-center">
              Mio and EasyTap Go are independent systems. The integration is optional — Mio works fully without any NFC hardware.
            </p>
          </div>
        </section>

        {/* SDK setup steps */}
        <section className="mb-24">
          <h2 className="font-display font-800 text-3xl sm:text-4xl text-navy text-center mb-4">
            Set up in four steps
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-lg mx-auto">
            No specialist hardware required — if you have an NFC-capable phone, you can programme your first tag right now.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SDK_STEPS.map((s) => (
              <div key={s.step} className="bg-white border border-border shadow-sm rounded-2xl p-6 border border-white/10 relative overflow-hidden group hover:bg-white/8 transition-all">
                <div className="absolute -top-4 -right-4 text-8xl font-display font-800 text-navy/3 group-hover:text-navy/5 transition-all">
                  {s.step}
                </div>
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center text-navy text-xs font-bold mb-4">
                  {s.step}
                </div>
                <h3 className="font-display font-700 text-navy mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Independence note */}
        <div className="bg-white border border-border shadow-sm rounded-2xl p-8 border border-violet-500/20 text-center mb-16">
          <ZapIcon className="w-8 h-8 text-violet-400 mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-display font-700 text-navy text-xl mb-3">Mio works without EasyTap Go</h2>
          <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            EasyTap Go is an optional enhancement — not a dependency. Every Mio feature is fully accessible through the app, web interface, or embedded widget. The NFC integration simply adds a physical trigger for those who want it.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/merchant"
            className="inline-flex items-center gap-2 gradient-bg text-navy font-semibold px-10 py-4 rounded-xl hover:opacity-90 transition-all shadow-xl glow-violet text-lg"
          >
            Enable EasyTap Go for your business
            <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </main>
  );
}
