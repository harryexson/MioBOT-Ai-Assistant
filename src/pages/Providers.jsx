import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Bookmark, Check, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router";
import { Footer } from "./Home";

const PARTNERS = [
  ["Amazon", "Shopping", "🛒", "200M+ shoppers", "1–10%", "per sale", "Easy", "350M+ products · search · price comparison · reviews"],
  ["eBay", "Shopping", "🔨", "135M+ buyers", "1–6%", "per sale", "Easy", "New and used goods · auctions · collectibles · price discovery"],
  ["Walmart", "Shopping", "🏪", "120M+ shoppers", "1–4%", "per sale", "Easy", "Everyday retail · grocery · pickup · delivery"],
  ["CJ Affiliate", "Shopping", "🔗", "3,800+ brands", "Varies", "per retailer", "Moderate", "Affiliate network · deep links · tracking · cross-device attribution"],
  ["Rakuten Advertising", "Shopping", "🌸", "1,000+ brands", "Varies", "per retailer", "Moderate", "Brand partnerships · deals · reporting · multi-currency"],
  ["DoorDash", "Food & Grocery", "🚪", "600K+ restaurants", "3–5%", "per order", "Moderate", "Restaurant search · menus · ordering · delivery tracking"],
  ["Uber Eats", "Food & Grocery", "🚗", "Global", "3–6%", "per order", "Moderate", "Restaurant and grocery delivery · group and scheduled orders"],
  ["Instacart", "Food & Grocery", "🛒", "1,400+ retailers", "3–5%", "per order", "Easy", "Multi-store groceries · delivery · retailer selection"],
  ["Grubhub", "Food & Grocery", "🍕", "22M+ diners", "4%", "per order", "Moderate", "Restaurant discovery · delivery estimates · rewards"],
  ["Amadeus", "Travel", "✈️", "Global travel network", "1–3%", "per booking", "Advanced", "Flight search · hotel data · trip planning"],
  ["Booking.com", "Travel", "🏨", "2.4M+ properties", "4–6%", "per stay", "Easy", "Property discovery · availability · booking referrals"],
  ["Expedia", "Travel", "🌍", "Global travel network", "3–6%", "per booking", "Moderate", "Flights and stays · package discovery · price alerts"],
  ["Airbnb", "Travel", "🏠", "Global stays", "$40–75", "per booking", "Moderate", "Unique stays · experiences · longer-trip discovery"],
  ["Viator / Tripadvisor", "Travel", "🎡", "300K+ experiences", "8%", "per booking", "Easy", "Tours · activities · experiences · review discovery"],
  ["Ticketmaster", "Events", "🎟️", "500M+ tickets / year", "2–5%", "per ticket", "Moderate", "Concerts · sports · theatre · event discovery"],
  ["Eventbrite", "Events", "🎪", "3M+ events / year", "4%", "per ticket", "Easy", "Local events · classes · festivals · conferences"],
  ["StubHub", "Events", "🎫", "10M+ buyers", "5–10%", "per ticket", "Moderate", "Resale tickets · last-minute discovery · fan protection"],
  ["SeatGeek", "Events", "🏟️", "20M+ users", "5–10%", "per ticket", "Moderate", "Ticket search · value signals · venue maps"],
  ["Thumbtack", "Home Services", "📌", "1,000+ service categories", "10–20%", "per lead", "Moderate", "Local pros · quotes · home services discovery"],
  ["Taskrabbit", "Home Services", "🐰", "140+ cities", "15%", "per booking", "Easy", "Tasker matching · assembly · cleaning · moving"],
  ["Angi", "Home Services", "🔧", "150M+ reviews", "10–15%", "per lead", "Moderate", "Home improvement pros · service discovery · reviews"],
  ["Zocdoc", "Health", "🏥", "6M+ patients / month", "Per appointment", "per booking", "Advanced", "Doctor discovery · availability · insurance information"],
  ["GoodRx", "Health", "💊", "25M+ users", "Per prescription", "per referral", "Easy", "Prescription price comparison · pharmacy discovery · coupons"],
  ["Calm / Headspace", "Health", "🧘", "150M+ downloads", "20–30%", "per subscription", "Easy", "Mindfulness · sleep · wellness subscriptions"],
  ["NerdWallet", "Finance", "💳", "20M+ monthly users", "$50–300", "per conversion", "Moderate", "Financial product discovery · comparisons · rate search"],
  ["Lemonade", "Finance", "🍋", "1.5M+ customers", "$20–150", "per policy", "Easy", "Insurance discovery · quotes · policy referrals"],
  ["Uber", "Transport", "🚕", "131M+ monthly users", "$5–15", "per new rider", "Moderate", "Ride discovery · estimates · scheduled trips"],
  ["Rome2Rio", "Transport", "🗺️", "12M+ monthly users", "CPC + 2–4%", "per booking", "Easy", "Compare plane · train · bus · ferry · car journeys"],
  ["Stripe Connect", "Payments", "💳", "Global", "Processing margin", "per transaction", "Moderate", "Payments infrastructure · merchant payouts · revenue splitting"],
  ["Klarna", "Payments", "🛍️", "150M+ users", "1–3%", "per transaction", "Easy", "Pay-over-time options · checkout referrals"],
  ["PayPal", "Payments", "🅿️", "Global", "Varies", "per transaction", "Moderate", "Digital checkout · wallet payments · merchant services"],
];

