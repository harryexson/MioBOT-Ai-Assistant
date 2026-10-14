import { Link } from "react-router";
import ArrowRightIcon from "icon:arrow-right";
import CheckIcon from "icon:check-circle";

const FEATURES = [
  {
    icon: "🗣️",
    title: "Natural Voice Conversations",
    desc: "Speak naturally, exactly as you would to a person. Mio understands intent, asks clarifying questions, and handles complex multi-step requests.",
    points: ["Configurable voice persona", "Multi-turn context memory", "Handles ambiguous requests gracefully"],
  },
  {
    icon: "🔍",
    title: "Multi-Provider Search",
    desc: "Mio searches across dozens of approved providers simultaneously — comparing prices, availability, ratings, and delivery times in one breath.",
    points: ["Real-time price comparison", "Verified availability only", "Ranked by relevance to your preferences"],
  },
  {
    icon: "🛡️",
    title: "Confirmation Before Action",
    desc: "Mio never makes a purchase, booking, or reservation without your explicit confirmation. No surprises — ever.",
    points: ["Explicit approval required", "Full order summary shown first", "Instant cancellation if you change your mind"],
  },
  {
    icon: "💳",
    title: "Payments & Billing",
    desc: "Pay bills, split costs, send money, or check out — all inside the same conversation, secured end-to-end.",
    points: ["Card, Apple Pay, Google Pay", "Secure tokenisation", "Real-time receipts"],
  },
  {
    icon: "📡",
    title: "NFC In-Store",
    desc: "Tap an NFC tag at any partnered venue to open the full menu, customise your order, and pay — without a queue.",
    points: ["Works at restaurants, shops, events", "Custom order via voice or chat", "Tap-to-pay with saved wallet"],
  },
  {
    icon: "🏢",
    title: "Business Dashboard",
    desc: "A full merchant console — orders, revenue, customers, analytics, and catalog management — all in one place.",
    points: ["Real-time order management", "Menu & catalog editor", "Revenue analytics and insights"],
  },
];

export default function Features() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 glass-light rounded-full px-4 py-1.5 text-xs font-medium text-violet-soft mb-6">
            ✨ What Mio Can Do
          </div>
          <h1 className="font-display font-800 text-5xl sm:text-6xl text-white mb-4 leading-tight">
            Every feature.<br />
            <span className="gradient-text">One conversation.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Mio is the only assistant that handles every aspect of daily life — from finding the best deal to confirming your booking.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {FEATURES.map((f) => (
            <div key={f.title} className="glass rounded-2xl p-7 hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h2 className="font-display font-700 text-white text-lg mb-2">{f.title}</h2>
              <p className="text-white/55 text-sm leading-relaxed mb-4">{f.desc}</p>
              <ul className="space-y-2">
                {f.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-violet-soft shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-white/65 text-xs">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/onboarding"
            className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-all shadow-xl glow-violet text-lg"
          >
            Get Mio Free
            <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
}
