import { useState, useEffect } from "react";
import { pb } from "../lib/pb.js";

const SEED_COMMISSIONS = [
  { partner: "Amazon", category: "shopping", order_value: 89.99, commission_rate: 7, commission_earned: 6.30, status: "confirmed", created: "2026-10-15T10:21:00Z" },
  { partner: "DoorDash", category: "food", order_value: 34.50, commission_rate: 4, commission_earned: 1.38, status: "confirmed", created: "2026-10-15T11:05:00Z" },
  { partner: "Booking.com", category: "travel", order_value: 420.00, commission_rate: 5, commission_earned: 21.00, status: "pending", created: "2026-10-15T12:30:00Z" },
  { partner: "Ticketmaster", category: "events", order_value: 120.00, commission_rate: 5, commission_earned: 6.00, status: "confirmed", created: "2026-10-14T18:45:00Z" },
  { partner: "TaskRabbit", category: "services", order_value: 200.00, commission_rate: 15, commission_earned: 30.00, status: "paid", created: "2026-10-14T09:10:00Z" },
  { partner: "Uber", category: "transport", order_value: 22.00, commission_rate: 10, commission_earned: 2.20, status: "confirmed", created: "2026-10-13T17:22:00Z" },
  { partner: "Expedia", category: "travel", order_value: 650.00, commission_rate: 5, commission_earned: 32.50, status: "paid", created: "2026-10-13T14:11:00Z" },
  { partner: "Walmart", category: "shopping", order_value: 145.50, commission_rate: 3, commission_earned: 4.37, status: "confirmed", created: "2026-10-12T11:00:00Z" },
  { partner: "StubHub", category: "events", order_value: 280.00, commission_rate: 8, commission_earned: 22.40, status: "pending", created: "2026-10-12T20:15:00Z" },
  { partner: "Instacart", category: "food", order_value: 76.30, commission_rate: 4, commission_earned: 3.05, status: "paid", created: "2026-10-11T08:44:00Z" },
];

const CAT_COLORS = {
  shopping: "#7c3aed", food: "#f59e0b", travel: "#06b6d4",
  events: "#ec4899", services: "#22c55e", transport: "#f97316",
  health: "#84cc16", finance: "#a78bfa",
};

const STATUS_COLORS = { pending: "#f59e0b", confirmed: "#06b6d4", paid: "#22c55e" };

function StatCard({ label, value, sub, color }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "22px 24px" }}>
      <div style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: "1.9rem", fontWeight: 800, color: color || "#fff", fontFamily: "Manrope, sans-serif", marginBottom: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: "0.78rem", color: "#9ca3af" }}>{sub}</div>}
    </div>
  );
}

function MiniBar({ label, value, max, color }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: "0.82rem", color: "#c4c9d4", textTransform: "capitalize" }}>{label}</span>
        <span style={{ fontSize: "0.82rem", color: "#fff", fontWeight: 700 }}>${value.toFixed(2)}</span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.6s ease" }} />
      </div>
    </div>
  );
}

