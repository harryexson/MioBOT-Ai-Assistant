import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { pb } from "../lib/pb.js";
import { useAuth } from "../lib/useAuth.jsx";

const PLAN_COLORS = {
  free: { bg: "#f3f4f6", text: "#374151", label: "Free" },
  personal: { bg: "#ede9fe", text: "#7c3aed", label: "Personal" },
  business: { bg: "#fef3c7", text: "#d97706", label: "Business" },
  enterprise: { bg: "#dbeafe", text: "#1d4ed8", label: "Enterprise" },
};

const PLAN_LIMITS = {
  free: { searches: 10, orders: 5, price: "Free" },
  personal: { searches: 500, orders: 100, price: "$9.99/mo" },
  business: { searches: 5000, orders: 1000, price: "$29.99/mo" },
  enterprise: { searches: "∞", orders: "∞", price: "$99.99/mo" },
};

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      padding: "24px",
      border: "1px solid #f0f0f5",
      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12,
        background: color + "18",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
      </div>
      <div style={{ fontSize: 28, fontFamily: "Manrope,sans-serif", fontWeight: 800, color: "#0f1035", lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 13, fontFamily: "Space Grotesk,sans-serif", fontWeight: 600, color: "#374151" }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: "#9ca3af", fontFamily: "Space Grotesk,sans-serif" }}>{sub}</div>}
    </div>
  );
}

function OrderCard({ order }) {
  const statusColor = {
    pending: "#f59e0b", processing: "#3b82f6", delivered: "#10b981",
    completed: "#10b981", cancelled: "#ef4444",
  }[order.status] || "#6b7280";

  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      padding: "16px 20px",
      border: "1px solid #f0f0f5",
      display: "flex",
      alignItems: "center",
      gap: 16,
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: "#f5f3ff",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "Manrope,sans-serif", fontWeight: 700, color: "#0f1035", fontSize: 14, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {order.merchant_name || "Order"}
        </div>
        <div style={{ fontSize: 12, color: "#6b7280", fontFamily: "Space Grotesk,sans-serif" }}>
          {order.category} · {new Date(order.created).toLocaleDateString()}
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, color: "#0f1035", fontSize: 15 }}>
          ${(order.total_amount || 0).toFixed(2)}
        </div>
        <span style={{
          display: "inline-block",
          background: statusColor + "18",
          color: statusColor,
          fontSize: 11,
          fontWeight: 700,
          borderRadius: 20,
          padding: "2px 10px",
          fontFamily: "Space Grotesk,sans-serif",
          textTransform: "capitalize",
          marginTop: 2,
        }}>{order.status}</span>
      </div>
    </div>
  );
}

