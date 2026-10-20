import { useState } from "react";
import { Shield as ShieldIcon } from "lucide-react";
import { Users as UsersIcon } from "lucide-react";
import { Server as ServerIcon } from "lucide-react";
import { AlertTriangle as AlertTriangleIcon } from "lucide-react";
import { CheckCircle as CheckCircleIcon } from "lucide-react";
import { Activity as ActivityIcon } from "lucide-react";
import { Globe as GlobeIcon } from "lucide-react";
import { Key as KeyIcon } from "lucide-react";
import { BarChart2 as BarChart2Icon } from "lucide-react";
import { Bell as BellIcon } from "lucide-react";
import { Settings as SettingsIcon } from "lucide-react";
import { XCircle as XCircleIcon } from "lucide-react";
import { RefreshCw as RefreshCwIcon } from "lucide-react";

const PLATFORM_STATS = [
  { label: "Total Merchants", value: "52,841", change: "+312 this week", up: true, icon: UsersIcon },
  { label: "API Calls / Day", value: "14.2M", change: "+8.4%", up: true, icon: ActivityIcon },
  { label: "Platform Revenue", value: "$1.84M", change: "+22.1%", up: true, icon: BarChart2Icon },
  { label: "Active Incidents", value: "0", change: "All systems nominal", up: true, icon: ShieldIcon },
];

const PROVIDERS = [
  { name: "Retail Shopping", providers: 8, status: "healthy", calls: "3.2M", latency: "112ms" },
  { name: "Restaurants & Food", providers: 14, status: "healthy", calls: "4.8M", latency: "98ms" },
  { name: "Hotels & Travel", providers: 6, status: "degraded", calls: "1.1M", latency: "340ms" },
  { name: "Flights", providers: 4, status: "healthy", calls: "820K", latency: "204ms" },
  { name: "Transportation", providers: 5, status: "healthy", calls: "1.4M", latency: "88ms" },
  { name: "Events & Tickets", providers: 3, status: "healthy", calls: "680K", latency: "131ms" },
  { name: "Payments", providers: 7, status: "healthy", calls: "2.9M", latency: "44ms" },
  { name: "NFC / EasyTap Go", providers: 2, status: "healthy", calls: "540K", latency: "62ms" },
];

const SECURITY_EVENTS = [
  { type: "Rate Limit Exceeded", source: "merchant_7821", severity: "warning", time: "4 min ago" },
  { type: "Invalid API Key Attempt", source: "ip:203.88.12.44", severity: "critical", time: "17 min ago" },
  { type: "Merchant Approved", source: "The Urban Bistro", severity: "info", time: "1 hr ago" },
  { type: "Provider Timeout", source: "Hotel API – Tier 2", severity: "warning", time: "2 hr ago" },
  { type: "New Merchant Signup", source: "Apex Retail Co.", severity: "info", time: "3 hr ago" },
];

const PENDING_MERCHANTS = [
  { name: "Blue Ridge Pharmacy", category: "Retail", submitted: "2 days ago" },
  { name: "Nomad Eats", category: "Restaurant", submitted: "3 days ago" },
  { name: "Skyline Hotels Group", category: "Hotels", submitted: "5 days ago" },
];

const SIDEBAR_ITEMS = [
  { label: "Overview", icon: BarChart2Icon },
  { label: "Providers", icon: GlobeIcon },
  { label: "Merchants", icon: UsersIcon },
  { label: "API Keys", icon: KeyIcon },
  { label: "Security", icon: ShieldIcon },
  { label: "Health", icon: ActivityIcon },
  { label: "Settings", icon: SettingsIcon },
];