export default function CommissionDashboard() {
  const [commissions, setCommissions] = useState(SEED_COMMISSIONS);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    pb.collection("commission_ledger")
      .getList(1, 100, { sort: "-created", signal: controller.signal })
      .then(r => {
        if (r.items.length > 0) setCommissions(r.items);
      })
      .catch(err => { if (!err?.isAbort) console.error(err); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  const filtered = filter === "all" ? commissions : commissions.filter(c => c.status === filter);

  const totalEarned = commissions.reduce((s, c) => s + (c.commission_earned || 0), 0);
  const totalPaid = commissions.filter(c => c.status === "paid").reduce((s, c) => s + (c.commission_earned || 0), 0);
  const totalPending = commissions.filter(c => c.status === "pending").reduce((s, c) => s + (c.commission_earned || 0), 0);
  const totalOrders = commissions.length;

  // By category
  const byCat = {};
  commissions.forEach(c => { byCat[c.category] = (byCat[c.category] || 0) + (c.commission_earned || 0); });
  const maxCat = Math.max(...Object.values(byCat), 1);

  // By partner
  const byPartner = {};
  commissions.forEach(c => { byPartner[c.partner] = (byPartner[c.partner] || 0) + (c.commission_earned || 0); });
  const topPartners = Object.entries(byPartner).sort((a, b) => b[1] - a[1]).slice(0, 5);

  function fmt(date) {
    try { return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }); }
    catch { return date; }
  }

  return (
    <main style={{ minHeight: "100vh", background: "#05061a", fontFamily: "var(--font-sans, DM Sans, sans-serif)", padding: "40px 20px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 20, padding: "4px 14px", marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#a78bfa", letterSpacing: 1, textTransform: "uppercase" }}>Live Commission Dashboard</span>
          </div>
          <h1 style={{ fontFamily: "Manrope, sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, color: "#fff", margin: 0 }}>Your Earnings</h1>
          <p style={{ color: "#6b7280", marginTop: 6 }}>Real-time referral commissions across all connected partners</p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 36 }}>
          <StatCard label="Total Earned" value={`$${totalEarned.toFixed(2)}`} sub="All time" color="#a78bfa" />
          <StatCard label="Paid Out" value={`$${totalPaid.toFixed(2)}`} sub="Cleared commissions" color="#4ade80" />
          <StatCard label="Pending" value={`$${totalPending.toFixed(2)}`} sub="Awaiting confirmation" color="#fbbf24" />
          <StatCard label="Total Orders" value={totalOrders} sub="Referrals tracked" color="#67e8f9" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 36 }}>
          {/* By category */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "24px 22px" }}>
            <h2 style={{ fontFamily: "Manrope, sans-serif", color: "#fff", fontSize: "1rem", fontWeight: 700, marginBottom: 20 }}>Earnings by Category</h2>
            {Object.entries(byCat).sort((a, b) => b[1] - a[1]).map(([cat, val]) => (
              <MiniBar key={cat} label={cat} value={val} max={maxCat} color={CAT_COLORS[cat] || "#7c3aed"} />
            ))}
          </div>

          {/* Top partners */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "24px 22px" }}>
            <h2 style={{ fontFamily: "Manrope, sans-serif", color: "#fff", fontSize: "1rem", fontWeight: 700, marginBottom: 20 }}>Top Partners</h2>
            {topPartners.map(([name, val], i) => (
              <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, paddingBottom: 14, borderBottom: i < topPartners.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: `${CAT_COLORS[commissions.find(c => c.partner === name)?.category] || "#7c3aed"}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: CAT_COLORS[commissions.find(c => c.partner === name)?.category] || "#a78bfa" }}>{i + 1}</div>
                  <span style={{ color: "#e5e7eb", fontSize: "0.88rem", fontWeight: 600 }}>{name}</span>
                </div>
                <span style={{ color: "#a78bfa", fontWeight: 800, fontSize: "0.9rem" }}>${val.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction table */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "24px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 20, alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontFamily: "Manrope, sans-serif", color: "#fff", fontSize: "1rem", fontWeight: 700, margin: 0 }}>Transaction Log</h2>
            <div style={{ display: "flex", gap: 8 }}>
              {["all", "pending", "confirmed", "paid"].map(s => (
                <button key={s} onClick={() => setFilter(s)}
                  style={{ padding: "5px 12px", borderRadius: 8, border: "1px solid", borderColor: filter === s ? "#7c3aed" : "rgba(255,255,255,0.1)", background: filter === s ? "#7c3aed" : "transparent", color: filter === s ? "#fff" : "#6b7280", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>
                  {s === "all" ? "All" : s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Date", "Partner", "Category", "Order Value", "Rate", "Earned", "Status"].map(h => (
                    <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontSize: "0.72rem", color: "#6b7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, borderBottom: "1px solid rgba(255,255,255,0.07)", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "11px 12px", fontSize: "0.78rem", color: "#6b7280", whiteSpace: "nowrap" }}>{fmt(c.created)}</td>
                    <td style={{ padding: "11px 12px", fontSize: "0.85rem", color: "#e5e7eb", fontWeight: 600 }}>{c.partner}</td>
                    <td style={{ padding: "11px 12px" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: CAT_COLORS[c.category] || "#a78bfa", background: `${CAT_COLORS[c.category] || "#7c3aed"}1a`, padding: "2px 8px", borderRadius: 6, textTransform: "capitalize" }}>{c.category}</span>
                    </td>
                    <td style={{ padding: "11px 12px", fontSize: "0.85rem", color: "#c4c9d4" }}>${(c.order_value || 0).toFixed(2)}</td>
                    <td style={{ padding: "11px 12px", fontSize: "0.85rem", color: "#9ca3af" }}>{c.commission_rate || 0}%</td>
                    <td style={{ padding: "11px 12px", fontSize: "0.88rem", color: "#a78bfa", fontWeight: 800 }}>${(c.commission_earned || 0).toFixed(2)}</td>
                    <td style={{ padding: "11px 12px" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 700, color: STATUS_COLORS[c.status] || "#9ca3af", background: `${STATUS_COLORS[c.status] || "#374151"}1a`, padding: "3px 9px", borderRadius: 8, textTransform: "capitalize" }}>{c.status || "pending"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {loading && <p style={{ textAlign: "center", color: "#6b7280", padding: 24, fontSize: "0.85rem" }}>Loading your transactions…</p>}
        </div>
      </div>
    </main>
  );
}