const CATEGORIES = ["All categories", "Shopping", "Food & Grocery", "Travel", "Events", "Home Services", "Health", "Finance", "Transport", "Payments"];
const STORAGE_KEY = "mio-integration-shortlist";

function readSaved() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export default function Providers() {
  const { pathname } = useLocation();
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState(readSaved);
  const [savedOnly, setSavedOnly] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); } catch { /* Storage may be unavailable in private browsing. */ }
  }, [saved]);

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();
    return PARTNERS.filter((partner) => {
      const matchesCategory = category === CATEGORIES[0] || partner[1] === category;
      const matchesSearch = !search || partner.join(" ").toLowerCase().includes(search);
      const matchesSaved = !savedOnly || saved.includes(partner[0]);
      return matchesCategory && matchesSearch && matchesSaved;
    });
  }, [category, query, saved, savedOnly]);

  function toggleSaved(name) {
    setSaved((current) => {
      return current.includes(name) ? current.filter((item) => item !== name) : [...current, name];
    });
  }

  return (
    <>
    <main id="main" className="integration-page">
      <section className="integration-hero wrap">
        <div className="integration-orbit" aria-hidden="true"><span>✦</span></div>
        <span className="eyebrow"><Sparkles size={14} /> PARTNER ECOSYSTEM · IN DEVELOPMENT</span>
        <h1>30+ ways to make<br /><span>everyday earn.</span></h1>
        <p>Explore the partner integrations Mio is designed to connect with across shopping, food, travel, events, services and payments.</p>
        <div className="integration-hero-actions">
          <a className="button-primary" href={`${pathname}#directory`}>Explore integrations <ArrowRight size={17} /></a>
          <a className="button-dark" href={`${pathname}#revenue`}>How the model works</a>
        </div>
        <div className="integration-stats" aria-label="Integration directory overview">
          <div><strong>31</strong><span>integration prospects</span></div>
          <div><strong>9</strong><span>categories covered</span></div>
          <div><strong>3</strong><span>potential revenue streams</span></div>
          <div><strong>1</strong><span>assistant experience</span></div>
        </div>
        <p className="estimate-note"><ShieldCheck size={15} /> Partnership availability and commission figures are estimates from the planning brief. Rates, APIs and eligibility require confirmation with each provider.</p>
      </section>

      <section id="revenue" className="revenue-section wrap">
        <div className="section-heading"><span className="eyebrow">A BUSINESS MODEL WITH RANGE</span><h2>Three ways Mio can earn.</h2><p>Potential revenue streams designed around useful recommendations and clear user choice.</p></div>
        <div className="revenue-grid">
          <article><span className="revenue-icon">↗</span><span className="eyebrow">01 / TRANSACTIONS</span><h3>Referral commissions</h3><p>When a user chooses a partner product, booking or order, an eligible referral may earn a commission under that partner’s program terms.</p><strong>Illustrative range · 1–20%</strong></article>
          <article><span className="revenue-icon">◎</span><span className="eyebrow">02 / QUALIFIED LEADS</span><h3>Lead fees</h3><p>For services that begin with a quote or consultation, partners may pay for a qualified introduction where a lead program is available.</p><strong>Illustrative range · $5–$300</strong></article>
          <article><span className="revenue-icon">▤</span><span className="eyebrow">03 / SUBSCRIPTIONS</span><h3>Plans for people & business</h3><p>Future paid plans and merchant tools could support Mio’s platform, subject to product launch and final pricing.</p><strong>Planning examples · $9.99–$99.99/mo</strong></article>
        </div>
      </section>

      <section id="directory" className="directory-section wrap">
        <div className="directory-heading"><div><span className="eyebrow">THE PARTNER LANDSCAPE</span><h2>Every connection, in one place.</h2><p>Browse the providers Mio could work with as the product develops.</p></div><button aria-pressed={savedOnly} className={`shortlist-toggle ${savedOnly ? "active" : ""}`} onClick={() => setSavedOnly(!savedOnly)}><Bookmark size={16} /> Shortlist <span>{saved.length}</span></button></div>
        <label className="integration-search"><Search size={18} /><span className="sr-only">Search integrations</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by provider, category or capability…" /></label>
        <div className="category-filters" aria-label="Filter by category">{CATEGORIES.map((item) => <button key={item} aria-pressed={category === item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <div className="directory-result-line"><span>{visible.length} integration{visible.length === 1 ? "" : "s"}</span><span>Prospective connections · availability varies</span></div>
        <div className="integration-grid">
          {visible.map((partner, index) => (
            <article className="integration-card" key={partner[0]}>
              <div className="integration-card-top"><span className="partner-icon" aria-hidden="true">{partner[2]}</span><button className={`save-partner ${saved.includes(partner[0]) ? "saved" : ""}`} onClick={() => toggleSaved(partner[0])} aria-label={`${saved.includes(partner[0]) ? "Remove" : "Add"} ${partner[0]} ${saved.includes(partner[0]) ? "from" : "to"} shortlist`} title={saved.includes(partner[0]) ? "Remove from shortlist" : "Add to shortlist"}>{saved.includes(partner[0]) ? <Check size={16} /> : <Bookmark size={16} />}</button></div>
              <span className="partner-category">{partner[1]} <i>·</i> {partner[6]} setup concept</span>
              <h3>{partner[0]}</h3>
              <p className="partner-audience">{partner[3]}</p>
              <p className="partner-description">{partner[7]}</p>
              <div className="commission-estimate"><span>Illustrative earning</span><strong>{partner[4]}</strong><small>{partner[5]}</small></div>
              <div className="partner-card-foot"><span>Partnership to be confirmed</span><span className="partner-status-dot" aria-hidden="true" /></div>
            </article>
          ))}
        </div>
        {visible.length === 0 && <div className="integration-empty"><span>✦</span><h3>No integrations found</h3><p>Try another search or clear your category filter.</p><button className="button-dark" onClick={() => { setQuery(""); setCategory(CATEGORIES[0]); setSavedOnly(false); }}>Reset filters</button></div>}
      </section>

      <section className="integration-cta wrap">
        <span className="eyebrow">BUILDING A MORE CONNECTED EVERYDAY</span><h2>Let’s make useful connections.</h2><p>Explore Mio’s product direction, or visit the project to see how the experience is taking shape.</p><div><Link to="/developers" className="button-primary">Explore Mio <ArrowRight size={17} /></Link><a href="https://github.com/harryexson/MioBOT-Ai-Assistant" target="_blank" rel="noreferrer" className="button-dark">View the project</a></div>
      </section>
    </main>
    <Footer />
    </>
  );
}
