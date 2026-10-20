import { useState, useRef } from "react";
import { Link } from "react-router";
import { ArrowUpRight, ShoppingBag, Utensils, Plane, CalendarDays, CreditCard, Ticket, Radio, Search, Mic, Layers, SlidersHorizontal, Code, BarChart3, ShieldCheck, Check, Smartphone, Hotel, ShoppingBasket, Car, ChevronRight } from "lucide-react";
import { SERVICE_MODULES } from "../data/services";
import { PARTNERS, CATEGORIES } from "../data/partners";
import { pb, backendConfigured } from "../lib/pb";
const icons = [ShoppingBag, Utensils, ShoppingBasket, Hotel, Plane, Car, CalendarDays, Ticket, CreditCard, Radio];
const purposes = ["Find products and compare your options.", "Discover delivery, pickup and dining.", "Bring your weekly shopping together.", "Find a place that feels right.", "Explore routes and travel possibilities.", "Get from here to somewhere new.", "Make time for services and appointments.", "Discover concerts and local experiences.", "Explore billing and checkout concepts.", "Bring the conversation into the store."];

export function ServiceCoverage() {
  return <section className="platform-section wrap" id="all-services">
    <div className="section-heading"><div><span className="eyebrow">THE FULL MIO PICTURE</span><h2>Everything you need.<br /><span>Just ask Mio.</span></h2></div><p>Ten service modules, one thoughtful product vision. Explore each use case and its planned capabilities.</p></div>
    <div className="coverage-grid">{SERVICE_MODULES.map((item, i) => { const Icon = icons[i]; return <Link className="coverage-card" to={`/features?module=${item.id}`} key={item.id}><span className={`coverage-icon tone-${i % 4}`}><Icon size={23} /></span><h3>{item.title}</h3><p>{purposes[i]}</p><span className="coverage-arrow"><ArrowUpRight size={15} /></span></Link>; })}</div>
    <div className="platform-section-foot"><span>Product concepts · Live service connections are in development</span><Link className="text-link" to="/search">Explore sample search <ArrowUpRight size={16} /></Link></div>
  </section>;
}

