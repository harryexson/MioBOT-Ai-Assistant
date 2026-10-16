import { useState } from "react";
import { pb } from "../lib/pb.js";

// SVG icons
const IconMail = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);
const IconMapPin = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconTwitter = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IconLinkedIn = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

const TEAM = [
  { name: "Harry Exson", role: "Founder & CEO", bio: "Passionate about making AI work for everyday people. Building Mio to give everyone an intelligent assistant that actually gets things done.", initials: "HE" },
  { name: "Product Team", role: "Design & Engineering", bio: "A small, focused team obsessed with crafting experiences that feel like magic — voice-first, seamless, and built for real life.", initials: "PT" },
];

const VALUES = [
  { title: "People First", body: "Every decision starts with the person using Mio — not the technology. We build for real lives, real needs, and real moments." },
  { title: "Radical Simplicity", body: "The most powerful thing we can do is make something feel easy. Complexity stays behind the scenes, always." },
  { title: "Honest Business", body: "We earn when we help you accomplish something real. Our interests and yours are the same — that's how we've designed it." },
  { title: "Relentless Improvement", body: "Mio is early. We ship, learn, listen, and iterate fast. Every week it gets better because of feedback from people like you." },
];

export default function About() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await pb.collection("waitlist").create({
        email: form.email,
        name: form.name,
        subject: form.subject,
        message: form.message,
        type: "contact",
      });
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const s = {
    page: { minHeight: "100vh", background: "#ffffff", paddingTop: 88 },
    hero: {
      background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 40%, #ffffff 100%)",
      padding: "80px 24px 72px",
      textAlign: "center",
    },
    badge: {
      display: "inline-block", background: "#7c3aed", color: "#fff",
      fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
      padding: "4px 14px", borderRadius: 20, marginBottom: 24,
      fontFamily: "Manrope, sans-serif", textTransform: "uppercase",
    },
    heroH1: {
      fontFamily: "Manrope, sans-serif", fontWeight: 800,
      fontSize: "clamp(36px, 5vw, 64px)", letterSpacing: "-0.03em",
      color: "#0f1035", lineHeight: 1.1, margin: "0 auto 20px",
      maxWidth: 800,
    },
    heroSub: {
      fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(16px,2vw,20px)",
      color: "#4b5563", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.6,
    },
    section: { maxWidth: 1100, margin: "0 auto", padding: "72px 24px" },
    sectionH2: {
      fontFamily: "Manrope, sans-serif", fontWeight: 800,
      fontSize: "clamp(28px,3.5vw,44px)", color: "#0f1035",
      letterSpacing: "-0.03em", marginBottom: 16,
    },
    sectionSub: {
      fontFamily: "Space Grotesk, sans-serif", fontSize: 17,
      color: "#6b7280", lineHeight: 1.7, marginBottom: 48,
    },
    grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 },
    card: {
      background: "#f9fafb", border: "1px solid #e5e7eb",
      borderRadius: 16, padding: "28px 24px",
    },
    valueTitle: {
      fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 17,
      color: "#0f1035", marginBottom: 8,
    },
    valueBody: {
      fontFamily: "Space Grotesk, sans-serif", fontSize: 15, color: "#6b7280", lineHeight: 1.65,
    },
    teamCard: {
      background: "#fff", border: "1px solid #e5e7eb", borderRadius: 20,
      padding: "32px 28px", display: "flex", gap: 20, alignItems: "flex-start",
    },
    avatar: {
      width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
      background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 18, color: "#fff",
    },
    teamName: { fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 17, color: "#0f1035", marginBottom: 2 },
    teamRole: { fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "#7c3aed", fontWeight: 600, marginBottom: 10 },
    teamBio: { fontFamily: "Space Grotesk, sans-serif", fontSize: 14, color: "#6b7280", lineHeight: 1.65 },
    contactSection: {
      background: "linear-gradient(135deg, #0f1035 0%, #1e1b4b 100%)",
      padding: "80px 24px",
    },
    contactInner: { maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" },
    contactH2: {
      fontFamily: "Manrope, sans-serif", fontWeight: 800,
      fontSize: "clamp(28px,3.5vw,44px)", color: "#fff",
      letterSpacing: "-0.03em", marginBottom: 16,
    },
    contactSub: { fontFamily: "Space Grotesk, sans-serif", fontSize: 16, color: "#a5b4fc", lineHeight: 1.7, marginBottom: 36 },
    infoItem: { display: "flex", alignItems: "center", gap: 12, marginBottom: 20 },
    infoIcon: { color: "#7c3aed" },
    infoText: { fontFamily: "Space Grotesk, sans-serif", fontSize: 15, color: "#e0e7ff" },
    formCard: { background: "#fff", borderRadius: 20, padding: "36px 32px" },
    label: {
      display: "block", fontFamily: "Manrope, sans-serif", fontWeight: 600,
      fontSize: 13, color: "#374151", marginBottom: 6,
    },
    input: {
      width: "100%", padding: "11px 14px", border: "1.5px solid #e5e7eb",
      borderRadius: 10, fontFamily: "Space Grotesk, sans-serif", fontSize: 15,
      color: "#0f1035", background: "#f9fafb", outline: "none", boxSizing: "border-box",
      marginBottom: 16, transition: "border-color 0.2s",
    },
    textarea: {
      width: "100%", padding: "11px 14px", border: "1.5px solid #e5e7eb",
      borderRadius: 10, fontFamily: "Space Grotesk, sans-serif", fontSize: 15,
      color: "#0f1035", background: "#f9fafb", outline: "none", boxSizing: "border-box",
      resize: "vertical", minHeight: 120, marginBottom: 20, transition: "border-color 0.2s",
    },
    submitBtn: {
      width: "100%", padding: "13px 24px", background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
      color: "#fff", border: "none", borderRadius: 12, cursor: "pointer",
      fontFamily: "Manrope, sans-serif", fontWeight: 700, fontSize: 16,
      transition: "opacity 0.2s",
    },
    successBanner: {
      background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: 12,
      padding: "16px 20px", display: "flex", alignItems: "center", gap: 10,
      fontFamily: "Space Grotesk, sans-serif", fontSize: 15, color: "#15803d",
    },
    errorBanner: {
      background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: 12,
      padding: "16px 20px", fontFamily: "Space Grotesk, sans-serif", fontSize: 14, color: "#dc2626",
    },
    socialRow: { display: "flex", gap: 14, marginTop: 32 },
    socialBtn: {
      display: "flex", alignItems: "center", justifyContent: "center",
      width: 40, height: 40, borderRadius: "50%",
      background: "rgba(124,58,237,0.15)", color: "#a5b4fc",
      textDecoration: "none", transition: "background 0.2s",
    },
  };

  return (
    <div style={s.page}>
      {/* Hero */}
      <div style={s.hero}>
        <div style={s.badge}>Our Story</div>
        <h1 style={s.heroH1}>
          Built for the way<br />
          <span style={{ background: "linear-gradient(135deg,#7c3aed,#4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            people actually live
          </span>
        </h1>
        <p style={s.heroSub}>
          Mio started with a simple observation: getting everyday things done — ordering food, booking a service, finding the best deal, paying someone — takes too many apps, too many taps, and too much thinking. We're changing that.
        </p>
      </div>

      {/* Mission */}
      <div style={s.section}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <h2 style={s.sectionH2}>One assistant.<br />Endless possibilities.</h2>
            <p style={{ ...s.sectionSub, marginBottom: 24 }}>
              We believe the future of getting things done is conversational. You shouldn't need to know which app to open, which merchant to search, or how to navigate a checkout flow. You should just be able to ask.
            </p>
            <p style={{ ...s.sectionSub, marginBottom: 0 }}>
              Mio connects you to the best services across shopping, food, travel, bookings, and payments — and handles everything through a single, intelligent interface that understands what you actually need.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { n: "10+", l: "Service categories" },
              { n: "Early Access", l: "Join now — free" },
              { n: "30+", l: "Partner integrations" },
              { n: "1 App", l: "For everything" },
            ].map(({ n, l }) => (
              <div key={l} style={{ background: "#f5f3ff", borderRadius: 16, padding: "24px 20px", textAlign: "center" }}>
                <div style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800, fontSize: 28, color: "#7c3aed", marginBottom: 4 }}>{n}</div>
                <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: 13, color: "#6b7280" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={{ background: "#f9fafb", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ ...s.sectionH2, marginBottom: 12 }}>What we stand for</h2>
            <p style={{ ...s.sectionSub, marginBottom: 0, maxWidth: 540, margin: "0 auto" }}>
              Four principles that guide every decision we make.
            </p>
          </div>
          <div style={s.grid2}>
            {VALUES.map((v) => (
              <div key={v.title} style={s.card}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, color: "#fff" }}>
                  <IconCheck />
                </div>
                <div style={s.valueTitle}>{v.title}</div>
                <div style={s.valueBody}>{v.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div style={s.section}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ ...s.sectionH2, marginBottom: 12 }}>The team behind Mio</h2>
          <p style={{ ...s.sectionSub, marginBottom: 0, maxWidth: 480, margin: "0 auto" }}>
            Small, focused, and obsessed with building something people actually love.
          </p>
        </div>
        <div style={s.grid2}>
          {TEAM.map((t) => (
            <div key={t.name} style={s.teamCard}>
              <div style={s.avatar}>{t.initials}</div>
              <div>
                <div style={s.teamName}>{t.name}</div>
                <div style={s.teamRole}>{t.role}</div>
                <div style={s.teamBio}>{t.bio}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div style={s.contactSection}>
        <div style={s.contactInner}>
          <div>
            <h2 style={s.contactH2}>Get in touch</h2>
            <p style={s.contactSub}>
              Whether you're a potential partner, a business wanting to list on Mio, press, or just someone with a question — we'd love to hear from you. We read every message.
            </p>
            <div style={s.infoItem}>
              <span style={s.infoIcon}><IconMail /></span>
              <span style={s.infoText}>hello@mio.ai</span>
            </div>
            <div style={s.infoItem}>
              <span style={s.infoIcon}><IconMapPin /></span>
              <span style={s.infoText}>United Kingdom</span>
            </div>
            <div style={s.socialRow}>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={s.socialBtn} aria-label="Follow on X (Twitter)">
                <IconTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={s.socialBtn} aria-label="Follow on LinkedIn">
                <IconLinkedIn />
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div style={s.formCard}>
            {status === "sent" ? (
              <div style={s.successBanner}>
                <IconCheck />
                <span>Message received — we'll be in touch soon. Thank you!</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label style={s.label} htmlFor="cf-name">Your name</label>
                <input id="cf-name" style={s.input} type="text" required placeholder="Jane Smith"
                  value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />

                <label style={s.label} htmlFor="cf-email">Email address</label>
                <input id="cf-email" style={s.input} type="email" required placeholder="jane@example.com"
                  value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />

                <label style={s.label} htmlFor="cf-subject">Subject</label>
                <input id="cf-subject" style={s.input} type="text" required placeholder="Partnership, press, feedback…"
                  value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />

                <label style={s.label} htmlFor="cf-message">Message</label>
                <textarea id="cf-message" style={s.textarea} required placeholder="Tell us what's on your mind…"
                  value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />

                {status === "error" && (
                  <div style={{ ...s.errorBanner, marginBottom: 16 }}>
                    Something went wrong — please try again or email us directly at hello@mio.ai
                  </div>
                )}
                <button type="submit" style={s.submitBtn} disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
