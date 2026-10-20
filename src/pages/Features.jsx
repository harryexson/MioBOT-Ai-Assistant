import { Link, useSearchParams } from "react-router";
import { ArrowRight as ArrowRightIcon } from "lucide-react";
import { CheckCircle as CheckIcon } from "lucide-react";
import { Mic as MicIcon } from "lucide-react";
import { Search as SearchIcon } from "lucide-react";
import { ShieldCheck as ShieldIcon } from "lucide-react";
import { Zap as ZapIcon } from "lucide-react";
import { Wifi as WifiIcon } from "lucide-react";
import { BarChart2 as BarChartIcon } from "lucide-react";

import { SERVICE_MODULES } from "../data/services";

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
  const [params, setParams] = useSearchParams();
  const activeModule = Math.max(0, SERVICE_MODULES.findIndex(item => item.id === params.get("module")));
  const setActiveModule = index => setParams({ module: SERVICE_MODULES[index].id }, { preventScrollReset: true });
  const mod = SERVICE_MODULES[activeModule];

  return (
    <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 text-xs font-medium text-violet-300 mb-6">
            ✨ Mio’s Product Concept
          </div>
          <h1 className="font-display font-800 text-5xl sm:text-6xl text-navy mb-4 leading-tight">
            10 service modules.<br />
            <span className="gradient-text">One conversation.</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Explore the everyday services Mio is designed to bring together. This preview uses sample results; live AI, provider connections, and transactions are still in development.
          </p>
        </div>

        {/* 10 service modules — tabbed */}
        <section className="mb-24">
          <h2 className="font-display font-700 text-2xl text-navy mb-6">Service modules</h2>
          <p className="mb-6 rounded-xl border border-violet-500/20 bg-violet-500/5 px-4 py-3 text-sm text-gray-600">
            These are planned capabilities. This preview does not connect to service providers, check live availability, or complete transactions.
          </p>
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
                  <span className="text-xl" aria-hidden="true">{m.emoji}</span>
                  <span className="text-sm font-medium">{m.title}</span>
                </button>
              ))}
            </nav>

            {/* Module detail */}
            <div className={`bg-white border border-border shadow-sm rounded-2xl p-8 border ${mod.badge.includes("violet") ? "border-violet-500/25" : mod.badge.includes("orange") ? "border-orange-500/25" : mod.badge.includes("green") ? "border-green-500/25" : mod.badge.includes("blue") ? "border-blue-500/25" : mod.badge.includes("sky") ? "border-sky-500/25" : mod.badge.includes("teal") ? "border-teal-500/25" : mod.badge.includes("pink") ? "border-pink-500/25" : mod.badge.includes("yellow") ? "border-yellow-500/25" : mod.badge.includes("indigo") ? "border-indigo-500/25" : "border-red-500/25"}`}>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border mb-6 ${mod.badge}`}>
                <span aria-hidden="true">{mod.emoji}</span>
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
            Mio is designed around a shared intelligence layer that could carry preferences and context between services. Live AI and account memory are not connected in this preview.
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
            <h2 className="font-display font-700 text-navy text-xl mb-2">Explore the integration directory</h2>
            <p className="text-gray-500 text-sm">Browse prospective partners, categories, and illustrative commission ranges. Provider APIs are not connected in this preview.</p>
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
