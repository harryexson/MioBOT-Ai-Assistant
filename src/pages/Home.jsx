import { useState, useRef } from "react";
import useLandingMotion from "../components/useLandingMotion";
import { ServiceCoverage, MobileJourney, PartnerEcosystem, EasyTapJourney, PlatformTools, EarlyAccess } from "../components/PlatformSections";
import MioVoiceBot from "../components/MioVoiceBot";
import { Link } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShoppingBag,
  Utensils,
  Plane,
  CalendarDays,
  AudioLines,
  Check,
  Play,
  ShieldCheck,
  Smartphone,
  Plus,
  Minus,
  Send,
  Heart,
  ChevronRight,
  Pause,
} from "lucide-react";
const services = [
  {
    name: "Shopping",
    icon: ShoppingBag,
    line: "The right find. Less finding.",
    prompt: "Find headphones under $200",
    reply: "Let’s find your next favorite pair.",
    item: "Everyday wireless headphones",
    detail: "Noise cancelling · 40-hour battery",
    price: "$149",
    color: "lavender",
  },
  {
    name: "Food & dining",
    icon: Utensils,
    line: "Your next craving, sorted.",
    prompt: "Find a great pizza for tonight",
    reply: "A little less scrolling. A little more delicious.",
    item: "Wood-fired margherita",
    detail: "Fresh basil · Mozzarella · 12 inch",
    price: "$18",
    color: "peach",
  },
  {
    name: "Travel",
    icon: Plane,
    line: "Less planning. More going.",
    prompt: "Plan a weekend escape",
    reply: "A change of scenery sounds perfect.",
    item: "A quiet city escape",
    detail: "Boutique stay · 2 guests · Weekend",
    price: "$189 / night",
    color: "blue",
  },
  {
    name: "Everyday life",
    icon: CalendarDays,
    line: "Make room for what matters.",
    prompt: "Help me plan my Saturday",
    reply: "Let’s make some space for you.",
    item: "Your Saturday, simplified",
    detail: "Coffee · A haircut · Dinner with friends",
    price: "Your plan",
    color: "green",
  },
];
export function Orb({ small = false }) {
  return (
    <div className={small ? "mio-orb small" : "mio-orb"} aria-hidden="true">
      <AudioLines />
    </div>
  );
}
export function Phone({ active = 0 }) {
  const s = services[active];
  return (
    <div className="product-phone">
      <div className="phone-status">
        <b>9:41</b>
        <span className="island" />
        <span>▮▮▮ ▰</span>
      </div>
      <div className="phone-top">
        <span className="wordmark">
          mio<span>✳</span>
        </span>
        <span className="mini-avatar">J</span>
      </div>
      <small>YOUR DAY, A LITTLE LIGHTER</small>
      <h3>
        Hey, Jamie.
        <br />
        What’s on your mind?
      </h3>
      <Orb />
      <div className="phone-prompt">
        {s.prompt}
        <Sparkles size={14} />
      </div>
      <div className="phone-reply">
        <span className="tiny-star">✳</span>
        {s.reply}
      </div>
      <div key={active} className={"phone-result " + s.color}>
        <s.icon size={40} strokeWidth={1.2} />
        <span className="sample-label">SAMPLE PICK</span>
        <b>{s.item}</b>
        <small>{s.detail}</small>
        <div>
          <strong>{s.price}</strong>
          <span className="result-plus">+</span>
        </div>
      </div>
      <div className="phone-input">
        Ask a follow-up…
        <AudioLines size={18} />
      </div>
      <div className="phone-bottom">
        Explore <span>✳</span> Saved
      </div>
    </div>
  );
}
export default function Home() {
  const root = useRef(null);
  const [motionPaused, setMotionPaused] = useState(false);
  useLandingMotion(root, motionPaused);
  const [active, setActive] = useState(0);
  const [faq, setFaq] = useState(0);
  return (
    <main id="main" ref={root} className="landing" data-motion={motionPaused ? "paused" : "playing"}>
      <section className="hero wrap">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" /> A LITTLE AI. A LOT MORE LIFE.
          </div>
          <h1>
            Big plans.
            <br />
            Small tasks.
            <br />
            <span>Just ask Mio.</span>
          </h1>
          <p>
            Your everyday, made easier. Discover, plan, and find what you need
            with one thoughtful AI assistant.
          </p>
          <div className="hero-actions">
            <Link to="/app" className="button-primary">
              Meet your Mio <ArrowUpRight size={19} />
            </Link>
            <a href="#in-action" className="button-play">
              <span>
                <Play size={13} fill="currentColor" />
              </span>{" "}
              See it in action
            </a>
          </div>
          <div className="hero-note">
            <span>
              <Check size={14} /> Explore the free demo
            </span>
            <span>
              <Check size={14} /> No card needed
            </span>
          </div>
          <div className="built-for">
            <Smartphone size={16} />
            <span>Designed for iOS & Android</span>
            <i />
            Your life. One conversation.
          </div>
        </div>
        <div className="hero-art">
          <div className="hero-orbit hero-orbit-back" aria-hidden="true" />
          <div className="portrait-frame">
            <img
              src="images/mio-portrait.png"
              alt="Woman in a lavender sweater enjoying a moment with her phone"
              fetchPriority="high"
            />
            <div className="portrait-shade" />
            <span className="portrait-index">MIO / EVERYDAY MAGIC</span>
          </div>
          <div className="float-request">
            <span className="request-avatar">J</span>“A weekend away sounds
            nice.”
            <Sparkles size={17} />
          </div>
          <div className="float-answer">
            <span className="answer-icon">
              <Plane size={22} />
            </span>
            <div>
              <small>CONSIDER IT STARTED</small>
              <b>Your next escape is calling.</b>
              <span>
                Let’s find somewhere you’ll love <ArrowUpRight size={13} />
              </span>
            </div>
          </div>
          <div className="floating-orb">
            <Orb />
          </div>
          <div className="orbit-label">a little everyday magic ↗</div>
          <div className="hero-orbit hero-orbit-front" aria-hidden="true" />
        </div>
      </section>
      <div className="motion-toolbar wrap">
        <span>Thoughtfully designed. Always your call.</span>
        <button type="button" aria-pressed={motionPaused} onClick={() => setMotionPaused(!motionPaused)}>
          {motionPaused ? <Play size={12} /> : <Pause size={12} />}
          {motionPaused ? "Play motion" : "Pause motion"}
        </button>
      </div>
      <section className="benefit-strip">
        <div className="wrap">
          <span>
            One assistant.
            <br />
            <b>So many possibilities.</b>
          </span>
          {services.map((s) => (
            <a
              key={s.name}
              href="#in-action"
              onClick={() => setActive(services.indexOf(s))}
            >
              <s.icon size={21} />
              {s.name}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      </section>
      <section className="possibilities wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LESS APP-HOPPING. MORE LIVING.</span>
            <h2>
              Your whole day.
              <br />
              <span>One conversation.</span>
            </h2>
          </div>
          <p>
            From your first coffee to your next adventure,
            <br />
            Mio brings the possibilities together.
          </p>
        </div>
        <div className="service-grid">
          {services.map((s, i) => (
            <button
              key={s.name}
              className={"service-card " + s.color}
              onClick={() => {
                setActive(i);
                document
                  .getElementById("in-action")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="service-card-top">
                <s.icon size={26} />
                <ArrowUpRight size={20} />
              </div>
              <h3>{s.name}</h3>
              <p>{s.line}</p>
              <div className={"service-illustration illustration-" + i}>
                {i === 0 ? (
                  <>
                    <div className="headphone-band" />
                    <div className="ear left" />
                    <div className="ear right" />
                  </>
                ) : i === 1 ? (
                  <div className="pizza">
                    ✦<span />✦<span />✦
                  </div>
                ) : i === 2 ? (
                  <>
                    <div className="boarding-pass">
                      <small>MIO AIR / THE POSSIBILITIES</small>
                      <b>
                        NYC <Plane size={24} /> ANY
                      </b>
                      <span>New York → Somewhere new</span>
                      <i>▥▥▥▥▥▥▥▥</i>
                    </div>
                  </>
                ) : (
                  <div className="calendar-art">
                    <small>YOUR SATURDAY</small>
                    <b>24</b>
                    <span>
                      <Check size={14} /> A little time for you
                    </span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>
      <ServiceCoverage />
      <section className="wrap platform-section" id="voice-discovery"><MioVoiceBot /></section>
      <section className="demo-section" id="in-action">
        <div className="wrap demo-layout">
          <div className="demo-copy">
            <span className="eyebrow">MEET YOUR NEW EVERYDAY PERSON</span>
            <h2>
              You say it.
              <br />
              Mio gets it.
            </h2>
            <p>
              No perfect prompts. No complicated menus.
              <br />
              Just a natural conversation that starts with you.
            </p>
            <div
              className="demo-tabs"
              role="tablist"
              aria-label="Try a scenario"
            >
              {services.map((s, i) => (
                <button
                  role="tab"
                  aria-selected={active === i}
                  id={`scenario-${i}`}
                  aria-controls="scenario-panel"
                  tabIndex={active === i ? 0 : -1}
                  onKeyDown={(event) => {
                    const next =
                      event.key === "ArrowRight"
                        ? (i + 1) % services.length
                        : event.key === "ArrowLeft"
                          ? (i + services.length - 1) % services.length
                          : event.key === "Home"
                            ? 0
                            : event.key === "End"
                              ? services.length - 1
                              : null;
                    if (next !== null) {
                      event.preventDefault();
                      setActive(next);
                      document.getElementById(`scenario-${next}`)?.focus();
                    }
                  }}
                  key={s.name}
                  onClick={() => setActive(i)}
                  className={active === i ? "active" : ""}
                >
                  <s.icon size={17} />
                  {s.name}
                </button>
              ))}
            </div>
            <div
              className="demo-quote"
              role="tabpanel"
              id="scenario-panel"
              aria-labelledby={`scenario-${active}`}
            >
              <span>YOU COULD SAY</span>
              <p>“{services[active].prompt}”</p>
            </div>
            <Link to="/app" className="text-link">
              Try a conversation <ArrowRight size={17} />
            </Link>
            <small className="demo-disclosure">
              Interactive concept preview. Sample results, no purchases.
            </small>
          </div>
          <div className="phone-stage">
            <div className="stage-ring" />
            <Phone active={active} />
            <div className="control-badge">
              <ShieldCheck size={19} />
              <span>
                <b>Always your call.</b>
                <small>You review. You decide.</small>
              </span>
            </div>
            <span className="stage-caption">
              A personal assistant.
              <br />
              <em>In your pocket.</em>
            </span>
          </div>
        </div>
      </section>
      <MobileJourney />
      <section className="how-section wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FROM “I NEED TO” TO “LOOK AT THAT”</span>
            <h2>
              A little help.
              <br />A whole lot of possibility.
            </h2>
          </div>
          <Link className="text-link" to="/features">
            Explore all features <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="steps-grid">
          {[
            [
              "01",
              "Just ask.",
              "Type what’s on your mind, in your own words. Start with a task, a craving, or a big idea.",
            ],
            [
              "02",
              "Find your fit.",
              "Explore helpful suggestions and compare your options, all in one place.",
            ],
            [
              "03",
              "You take it from here.",
              "Review the details and choose your next step. You’re always in control.",
            ],
          ].map(([n, t, d]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <PartnerEcosystem />
      <section className="business-banner wrap">
        <div>
          <span className="eyebrow">A LITTLE MIO FOR YOUR BUSINESS</span>
          <h2>
            Make every interaction
            <br />
            feel personal.
          </h2>
          <p>
            Bring a more helpful experience to your customers.
            <br />
            Explore conversational discovery and tap-to-order.
          </p>
          <Link className="button-dark" to="/business">
            Meet Mio for business <ArrowUpRight size={17} />
          </Link>
          <ul className="business-capabilities">{["Orders, customers & menus", "Revenue & analytics", "Team roles & integrations", "NFC & checkout concepts"].map(item => <li key={item}><Check size={14} />{item}</li>)}</ul>
          <div className="business-workspaces"><Link to="/merchant">Merchant dashboard <ArrowUpRight size={14} /></Link><Link to="/admin">Platform admin preview <ArrowUpRight size={14} /></Link></div>
        </div>
        <div className="business-preview">
          <div>
            <span className="wordmark">
              mio<span>✳</span>
            </span>
            <small>BUSINESS / PREVIEW</small>
          </div>
          <h4>Good things are happening.</h4>
          <div className="business-stats">
            <span>
              <small>Sample orders</small>
              <b>
                128 <i>↗ 12%</i>
              </b>
            </span>
            <span>
              <small>Sample revenue</small>
              <b>$2,480</b>
            </span>
          </div>
          <div className="chart-bars">
            {[30, 45, 37, 62, 50, 78, 65, 90, 78, 100, 88, 115].map((h, i) => (
              <i key={i} style={{ height: h }} />
            ))}
          </div>
          <div className="business-bottom">
            <span>Mon</span>
            <span>Thu</span>
            <span>Sun</span>
          </div>
        </div>
      </section>
      <EasyTapJourney />
      <PlatformTools />
      <section className="faq-section wrap">
        <div>
          <span className="eyebrow">A FEW THINGS YOU MIGHT BE WONDERING</span>
          <h2>Glad you asked.</h2>
          <p>Good questions. Straightforward answers.</p>
        </div>
        <div>
          {[
            [
              "What can I do with Mio today?",
              "You can explore the interactive preview, try sample shopping, dining, travel, and planning conversations, and save example picks. Live provider connections are still being developed.",
            ],
            [
              "Is Mio available on iOS and Android?",
              "Mio is being built with Expo and React Native for both platforms. This is a product preview; public App Store and Google Play downloads are not available yet.",
            ],
            [
              "Does the demo make purchases?",
              "No. The preview uses sample results and never charges you or places real orders. You can explore freely without entering payment details.",
            ],
            [
              "Can I use Mio for my business?",
              "Explore the business and EasyTap previews to see the planned customer and merchant experiences. Live onboarding and integrations will require a connected backend.",
            ],
          ].map(([q, a], i) => (
            <div className="faq-item" key={q}>
              <button
                aria-expanded={faq === i}
                onClick={() => setFaq(faq === i ? -1 : i)}
              >
                {q}
                {faq === i ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              {faq === i && <p>{a}</p>}
            </div>
          ))}
        </div>
      </section>
      <EarlyAccess />
      <section className="final-cta wrap">
        <div className="cta-star">✳</div>
        <span className="eyebrow">MAKE SPACE FOR THE GOOD STUFF</span>
        <h2>
          Life’s calling.
          <br />
          Let Mio help.
        </h2>
        <Link to="/app" className="button-primary">
          Say hello to Mio <ArrowUpRight size={19} />
        </Link>
        <p>Free interactive preview. A little glimpse of what’s next.</p>
      </section>
      <Footer />
    </main>
  );
}
export function Footer() {
  return (
    <footer className="site-footer wrap">
      <div>
        <Link to="/" className="wordmark">
          mio<span>✳</span>
        </Link>
        <p>A little AI. A lot more life.</p>
      </div>
      <nav aria-label="Footer navigation">
        <Link to="/features">Explore</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/developers">Developers</Link>
        <Link to="/providers">Integrations</Link>
        <Link to="/about">About & contact</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
      </nav>
      <small>
        © {new Date().getFullYear()} Mio AI. Made for your everyday.
      </small>
    </footer>
  );
}