const journey = [
  { title: "Make it yours", label: "01 / WELCOME", text: "Choose the everyday experiences that matter to you.", path: "/onboarding", action: "Try onboarding", icon: Smartphone },
  { title: "Find your next favorite", label: "02 / DISCOVER", text: "Search and compare sample products, places, and services.", path: "/search", action: "Explore search", icon: ShoppingBag },
  { title: "Plan a little escape", label: "03 / EXPLORE", text: "See how travel options could come together in one place.", path: "/search?cat=travel&q=hotel", action: "Explore travel", icon: Plane },
  { title: "Always your call", label: "04 / REVIEW", text: "Review a sample checkout and the approval-first experience.", path: "/checkout", action: "Preview checkout", icon: CreditCard },
  { title: "A more personal start", label: "05 / PREFERENCES", text: "Choose interests and explore the original onboarding steps.", path: "/onboarding", action: "Choose your interests", icon: SlidersHorizontal },
  { title: "Your bills, together", label: "06 / INVOICES", text: "Explore the vision for invoices, payments, and transaction history.", path: "/features?module=payments", action: "Explore payment features", icon: CreditCard },
  { title: "Follow your cravings", label: "07 / FOOD & DINING", text: "Browse the sample restaurant and delivery search experience.", path: "/search?cat=food&q=pizza", action: "Explore dining", icon: Utensils },
  { title: "A little local help", label: "08 / SERVICES", text: "Discover the original service and appointment use cases.", path: "/search?cat=services&q=cleaning", action: "Explore services", icon: CalendarDays },
];
export function MobileJourney() {
  const gallery = useRef(null);
  const move = direction => gallery.current?.scrollBy({ left: direction * 300, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  return <section className="platform-section journey-section" id="mobile-flows"><div className="wrap">
    <div className="section-heading"><div><span className="eyebrow">BUILT AROUND YOUR EVERYDAY</span><h2>One Mio.<br /><span>Every step of the way.</span></h2></div><p>From your first hello to your next good find, explore the everyday journeys Mio brings together.</p></div>
    <div className="journey-gallery-controls"><span>Eight everyday journeys · Scroll to explore</span><div><button type="button" aria-label="Previous mobile journeys" onClick={() => move(-1)}>←</button><button type="button" aria-label="Next mobile journeys" onClick={() => move(1)}>→</button></div></div>
    <div ref={gallery} className="journey-grid" tabIndex={0} role="region" aria-label="Eight mobile app journeys">{journey.map((item, index) => <article key={item.title} className="journey-card"><div className="journey-phone"><div className="journey-island" /><span className="wordmark">mio<span>✳</span></span>{index === 0 ? <img src="images/mio-portrait.png" alt="Mio welcome portrait" loading="lazy" /> : <div className={`journey-visual tone-${index % 4}`}><item.icon size={48} strokeWidth={1.3} /><small>SAMPLE EXPERIENCE</small><b>{index === 1 ? "Your next good find." : index === 2 ? "Somewhere new awaits." : item.title + "."}</b>{index === 3 || index === 5 ? <div className="journey-payment"><span>Sample total</span><b>$149.00</b><span><ShieldCheck size={12} /> You’re in control</span></div> : <div className="journey-lines"><i /><i /><i /></div>}</div>}<span className="journey-home-bar" /></div><span className="eyebrow">{item.label}</span><h3>{item.title}</h3><p>{item.text}</p><Link to={item.path} className="text-link">{item.action}<ArrowUpRight size={16} /></Link></article>)}</div>
    <div className="platform-section-foot"><span><Smartphone size={15} /> Designed for iOS & Android · Product preview</span><Link className="text-link" to="/settings">Personalize your preview <SlidersHorizontal size={15} /></Link></div>
  </div></section>;
}

export function PartnerEcosystem() {
  const names = ["Amazon", "DoorDash", "Booking.com", "Ticketmaster", "Thumbtack", "Stripe Connect"];
  return <section className="platform-section wrap ecosystem-section" id="ecosystem">
    <div className="section-heading"><div><span className="eyebrow">MORE POSSIBILITY, TOGETHER</span><h2>A whole world.<br /><span>One connected vision.</span></h2></div><p>{PARTNERS.length} prospective integrations across {CATEGORIES.length - 1} categories. A shared directory for discovering partners and exploring applications.</p></div>
    <div className="ecosystem-layout"><div className="partner-mosaic">{names.map(name => { const partner = PARTNERS.find(item => item[0] === name); return <Link to={`/providers?q=${encodeURIComponent(name)}`} key={name}><span>{name.slice(0,2).toUpperCase()}</span><div><b>{name}</b><small>{partner[1]}</small></div><ArrowUpRight size={16} /></Link>; })}</div><article className="ecosystem-model"><span className="eyebrow">THREE POTENTIAL REVENUE STREAMS</span><h3>Useful connections.<br />A thoughtful business model.</h3>{[["01", "Referral commissions", "Eligible purchases under partner program terms."], ["02", "Qualified lead fees", "Introductions for service-based categories."], ["03", "Subscriptions & merchant tools", "Planned personal and business services."]].map(([n,title,text]) => <div key={n}><span>{n}</span><p><b>{title}</b><small>{text}</small></p></div>)}<Link to="/providers" className="text-link">Explore integrations & applications <ArrowUpRight size={17} /></Link></article></div>
    <p className="platform-fine-print">Prospective partnerships and illustrative rates require provider approval. A directory listing does not indicate a connected API.</p>
  </section>;
}

const tapSteps = [
  { icon: Radio, title: "Tap to begin", text: "A venue’s NFC tag could open a contextual Mio experience.", screen: "Welcome to Bella Vista", detail: "Explore the sample restaurant menu." },
  { icon: Utensils, title: "Find your favorite", text: "Explore a menu, ask about an item, and choose what suits you.", screen: "A little something delicious.", detail: "Margherita · Fresh basil · Mozzarella" },
  { icon: CreditCard, title: "Review every detail", text: "The proposed flow presents a clear summary for your approval.", screen: "Always your call.", detail: "Sample order · $18.00 · No charge" },
  { icon: Check, title: "Keep it together", text: "See a sample confirmation and the vision for order tracking.", screen: "Your sample is ready.", detail: "Concept only · No order has been placed" },
];
export function EasyTapJourney() {
  const [active, setActive] = useState(0);
  const step = tapSteps[active];
  return <section className="platform-section wrap easytap-home" id="in-store"><div className="tap-scene"><div className="tap-mini-phone"><span className="journey-island" /><span className="wordmark">mio<span>✳</span></span><span className="tap-screen-icon"><step.icon size={38} /></span><h3>{step.screen}</h3><p>{step.detail}</p><div className="tap-scene-lines"><i /><i /><i /></div><small>INTERACTIVE CONCEPT</small></div><div className="tap-puck"><Radio size={30} /><b>mio✳</b></div><div className="tap-orbit" /></div><div><span className="eyebrow">MIO + EASYTAP GO</span><h2>A little tap.<br /><span>A more personal visit.</span></h2><p className="platform-intro">A more helpful way to explore a menu, discover a service, and review every detail of your visit.</p><div className="tap-step-list" aria-label="Explore EasyTap steps">{tapSteps.map((item,index) => <button type="button" key={item.title} onClick={() => setActive(index)} aria-pressed={active === index} className={active === index ? "active" : ""}><item.icon size={20} /><span><b>{item.title}</b><small>{item.text}</small></span><ChevronRight size={16} /></button>)}</div><Link to="/easytap" className="text-link">Explore all EasyTap use cases <ArrowUpRight size={17} /></Link></div></section>;
}

const engine = [[Mic,"Natural conversation","A voice and chat experience designed around everyday language."],[Search,"Provider discovery","The vision for comparing price, availability, and fit across services."],[ShieldCheck,"Explicit approval","Review details before any future purchase or booking."],[SlidersHorizontal,"Your preferences","Explore settings, interests, and privacy choices."],[Code,"Embeddable assistant","Preview how Mio could welcome customers on a website."],[BarChart3,"Merchant workspace","Explore orders, menus, customers, analytics, and integrations."]];
export function PlatformTools() {
  return <section className="platform-section wrap" id="platform-tools"><div className="section-heading"><div><span className="eyebrow">THE MIO AI ENGINE</span><h2>Thoughtful by design.<br /><span>Connected by possibility.</span></h2></div><p>One thoughtful assistant, designed to connect the details of your day. Live AI and provider transactions remain in development.</p></div><div className="engine-grid">{engine.map(([Icon,title,text]) => <article key={title}><Icon size={24} /><h3>{title}</h3><p>{text}</p></article>)}</div><div className="platform-links">{[["/voice", "Voice & sample search", Mic],["/widget", "Widget preview", Code],["/developers", "Developer tools", Layers],["/dashboard", "Your account", Smartphone],["/commissions", "Commission workspace", BarChart3],["/about", "About & contact", ArrowUpRight]].map(([path,label,Icon]) => <Link to={path} key={path}><Icon size={18} /><span>{label}</span><ArrowUpRight size={15} /></Link>)}</div></section>;
}

export function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  async function submit(event) {
    event.preventDefault(); setStatus("saving");
    try { await pb.collection("waitlist").create({ email }); setStatus("saved"); setEmail(""); }
    catch { setStatus("error"); }
  }
  return <section className="wrap platform-section" id="early-access"><div className="early-access"><div><span className="eyebrow">THE NEXT CHAPTER OF MIO</span><h2>A little more<br /><span>to look forward to.</span></h2><p>Explore the preview today and follow the product as connected experiences take shape.</p></div><div>{status === "saved" ? <p role="status" className="connection-note">Your email was saved to the early-access list.</p> : <form onSubmit={submit}><label htmlFor="early-email">Early-access updates</label><input id="early-email" type="email" autoComplete="email" required placeholder="Your email address" value={email} onChange={event => setEmail(event.target.value)} /><button className="button-primary" disabled={!backendConfigured || status === "saving"}>{status === "saving" ? "Saving…" : "Join the early-access list"}<ArrowUpRight size={16} /></button><small>{backendConfigured ? "Submit your email only if you’d like Mio product updates." : "Email updates are not available in this preview yet. You can explore the interactive app today."}</small>{status === "error" && <p role="alert">We couldn’t save your email. Please try again later.</p>}</form>}<Link to="/about" className="text-link">Meet the project <ArrowUpRight size={15} /></Link></div></div></section>;
}