function AdminSidebar({ active, onSelect }) {
  return (
    <nav className="hidden lg:flex flex-col w-56 shrink-0 bg-white/[0.03] border-r border-white/8 py-6 px-3 gap-1" aria-label="Admin navigation">
      <div className="px-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-600/80 flex items-center justify-center">
            <ShieldIcon size={14} className="text-navy" />
          </div>
          <div>
            <p className="text-navy text-sm font-semibold leading-none">Mio Platform</p>
            <p className="text-gray-500 text-xs mt-0.5">Admin Console</p>
          </div>
        </div>
      </div>
      {SIDEBAR_ITEMS.map(({ label, icon: Icon }) => (
        <button
          key={label}
          onClick={() => onSelect(label)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left w-full ${
            active === label
              ? "bg-violet-600/30 text-navy border border-violet-500/30"
              : "text-gray-500 hover:text-navy hover:bg-white/5"
          }`}
          aria-current={active === label ? "page" : undefined}
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
    </nav>
  );
}

function HealthDot({ status }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${status === "healthy" ? "bg-emerald-400" : status === "degraded" ? "bg-amber-400" : "bg-red-400"}`}
      aria-label={status}
    />
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PLATFORM_STATS.map((s) => (
          <div key={s.label} className="bg-white border border-border shadow-sm rounded-xl p-4 border border-white/8">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-500 text-xs">{s.label}</p>
              <s.icon size={14} className="text-violet-400" />
            </div>
            <p className="text-navy text-2xl font-display font-bold">{s.value}</p>
            <p className={`text-xs mt-1 ${s.up ? "text-emerald-400" : "text-red-400"}`}>{s.change}</p>
          </div>
        ))}
      </div>

      {/* Provider health */}
      <div className="bg-white border border-border shadow-sm rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-navy font-semibold">Provider Health</h3>
          <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors">
            <RefreshCwIcon size={12} /> Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px]">
            <thead>
              <tr className="border-b border-white/8 text-left">
                <th scope="col" className="pb-3 text-gray-500 text-xs font-medium pr-4">Category</th>
                <th scope="col" className="pb-3 text-gray-500 text-xs font-medium pr-4">Providers</th>
                <th scope="col" className="pb-3 text-gray-500 text-xs font-medium pr-4">Status</th>
                <th scope="col" className="pb-3 text-gray-500 text-xs font-medium pr-4">Calls Today</th>
                <th scope="col" className="pb-3 text-gray-500 text-xs font-medium">Latency</th>
              </tr>
            </thead>
            <tbody>
              {PROVIDERS.map((p) => (
                <tr key={p.name} className="border-b border-white/5 last:border-0">
                  <td className="py-3 pr-4 text-navy text-sm">{p.name}</td>
                  <td className="py-3 pr-4 text-gray-500 text-sm">{p.providers}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <HealthDot status={p.status} />
                      <span className="text-xs text-gray-600 capitalize">{p.status}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-gray-600 text-sm">{p.calls}</td>
                  <td className="py-3 text-gray-600 text-sm font-mono">{p.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security events */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white border border-border shadow-sm rounded-xl p-5">
          <h3 className="text-navy font-semibold mb-4">Security Events</h3>
          <div className="space-y-3">
            {SECURITY_EVENTS.map((e, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
                {e.severity === "critical" ? (
                  <XCircleIcon size={14} className="text-red-400 mt-0.5 shrink-0" />
                ) : e.severity === "warning" ? (
                  <AlertTriangleIcon size={14} className="text-amber-400 mt-0.5 shrink-0" />
                ) : (
                  <CheckCircleIcon size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-navy text-xs font-medium">{e.type}</p>
                  <p className="text-gray-500 text-xs truncate">{e.source}</p>
                </div>
                <span className="text-gray-500 text-xs shrink-0">{e.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-border shadow-sm rounded-xl p-5">
          <h3 className="text-navy font-semibold mb-4">Pending Merchant Approvals</h3>
          <div className="space-y-3">
            {PENDING_MERCHANTS.map((m) => (
              <div key={m.name} className="flex items-center justify-between p-3 rounded-lg bg-white/4 border border-white/6">
                <div>
                  <p className="text-navy text-sm font-medium">{m.name}</p>
                  <p className="text-gray-500 text-xs">{m.category} · Submitted {m.submitted}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-medium border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors">Approve</button>
                  <button className="px-2.5 py-1 rounded-lg bg-red-500/20 text-red-300 text-xs font-medium border border-red-500/30 hover:bg-red-500/30 transition-colors">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ADMIN_TABS = ["Overview", "Providers", "Merchants", "API Keys", "Security", "Health", "Settings"];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <main className="min-h-screen bg-white pt-16">
      <header className="border-b border-white/8 bg-white/80 backdrop-blur-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <h1 className="text-navy font-display font-bold text-lg">Platform Admin</h1>
              <span className="px-2 py-0.5 bg-violet-500/15 text-violet-200 text-xs rounded-full border border-violet-400/25">Preview</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg text-gray-500 hover:text-navy hover:bg-white/8 transition-colors" aria-label="Notifications">
                <BellIcon size={18} />
              </button>
              <div className="w-8 h-8 rounded-full bg-red-600/80 flex items-center justify-center text-navy font-bold text-sm" aria-label="Admin profile">A</div>
            </div>
          </div>
          <div className="flex gap-1 overflow-x-auto pb-0 -mb-px lg:hidden">
            {ADMIN_TABS.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`shrink-0 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                  activeTab === t
                    ? "border-violet-400 text-navy"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
                aria-current={activeTab === t ? "page" : undefined}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        <AdminSidebar active={activeTab} onSelect={setActiveTab} />
        <div className="flex-1 min-w-0">
          {activeTab === "Overview" ? (
            <OverviewTab />
          ) : (
            <div className="bg-white border border-border shadow-sm rounded-xl p-10 text-center">
              <ServerIcon size={32} className="text-violet-400 mx-auto mb-3" />
              <p className="text-navy font-semibold mb-1">{activeTab}</p>
              <p className="text-gray-500 text-sm">This section of the admin console is ready for configuration.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
