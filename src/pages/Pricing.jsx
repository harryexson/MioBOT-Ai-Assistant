import { Link } from "react-router";
import CheckIcon from "icon:check-circle";
import ArrowRightIcon from "icon:arrow-right";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "For personal use. No card required.",
    cta: "Get Started",
    ctaLink: "/onboarding",
    featured: false,
    features: [
      "50 AI requests/month",
      "Shopping, food & travel search",
      "1 saved payment method",
      "Standard response speed",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    desc: "For power users who want it all.",
    cta: "Start Free Trial",
    ctaLink: "/onboarding",
    featured: true,
    badge: "Most Popular",
    features: [
      "Unlimited AI requests",
      "All service categories",
      "Voice-first mode",
      "NFC in-store access",
      "5 saved payment methods",
      "Priority response speed",
      "Email support",
    ],
  },
  {
    name: "Business",
    price: "$49",
    period: "per month",
    desc: "For merchants and businesses on Mio.",
    cta: "Add Your Business",
    ctaLink: "/onboarding",
    featured: false,
    features: [
      "Everything in Pro",
      "Merchant dashboard",
      "Menu & catalog management",
      "NFC tag configuration",
      "Analytics & reporting",
      "Dedicated account manager",
      "API & SDK access",
    ],
  },
];

export default function Pricing() {
  return (
    <main className="min-h-screen pt-28 pb-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-900/15 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display font-800 text-5xl sm:text-6xl text-white mb-4 leading-tight">
            Simple, <span className="gradient-text">honest pricing.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Start free. Upgrade when you're ready. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 flex flex-col ${
                plan.featured
                  ? "gradient-bg shadow-2xl glow-violet"
                  : "glass"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-violet-700 text-xs font-semibold px-4 py-1 rounded-full shadow-sm whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <p className={`font-display font-700 text-lg mb-1 ${plan.featured ? "text-white" : "text-white/80"}`}>{plan.name}</p>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`font-display font-800 text-5xl ${plan.featured ? "text-white" : "text-white"}`}>{plan.price}</span>
                  <span className={`text-sm pb-2 ${plan.featured ? "text-white/80" : "text-white/50"}`}>/{plan.period}</span>
                </div>
                <p className={`text-sm ${plan.featured ? "text-white/80" : "text-white/55"}`}>{plan.desc}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckIcon
                      className={`w-4 h-4 shrink-0 mt-0.5 ${plan.featured ? "text-white/90" : "text-violet-soft"}`}
                      aria-hidden="true"
                    />
                    <span className={`text-sm ${plan.featured ? "text-white/90" : "text-white/70"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.ctaLink}
                className={`flex items-center justify-center gap-2 font-semibold py-3.5 rounded-xl transition-all ${
                  plan.featured
                    ? "bg-white text-violet-700 hover:bg-white/90"
                    : "gradient-bg text-white hover:opacity-90"
                }`}
              >
                {plan.cta}
                <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>

        <p className="text-white/65 text-sm text-center mt-10">
          All plans include a 14-day money-back guarantee. Cancel anytime.
        </p>
      </div>
    </main>
  );
}