function SearchCard({ search }) {
  const catIcon = {
    shopping: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></>,
    food: <><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></>,
    travel: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/></>,
    services: <><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>,
  }[search.category] || <circle cx="11" cy="11" r="8"/>;

  return (
    <div style={{
      background: "#fafafa",
      borderRadius: 10,
      padding: "12px 16px",
      border: "1px solid #f0f0f5",
      display: "flex",
      alignItems: "center",
      gap: 12,
    }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {catIcon}
      </svg>
      <div style={{ flex: 1, fontFamily: "Space Grotesk,sans-serif", fontSize: 14, color: "#374151", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {search.query}
      </div>
      <div style={{ fontSize: 11, color: "#9ca3af", fontFamily: "Space Grotesk,sans-serif", flexShrink: 0 }}>
        {new Date(search.created).toLocaleDateString()}
      </div>
    </div>
  );
}

export default function UserDashboard() {
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [searches, setSearches] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    const controller = new AbortController();
    async function load() {
      try {
        const [ordersRes, searchesRes, subsRes] = await Promise.all([
          pb.collection("orders").getList(1, 20, {
            sort: "-created",
            signal: controller.signal,
          }).catch(() => ({ items: [] })),
          pb.collection("searches").getList(1, 20, {
            sort: "-created",
            signal: controller.signal,
          }).catch(() => ({ items: [] })),
          pb.collection("subscriptions").getList(1, 1, {
            sort: "-created",
            filter: `status = "active"`,
            signal: controller.signal,
          }).catch(() => ({ items: [] })),
        ]);
        setOrders(ordersRes.items || []);
        setSearches(searchesRes.items || []);
        setSubscription(subsRes.items?.[0] || null);
      } catch (e) {
        if (!e?.isAbort) console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  const plan = user?.plan || "free";
  const planInfo = PLAN_COLORS[plan] || PLAN_COLORS.free;
  const planLimits = PLAN_LIMITS[plan] || PLAN_LIMITS.free;
  const totalSpent = orders.reduce((s, o) => s + (o.total_amount || 0), 0);
  const tabs = ["overview", "orders", "searches", "subscription"];

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8fc", fontFamily: "Space Grotesk,sans-serif" }}>
      {/* Header */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #f0f0f5",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <span style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 22, color: "#0f1035", letterSpacing: "-0.04em" }}>Mio</span>
            </button>
            <span style={{ color: "#d1d5db", fontSize: 18 }}>|</span>
            <span style={{ fontWeight: 600, color: "#374151", fontSize: 15 }}>My Dashboard</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              background: planInfo.bg, color: planInfo.text,
              fontSize: 12, fontWeight: 700, borderRadius: 20, padding: "4px 12px",
            }}>{planInfo.label}</span>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 800, fontSize: 14, fontFamily: "Manrope,sans-serif",
            }}>
              {(user?.name || user?.email || "U")[0].toUpperCase()}
            </div>
            <button onClick={() => { logout(); navigate("/"); }} style={{
              background: "none", border: "1px solid #e5e7eb", borderRadius: 8,
              padding: "6px 14px", fontSize: 13, color: "#374151", cursor: "pointer",
              fontFamily: "Space Grotesk,sans-serif", fontWeight: 600,
            }}>Sign Out</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {/* Welcome */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: "clamp(24px,4vw,36px)", color: "#0f1035", margin: 0, letterSpacing: "-0.03em" }}>
            Welcome back, {user?.name?.split(" ")[0] || "there"} 👋
          </h1>
          <p style={{ color: "#6b7280", marginTop: 6, fontSize: 15 }}>
            Here's everything happening with your Mio account.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, background: "#f3f4f6", borderRadius: 12, padding: 4, marginBottom: 32, width: "fit-content" }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              background: activeTab === tab ? "#fff" : "transparent",
              border: "none", borderRadius: 8, padding: "8px 18px",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              color: activeTab === tab ? "#0f1035" : "#6b7280",
              boxShadow: activeTab === tab ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              fontFamily: "Space Grotesk,sans-serif",
              textTransform: "capitalize",
              transition: "all 0.15s",
            }}>{tab}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#9ca3af" }}>
            <div style={{ fontSize: 15 }}>Loading your dashboard...</div>
          </div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div>
                {/* Stats */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 32 }}>
                  <StatCard
                    icon={<><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>}
                    label="Total Orders" value={orders.length} sub="All time" color="#7c3aed"
                  />
                  <StatCard
                    icon={<><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>}
                    label="Total Spent" value={`$${totalSpent.toFixed(2)}`} sub="Across all orders" color="#10b981"
                  />
                  <StatCard
                    icon={<><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>}
                    label="Searches" value={searches.length} sub="Saved queries" color="#3b82f6"
                  />
                  <StatCard
                    icon={<><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></>}
                    label="Plan" value={planInfo.label} sub={planLimits.price} color="#f59e0b"
                  />
                </div>

                {/* Recent activity — 2 columns */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f0f0f5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <h3 style={{ margin: 0, fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 16, color: "#0f1035" }}>Recent Orders</h3>
                      <button onClick={() => setActiveTab("orders")} style={{ background: "none", border: "none", color: "#7c3aed", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>View all →</button>
                    </div>
                    {orders.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "32px 0", color: "#9ca3af" }}>
                        <div style={{ fontSize: 32, marginBottom: 8 }}>🛍️</div>
                        <div style={{ fontSize: 14 }}>No orders yet.<br />Start shopping with Mio!</div>
                        <button onClick={() => navigate("/voice")} style={{
                          marginTop: 16, background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                          color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px",
                          fontSize: 13, fontWeight: 700, cursor: "pointer",
                        }}>Search & Shop</button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {orders.slice(0, 4).map(o => <OrderCard key={o.id} order={o} />)}
                      </div>
                    )}
                  </div>

                  <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f0f0f5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <h3 style={{ margin: 0, fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 16, color: "#0f1035" }}>Recent Searches</h3>
                      <button onClick={() => setActiveTab("searches")} style={{ background: "none", border: "none", color: "#7c3aed", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>View all →</button>
                    </div>
                    {searches.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "32px 0", color: "#9ca3af" }}>
                        <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
                        <div style={{ fontSize: 14 }}>No searches yet.<br />Try asking Mio something!</div>
                        <button onClick={() => navigate("/voice")} style={{
                          marginTop: 16, background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                          color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px",
                          fontSize: 13, fontWeight: 700, cursor: "pointer",
                        }}>Ask Mio</button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {searches.slice(0, 6).map(s => <SearchCard key={s.id} search={s} />)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick actions */}
                <div style={{ marginTop: 24, background: "linear-gradient(135deg,#7c3aed,#4f46e5)", borderRadius: 20, padding: "28px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                  <div>
                    <h3 style={{ margin: 0, fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 20, color: "#fff" }}>
                      {plan === "free" ? "Upgrade for more" : "You're all set!"}
                    </h3>
                    <p style={{ margin: "6px 0 0", color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
                      {plan === "free"
                        ? "Get 500 searches, 100 orders, and priority support with Personal."
                        : `Your ${planInfo.label} plan gives you ${planLimits.searches} searches and ${planLimits.orders} orders per month.`}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <button onClick={() => navigate("/voice")} style={{
                      background: "#fff", color: "#7c3aed", border: "none", borderRadius: 10,
                      padding: "10px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer",
                    }}>Search with Mio</button>
                    {plan === "free" && (
                      <button onClick={() => navigate("/pricing")} style={{
                        background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: 10, padding: "10px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer",
                      }}>Upgrade Plan</button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f0f0f5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <h2 style={{ margin: "0 0 20px", fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 20, color: "#0f1035" }}>All Orders</h2>
                {orders.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" style={{ margin: "0 auto 16px", display: "block" }} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#374151", marginBottom: 8 }}>No orders yet</div>
                    <div style={{ fontSize: 14 }}>Your orders will appear here once you start shopping.</div>
                    <button onClick={() => navigate("/voice")} style={{
                      marginTop: 20, background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                      color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px",
                      fontSize: 14, fontWeight: 700, cursor: "pointer",
                    }}>Start Shopping</button>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {orders.map(o => <OrderCard key={o.id} order={o} />)}
                  </div>
                )}
              </div>
            )}

            {/* SEARCHES TAB */}
            {activeTab === "searches" && (
              <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f0f0f5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                <h2 style={{ margin: "0 0 20px", fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 20, color: "#0f1035" }}>Saved Searches</h2>
                {searches.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 0", color: "#9ca3af" }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" style={{ margin: "0 auto 16px", display: "block" }} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#374151", marginBottom: 8 }}>No searches yet</div>
                    <div style={{ fontSize: 14 }}>Every time you ask Mio something, it's saved here.</div>
                    <button onClick={() => navigate("/voice")} style={{
                      marginTop: 20, background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                      color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px",
                      fontSize: 14, fontWeight: 700, cursor: "pointer",
                    }}>Ask Mio</button>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {searches.map(s => <SearchCard key={s.id} search={s} />)}
                  </div>
                )}
              </div>
            )}

            {/* SUBSCRIPTION TAB */}
            {activeTab === "subscription" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
                <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f0f0f5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <h2 style={{ margin: "0 0 20px", fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 20, color: "#0f1035" }}>Current Plan</h2>
                  <div style={{
                    background: `linear-gradient(135deg, ${planInfo.bg}, ${planInfo.bg}cc)`,
                    borderRadius: 14, padding: "24px", border: `1px solid ${planInfo.text}22`,
                    marginBottom: 20,
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: planInfo.text, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.1em" }}>Active Plan</div>
                    <div style={{ fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 32, color: "#0f1035" }}>{planInfo.label}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: planInfo.text, marginTop: 4 }}>{planLimits.price}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { label: "Searches per month", value: planLimits.searches.toLocaleString?.() || planLimits.searches },
                      { label: "Orders per month", value: planLimits.orders.toLocaleString?.() || planLimits.orders },
                      { label: "AI voice search", value: plan !== "free" ? "✓ Included" : "—" },
                      { label: "Priority support", value: plan === "business" || plan === "enterprise" ? "✓ Included" : "—" },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
                        <span style={{ color: "#374151", fontSize: 14 }}>{label}</span>
                        <span style={{ fontWeight: 700, color: "#0f1035", fontSize: 14 }}>{value}</span>
                      </div>
                    ))}
                  </div>
                  {plan === "free" && (
                    <button onClick={() => navigate("/pricing")} style={{
                      marginTop: 24, width: "100%",
                      background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
                      color: "#fff", border: "none", borderRadius: 12,
                      padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer",
                    }}>Upgrade Plan</button>
                  )}
                </div>

                <div style={{ background: "#fff", borderRadius: 16, padding: 28, border: "1px solid #f0f0f5", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
                  <h2 style={{ margin: "0 0 20px", fontFamily: "Manrope,sans-serif", fontWeight: 800, fontSize: 20, color: "#0f1035" }}>Account Details</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {[
                      { label: "Name", value: user?.name || "—" },
                      { label: "Email", value: user?.email || "—" },
                      { label: "Member since", value: user?.created ? new Date(user.created).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "—" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{label}</div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "#0f1035" }}>{value}</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => { logout(); navigate("/"); }} style={{
                    marginTop: 32, width: "100%",
                    background: "#fff", color: "#ef4444", border: "1px solid #fecaca",
                    borderRadius: 12, padding: "12px", fontSize: 14, fontWeight: 700, cursor: "pointer",
                  }}>Sign Out</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 640px) {
          .dash-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
