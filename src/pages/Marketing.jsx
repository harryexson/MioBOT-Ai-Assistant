import { SUBSCRIPTION_PLANS } from "../lib/mockProviders";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  ArrowUpRight,
  Check,
  ShoppingBag,
  Utensils,
  Plane,
  CalendarDays,
  ShieldCheck,
  Smartphone,
  MessageCircle,
  Code,
  Radio,
  Store,
} from "lucide-react";
import { Footer, Phone } from "./Home";
const content = {
  "/business": {
    eyebrow: "MIO FOR BUSINESS",
    title: "More connection.\nLess friction.",
    description:
      "Bring a more personal experience to your customers. Explore the vision for conversational discovery, a thoughtful merchant workspace, and tap-to-order.",
    items: [
      [
        Store,
        "Your business, at a glance",
        "Explore a merchant dashboard with sample orders, revenue, products, and customers.",
      ],
      [
        MessageCircle,
        "A more helpful welcome",
        "Let customers discover your offerings through a natural conversation.",
      ],
      [
        Radio,
        "Connect online and in person",
        "Explore the EasyTap concept for menus, services, and venue experiences.",
      ],
    ],
  },
};

export default function Marketing() {
  const { pathname } = useLocation();
  const c = content["/business"];
  return (
    <main id="main" className="marketing-page">
      <section className="marketing-hero wrap">
        <span className="eyebrow">{c.eyebrow}</span>
        <h1>
          {c.title.split("\n").map((t) => (
            <span key={t}>
              {t}
              <br />
            </span>
          ))}
        </h1>
        <p>{c.description}</p>
        <Link className="button-primary" to="/app">
          Explore the demo <ArrowUpRight size={17} />
        </Link>
      </section>
      <section className="marketing-grid wrap">
        {c.items.map(([Icon, title, description]) => (
          <article key={title}>
            <Icon size={29} />
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </section>
      {pathname === "/business" ? (
        <section className="marketing-cta wrap">
          <h2>A clearer view of your everyday.</h2>
          <Link to="/merchant" className="button-primary">
            Open merchant preview <ArrowUpRight size={17} />
          </Link>
        </section>
      ) : pathname === "/developers" ? (
        <section className="developer-box wrap">
          <h2>Start with the source.</h2>
          <p>Build, inspect, and shape the next chapter of Mio.</p>
          <a
            href="https://github.com/harryexson/MioBOT-Ai-Assistant"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            View repository <ArrowUpRight size={18} />
          </a>
        </section>
      ) : (
        <section className="marketing-cta wrap">
          <h2>Meet your everyday companion.</h2>
          <Link to="/app" className="button-primary">
            Say hello to Mio <ArrowUpRight size={17} />
          </Link>
        </section>
      )}
      <Footer />
    </main>
  );
}
export function PricingPage() {
  return (
    <main id="main" className="marketing-page">
      <section className="marketing-hero wrap">
        <span className="eyebrow">A SIMPLE START</span>
        <h1>
          A little more life.
          <br />
          Start exploring for free.
        </h1>
        <p>
          Start with the interactive preview. Personal and Business prices below
          are planning examples; paid plans and live services are still in
          development.
        </p>
      </section>
      <section className="pricing-grid wrap">
        {[
          {
            name: "Mio Preview",
            price: "Free",
            desc: "A first look at your everyday companion.",
            features: [
              "Interactive sample conversations",
              "Shopping, dining, travel & planning",
              "Saved sample picks",
              "No payment details required",
            ],
            cta: "Try the preview",
            to: "/app",
          },
          ...SUBSCRIPTION_PLANS.filter(plan => plan.id !== "free").map(plan => ({
            name: "Mio " + plan.name,
            price: plan.price === null ? "Custom · planned" : "$" + plan.price + " / month · planned",
            desc: plan.description,
            features: plan.features,
            cta: plan.id === "enterprise" ? "Discuss the vision" : plan.id === "business" ? "View business demo" : "Explore features",
            to: plan.id === "enterprise" ? "/about" : plan.id === "business" ? "/merchant" : "/features",
          })),
        ].map((p, i) => (
          <article className={i === 0 ? "featured-plan" : ""} key={p.name}>
            <span className="eyebrow">{p.name}</span>
            <h2>{p.price}</h2>
            <p>{p.desc}</p>
            <ul>
              {p.features.map((f) => (
                <li key={f}>
                  <Check size={15} />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to={p.to}
              className={i === 0 ? "button-primary" : "button-dark"}
            >
              {p.cta}
              <ArrowUpRight size={16} />
            </Link>
          </article>
        ))}
      </section>
      <Footer />
    </main>
  );
}
export function LegalPage() {
  const privacy = useLocation().pathname === "/privacy";
  return (
    <main id="main" className="legal-page wrap">
      <span className="eyebrow">PRODUCT PREVIEW / OCTOBER 2026</span>
      <h1>{privacy ? "Privacy in this preview" : "Preview terms"}</h1>
      {privacy ? (
        <>
          <h2>Your browser, your saved picks.</h2>
          <p>
            The browser demo stores saved sample item identifiers and your
            provider shortlist in localStorage on your device. Conversations are held in memory for
            the current session and are not sent to an AI service. Unsave items
            using their heart button, or clear this site’s browser storage to
            remove all saved picks.
          </p>
          <h2>External services</h2>
          <p>
            The website loads fonts from Google Fonts. Following the GitHub link
            opens an external service with its own privacy practices. This build
            does not include analytics. Optional account, contact, partner-interest,
            and early-access forms use the configured account service when enabled.
          </p>
          <h2>Voice input and account services</h2>
          <p>Voice input starts only when you choose the microphone. Your browser’s speech recognition service may process audio under its own terms. When account services are configured, submitted account and application details are sent to that service, and signed-in search history may be stored with your account.</p>
          <h2>Before launch</h2>
          <p>
            A complete privacy policy and contact information must be provided
            before collecting account, payment, or personal information in a
            public service.
          </p>
        </>
      ) : (
        <>
          <h2>An experience to explore.</h2>
          <p>
            Mio is a product concept and interactive preview. Results, prices,
            merchant metrics, and transactions are examples. They are not live
            offers, confirmed bookings, payment processing, or purchase
            commitments.
          </p>
          <h2>Availability</h2>
          <p>
            The mobile source is intended for iOS and Android development.
            Public app-store releases and live integrations are not available in
            this build. Do not enter real payment information into any
            demonstration screen.
          </p>
          <h2>Before launch</h2>
          <p>
            Final commercial terms, support details, provider agreements, and
            jurisdiction-specific policies must be prepared before public
            launch.
          </p>
        </>
      )}
      <Link className="button-primary" to="/app">
        Explore the preview <ArrowUpRight size={17} />
      </Link>
    </main>
  );
}
