import { Link } from "react-router";

const SECTIONS = [
  {
    title: "Information We Collect",
    body: `When you create a Mio account, we collect the name and email address you provide. If you choose to add a payment method, that information is handled directly by our payment processor — we never store raw card numbers on our systems. When you use Mio to search, book, or order, we collect the details of those interactions (search queries, order history, booking confirmations) so we can fulfil your requests and improve the experience.

We also collect standard technical information your browser or device sends automatically: IP address, browser type, and general usage patterns such as which features you use and how often. We use this to keep the service running smoothly and securely.`,
  },
  {
    title: "How We Use Your Information",
    body: `We use your information to run and improve Mio. Specifically:

• To process your requests — searches, bookings, orders, and payments.
• To personalise your experience over time, such as remembering preferences.
• To send you service-related emails (order confirmations, security alerts). We will not email you marketing content without your explicit consent.
• To detect and prevent fraud or misuse of the platform.
• To understand which features are working well and which need improvement.

We do not sell your personal information to anyone, ever.`,
  },
  {
    title: "Data Storage",
    body: `Mio is an early-access product. Your data is stored on secure cloud infrastructure with encryption at rest and in transit. We retain your account data for as long as your account is active. If you delete your account, we will remove your personal data within 30 days, except where we are required to retain certain records for legal or financial compliance purposes.

Because Mio is in beta, some features and data practices may evolve. We will update this policy and notify you of any material changes.`,
  },
  {
    title: "Third-Party Services",
    body: `Mio connects you to third-party providers — restaurants, retailers, travel operators, and others — to fulfil your requests. When you complete a transaction with one of these providers, relevant details (your name, delivery address, order) are shared with them to complete that order. Those providers have their own privacy policies.

We use trusted third-party services for payment processing, analytics, and infrastructure. These partners are contractually required to protect your data and may only use it to provide services to us.`,
  },
  {
    title: "Your Rights",
    body: `You have the right to access, correct, or delete the personal information we hold about you. You can update most information directly in your account settings. To request a full copy of your data or to delete your account entirely, contact us at privacy@mio.ai.

If you are in the European Economic Area or the United Kingdom, you have additional rights under GDPR, including the right to object to or restrict certain processing. We will respond to all requests within 30 days.`,
  },
  {
    title: "Contact Us",
    body: `Questions, concerns, or requests about your privacy? We take these seriously and will respond promptly.

Email: privacy@mio.ai

Because Mio is in early access, our team is small and hands-on. You will hear back from a real person.`,
  },
];

export default function Privacy() {
  return (
    <main style={{ minHeight: "100vh", paddingTop: 96, paddingBottom: 80, background: "#ffffff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <span style={{ display: "inline-block", background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "5px 14px", borderRadius: 50, marginBottom: 20 }}>
            Early Access · Beta
          </span>
          <h1 style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "#0f1035", margin: "0 0 12px", lineHeight: 1.1 }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", color: "#6b7280", fontSize: 15, margin: 0 }}>
            Last updated: October 2026
          </p>
          <p style={{ fontFamily: "Space Grotesk, sans-serif", color: "#374151", fontSize: 16, lineHeight: 1.7, marginTop: 20 }}>
            Mio is built on the belief that your data belongs to you. This policy explains, in plain language, what we collect, why we collect it, and how you can control it. We keep things simple — you deserve to understand exactly how your information is used.
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
          <Link to="/terms" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 14, color: "#6b7280", textDecoration: "none" }}>
            Terms of Service
          </Link>
          <a href="mailto:privacy@mio.ai" style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 14, color: "#6b7280", textDecoration: "none" }}>
            privacy@mio.ai
          </a>
        </div>
      </div>
    </main>
  );
}
