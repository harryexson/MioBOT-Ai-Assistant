import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Bookmark, Check, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router";
import IntegrationApplication from "../components/IntegrationApplication";
import { Footer } from "./Home";

import { PARTNERS, CATEGORIES } from "../data/partners";
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
  const [params] = useSearchParams();
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [query, setQuery] = useState(params.get("q") || "");
  useEffect(() => setQuery(params.get("q") || ""), [params]);
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
              <button type="button" className="partner-apply" onClick={() => setSelectedPartner(partner)} aria-label={`Explore ${partner[0]} application`}>Explore & apply <ArrowRight size={14} /></button>
            </article>
          ))}
        </div>
        {visible.length === 0 && <div className="integration-empty"><span>✦</span><h3>No integrations found</h3><p>Try another search or clear your category filter.</p><button className="button-dark" onClick={() => { setQuery(""); setCategory(CATEGORIES[0]); setSavedOnly(false); }}>Reset filters</button></div>}
      </section>

      <section className="integration-cta wrap">
        <span className="eyebrow">BUILDING A MORE CONNECTED EVERYDAY</span><h2>Let’s make useful connections.</h2><p>Explore Mio’s product direction, or visit the project to see how the experience is taking shape.</p><div><Link to="/developers" className="button-primary">Explore Mio <ArrowRight size={17} /></Link><a href="https://github.com/harryexson/MioBOT-Ai-Assistant" target="_blank" rel="noreferrer" className="button-dark">View the project</a></div>
      </section>
    </main>
    {selectedPartner && <IntegrationApplication partner={selectedPartner} onClose={() => setSelectedPartner(null)} />}
    <Footer />
    </>
  );
}
