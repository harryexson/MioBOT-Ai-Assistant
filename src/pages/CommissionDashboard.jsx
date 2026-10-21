import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { pb, backendConfigured } from "../lib/pb";
import { useAuth } from "../lib/useAuth";
import { SEED_COMMISSIONS } from "../data/commissions";
const money = value => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
export default function CommissionDashboard() {
  const { user } = useAuth();
  const preview = !backendConfigured;
  const [records, setRecords] = useState(preview ? SEED_COMMISSIONS : []);
  const [filter, setFilter] = useState("all");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    if (preview || !user) return;
    const controller = new AbortController();
    pb.collection("commissions").getList(1, 100, { sort: "-created", filter: pb.filter("user_id = {:id}", { id: user.id }), signal: controller.signal })
      .then(result => { if (!controller.signal.aborted) setRecords(result.items); })
      .catch(error => { if (!error.isAbort && !controller.signal.aborted) setNotice("Commission data could not be loaded. Please try again later."); });
    return () => controller.abort();
  }, [preview, user?.id]);
  if (!preview && !user) return <Navigate to="/signin?next=/commissions" replace />;
  const sum = status => records.filter(row => !status || row.status === status).reduce((total,row) => total + Number(row.commission_earned || 0), 0);
  const visible = records.filter(row => filter === "all" || row.status === filter);
  return <main id="main" className="wrap platform-section commission-workspace">
    <span className="eyebrow"><TrendingUp size={15} /> MIO / COMMISSION WORKSPACE</span>
    <h1>Your connections.<br /><span>The bigger picture.</span></h1>
    <p className="platform-intro">{preview ? "Explore the commission workspace with sample transactions. These figures are illustrative earnings, not money received by Mio." : "Commission records associated with your account."}</p>
    <div className="commission-stats">{[["Total recorded",sum()], ["Paid",sum("paid")], ["Pending",sum("pending")], ["Records",records.length]].map(([label,value],i) => <article key={label}><span>{preview ? "Sample " : ""}{label}</span><b>{i === 3 ? value : money(value)}</b></article>)}</div>
    <div className="category-filters" aria-label="Commission status">{["all","pending","confirmed","paid"].map(status => <button key={status} onClick={() => setFilter(status)} aria-pressed={filter === status} className={filter === status ? "active" : ""}>{status}</button>)}</div>
    {notice && <p role="alert" className="connection-note">{notice}</p>}
    <div className="commission-table"><table><caption>{preview ? "Sample commission ledger" : "Your commission ledger"}</caption><thead><tr><th>Partner</th><th>Category</th><th>Order value</th><th>Commission</th><th>Status</th></tr></thead><tbody>{visible.map((row,i) => <tr key={row.id || i}><td>{row.partner}</td><td>{row.category}</td><td>{money(row.order_value || 0)}</td><td>{money(row.commission_earned || 0)}</td><td><span>{row.status}</span></td></tr>)}</tbody></table>{!visible.length && <p className="connection-note">No commission records in this view.</p>}</div>
    <Link className="text-link" to="/providers">Explore partner applications <ArrowUpRight size={16} /></Link>
  </main>;
}
