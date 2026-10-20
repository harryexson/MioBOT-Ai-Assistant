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
import Providers from "./Providers";
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
  "/features": {
    eyebrow: "A LITTLE HELP, EVERYWHERE",
    title: "Many possibilities.\nOne thoughtful assistant.",
    description:
      "Discover the everyday experiences we’re bringing together in Mio. Start with the preview and imagine a little more room in your day.",
    items: [
      [
        ShoppingBag,
        "Find your next favorite",
        "Explore sample product suggestions and keep the ones you love.",
      ],
      [
        Utensils,
        "Follow your cravings",
        "Discover dining ideas through a natural conversation.",
      ],
      [
        Plane,
        "Make room for adventure",
        "Start planning your next escape, one question at a time.",
      ],
      [
        CalendarDays,
        "Simplify your everyday",
        "Turn a busy day into a thoughtful plan.",
      ],
      [
        MessageCircle,
        "Keep the conversation going",
        "Ask a follow-up without starting from scratch.",
      ],
      [
        ShieldCheck,
        "Stay in the driver’s seat",
        "Explore your options before deciding what comes next.",
      ],
    ],
  },
  "/providers": {
    eyebrow: "CONNECTED POSSIBILITIES",
    title: "Your world.\nA little closer together.",
    description:
      "A vision for shopping, dining, travel, and services in one conversation. Provider connections are planned; the current preview uses sample data.",
    items: [
      [
        ShoppingBag,
        "Retail & discovery",
        "A simpler path from an idea to the right product.",
      ],
      [
        Utensils,
        "Restaurants & cafés",
        "Menus that feel as approachable as a conversation.",
      ],
      [
        Plane,
        "Travel & hospitality",
        "Find a stay that fits the way you want to travel.",
      ],
    ],
  },
  "/easytap": {
    eyebrow: "MEET EASYTAP",
    title: "A little tap.\nA warmer welcome.",
    description:
      "Explore the concept for a seamless in-store experience. Tap a venue’s tag, discover a menu, and review your choices. Hardware and live payment integrations are still to come.",
    items: [
      [
        Radio,
        "01 / Tap to discover",
        "A venue tag opens the experience on your phone.",
      ],
      [
        MessageCircle,
        "02 / Make it yours",
        "Browse a menu and tell Mio what you’re in the mood for.",
      ],
      [
        ShieldCheck,
        "03 / Review your choices",
        "Check the details and choose your next step.",
      ],
    ],
  },
  "/developers": {
    eyebrow: "BUILT TO GROW WITH YOU",
    title: "Thoughtful experiences.\nSolid foundations.",
    description:
      "Mio’s source includes a React website and an Expo app for iOS and Android. Explore the project and its integration architecture.",
    items: [
      [
        Code,
        "React + Vite",
        "Responsive pages, accessible controls, and a standalone local runtime.",
      ],
      [
        Smartphone,
        "Expo + React Native",
        "A shared mobile experience across iOS and Android.",
      ],
      [
        ShieldCheck,
        "Integration boundaries",
        "Live AI, authentication, commerce, and payments require configured services.",
      ],
    ],
  },
};
export default function Marketing() {
  const { pathname } = useLocation();
  if (pathname === "/providers") return <Providers />;
  const c = content[pathname] || content["/features"];
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
          {
            name: "Mio Personal",
            price: "$9.99 / month · planned",
            desc: "The vision for your everyday assistant.",
            features: [
              "Connected provider discovery",
              "Personalized recommendations",
              "Voice conversations",
              "Proposed monthly plan",
            ],
            cta: "Explore features",
            to: "/features",
          },
          {
            name: "Mio Business",
            price: "$29.99 / month · planned",
            desc: "Thoughtful experiences for your customers.",
            features: [
              "Merchant dashboard concept",
              "Conversational discovery",
              "EasyTap in-store concept",
              "Proposed monthly plan",
            ],
            cta: "View business demo",
            to: "/merchant",
          },
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
            does not include analytics or an email collection service.
          </p>
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
