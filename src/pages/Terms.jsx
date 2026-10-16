import { Link } from "react-router";

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    body: `By accessing or using Mio (the "Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use Mio.

Mio is currently in early access (beta). Features may change, and some parts of the Service are still in development. We will do our best to communicate significant changes in advance.`,
  },
  {
    title: "Use of the Service",
    body: `You may use Mio for lawful personal or business purposes only. You agree not to:

• Use Mio to engage in fraudulent, illegal, or harmful activity.
• Attempt to reverse-engineer, scrape, or disrupt any part of the platform.
• Impersonate another person or misrepresent your identity.
• Use automated tools to access the Service without our written permission.

We reserve the right to suspend or terminate accounts that violate these terms. We will act reasonably and give notice where possible.`,
  },
  {
    title: "Subscriptions and Payments",
    body: `Mio offers a free tier and paid subscription plans. Paid plans are billed monthly or annually, as selected at checkout. By subscribing, you authorise us to charge your payment method on a recurring basis.

You may cancel your subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period — you will not be charged again, and you retain access until the period ends.

We offer a 14-day money-back guarantee on all paid plans. If you are unsatisfied for any reason within the first 14 days, contact us and we will issue a full refund.

Prices may change over time. We will give you at least 30 days' notice before changing the price of an active subscription.`,
  },
  {
    title: "Third-Party Services",
    body: `Mio acts as a connection layer between you and third-party providers (restaurants, retailers, travel companies, and others). When you place an order or make a booking through Mio, the transaction is ultimately fulfilled by that provider.

Mio is not responsible for the quality, accuracy, safety, or legality of services provided by third parties. Disputes about a specific order or booking should first be directed to the relevant provider. If you are unable to resolve the issue directly, contact our support team and we will assist where we can.`,
  },
  {
    title: "Disclaimer of Warranties",
    body: `Mio is provided "as is" and "as available". Because this is an early-access product, the Service may occasionally be unavailable, slow, or contain bugs.

We make no warranties — express or implied — about the reliability, accuracy, or fitness of the Service for a particular purpose. We will work hard to keep things running well, but we cannot guarantee uninterrupted availability.`,
  },
  {
    title: "Limitation of Liability",
    body: `To the fullest extent permitted by law, Mio and its team will not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.

Our total liability to you for any claim arising from use of the Service will not exceed the amount you paid us in the 12 months preceding the claim, or $100 — whichever is greater.

Nothing in these terms limits our liability for fraud, death, or personal injury caused by our negligence.`,
  },
  {
    title: "Changes to These Terms",
    body: `We may update these Terms from time to time. When we do, we will update the "last updated" date at the top of this page and, for material changes, notify you by email or in-app notice. Your continued use of Mio after changes take effect constitutes your acceptance of the revised Terms.

If you disagree with a change, you may cancel your account before the change takes effect.`,
  },
  {
    title: "Contact",
    body: `Questions about these Terms? We're happy to clarify.

Email: legal@mio.ai

We aim to respond to all enquiries within 5 business days.`,
  },
];

export default function Terms() {
  return (
    <main style={{ minHeight: "100vh", paddingTop: 96, paddingBottom: 80, background: "#ffffff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <span style={{ display: "inline-block", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 50, marginBottom: 20 }}>
            Early Access · Beta
          </span>
          <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "#0f1035", margin: "0 0 12px", lineHeight: 1.1 }}>
            Terms of Service
          </h1>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", color: "#6b7280", fontSize: 15, margin: 0 }}>
            Last updated: October 2026
          </p>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", color: "#374151", fontSize: 16, lineHeight: 1.7, marginTop: 20 }}>
            These terms govern your use of the Mio platform. We've written them to be readable — not as a legal wall of text. If anything is unclear, please reach out.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#ede9fe", marginBottom: 48 }} />

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {SECTIONS.map((s, i) => (
            <section key={s.title}>
              <h2 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 20, color: "#0f1035", margin: "0 0 12px" }}>
                {i + 1}. {s.title}
              </h2>
              {s.body.split("\n\n").map((para, j) => (
                <p key={j} style={{ fontFamily: "Space Grotesk, sans-serif", color: "#374151", fontSize: 15, lineHeight: 1.75, margin: "0 0 12px", whiteSpace: "pre-line" }}>
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#ede9fe", margin: "48px 0 32px" }} />

        {/* Footer nav */}
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
          <Link to="/" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 14, color: "#7c3aed", textDecoration: "none", fontWeight: 600 }}>
            ← Back to home
          </Link>
          <Link to="/privacy" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 14, color: "#6b7280", textDecoration: "none" }}>
            Privacy Policy
          </Link>
          <a href="mailto:legal@mio.ai" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 14, color: "#6b7280", textDecoration: "none" }}>
            legal@mio.ai
          </a>
        </div>
      </div>
    </main>
  );
}
