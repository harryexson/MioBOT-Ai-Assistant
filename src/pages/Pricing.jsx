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
    <main style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 80, background: "#ffffff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(32px,5vw,54px)", color: "#0f1035", margin: "0 0 12px", lineHeight: 1.1 }}>
            Simple, <span className="gradient-text">honest pricing.</span>
          </h1>
          <p style={{ color: "#6b7280", fontSize: 17, maxWidth: 480, margin: "0 auto" }}>
            Start free. Upgrade when you're ready. No hidden fees, no surprises.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              style={{
                position: "relative",
                borderRadius: 24,
                padding: 32,
                display: "flex",
                flexDirection: "column",
                background: plan.featured ? "linear-gradient(135deg,#7c3aed,#4f46e5)" : "#ffffff",
                border: plan.featured ? "none" : "1.5px solid #ede9fe",
                boxShadow: plan.featured ? "0 24px 60px rgba(124,58,237,0.28)" : "0 2px 16px rgba(124,58,237,0.06)",
              }}
            >
              {plan.badge && (
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#fff", color: "#7c3aed", fontSize: 11, fontWeight: 700, padding: "5px 16px", borderRadius: 50, boxShadow: "0 2px 8px rgba(124,58,237,0.15)", whiteSpace: "nowrap" }}>
                  {plan.badge}
                </div>
              )}

              <div style={{ marginBottom: 24 }}>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 4, color: plan.featured ? "#ffffff" : "#0f1035" }}>{plan.name}</p>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 52, color: plan.featured ? "#ffffff" : "#0f1035", lineHeight: 1 }}>{plan.price}</span>
                  <span style={{ fontSize: 13, paddingBottom: 10, color: plan.featured ? "rgba(255,255,255,0.75)" : "#9ca3af" }}>/{plan.period}</span>
                </div>
                <p style={{ fontSize: 13, color: plan.featured ? "rgba(255,255,255,0.8)" : "#6b7280", margin: 0 }}>{plan.desc}</p>
              </div>

              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <CheckIcon size={15} style={{ color: plan.featured ? "rgba(255,255,255,0.9)" : "#7c3aed", flexShrink: 0, marginTop: 1 }} aria-hidden="true" />
                    <span style={{ fontSize: 13, color: plan.featured ? "rgba(255,255,255,0.9)" : "#374151" }}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={plan.ctaLink}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  fontWeight: 600,
                  fontSize: 14,
                  padding: "13px 0",
                  borderRadius: 14,
                  textDecoration: "none",
                  background: plan.featured ? "#ffffff" : "linear-gradient(135deg,#7c3aed,#4f46e5)",
                  color: plan.featured ? "#7c3aed" : "#ffffff",
                  transition: "opacity 0.2s",
                }}
              >
                {plan.cta}
                <ArrowRightIcon size={15} aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>

        <p style={{ color: "#9ca3af", fontSize: 13, textAlign: "center", marginTop: 32 }}>
          All plans include a 14-day money-back guarantee. Cancel anytime.
        </p>
      </div>
    </main>
  );
}
