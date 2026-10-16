import { useState } from "react";
import { IconFood,IconNFC,IconPayments,IconServices,IconMore } from '../components/MioIcons.jsx';
import TrendingUpIcon from "icon:trending-up";
import ShoppingBagIcon from "icon:shopping-bag";
import UsersIcon from "icon:users";
import DollarSignIcon from "icon:dollar-sign";
import PackageIcon from "icon:package";
import CalendarIcon from "icon:calendar";
import MessageSquareIcon from "icon:message-square";
import SettingsIcon from "icon:settings";
import BellIcon from "icon:bell";
import CheckCircleIcon from "icon:check-circle";
import ClockIcon from "icon:clock";
import XCircleIcon from "icon:x-circle";
import BarChart2Icon from "icon:bar-chart-2";
import StarIcon from "icon:star";
import PlusIcon from "icon:plus";
import FilterIcon from "icon:filter";

const TABS = ["Overview", "Orders", "Products", "Bookings", "Customers", "Analytics", "Team", "Integrations"];

const STATS = [
  { label: "Total Revenue", value: "$24,891", change: "+18.2%", up: true, icon: DollarSignIcon, color: "violet" },
  { label: "Orders Today", value: "143", change: "+11%", up: true, icon: ShoppingBagIcon, color: "indigo" },
  { label: "Active Customers", value: "2,841", change: "+6.4%", up: true, icon: UsersIcon, color: "purple" },
  { label: "Avg. Order Value", value: "$74.10", change: "-2.1%", up: false, icon: TrendingUpIcon, color: "blue" },
];

const ORDERS = [
  { id: "#5821", customer: "Alex Rivera", items: "Chicken Burger + Fries", total: "$18.90", status: "delivered", time: "2 min ago" },
  { id: "#5820", customer: "Mia Chen", items: "Salmon Salad (x2)", total: "$34.00", status: "preparing", time: "8 min ago" },
  { id: "#5819", customer: "Dan Okafor", items: "Veggie Pizza", total: "$22.50", status: "pending", time: "12 min ago" },
  { id: "#5818", customer: "Sara López", items: "Steak Meal + Drink", total: "$46.00", status: "delivered", time: "28 min ago" },
  { id: "#5817", customer: "James Wu", items: "BBQ Wings", total: "$15.80", status: "cancelled", time: "41 min ago" },
];

const PRODUCTS = [
  { name: "Chicken Burger", category: "Main", price: "$12.90", stock: "Available", orders: 284, rating: 4.8 },
  { name: "Veggie Pizza", category: "Main", price: "$14.50", stock: "Available", orders: 198, rating: 4.6 },
  { name: "Salmon Salad", category: "Salads", price: "$17.00", stock: "Available", orders: 145, rating: 4.9 },
  { name: "BBQ Wings", category: "Starters", price: "$9.90", stock: "Low Stock", orders: 312, rating: 4.7 },
  { name: "Steak Meal", category: "Main", price: "$26.00", stock: "Available", orders: 89, rating: 4.9 },
];

const TEAM = [
  { name: "Jordan Mills", role: "Manager", email: "jordan@bistro.com", status: "active" },
  { name: "Chloe Park", role: "Staff", email: "chloe@bistro.com", status: "active" },
  { name: "Ben Torres", role: "Staff", email: "ben@bistro.com", status: "offline" },
];

const STATUS_STYLE = {
  delivered: "bg-emerald-500/20 text-emerald-300",
  preparing: "bg-amber-500/20 text-amber-300",
  pending: "bg-sky-500/20 text-sky-300",
  cancelled: "bg-red-500/20 text-red-300",
};

const STATUS_ICON = {
  delivered: CheckCircleIcon,
  preparing: ClockIcon,
  pending: ClockIcon,
  cancelled: XCircleIcon,
};

function Sidebar({ active, onSelect }) {
  const items = [
    { label: "Overview", icon: BarChart2Icon },
    { label: "Orders", icon: ShoppingBagIcon },
    { label: "Products", icon: PackageIcon },
    { label: "Bookings", icon: CalendarIcon },
    { label: "Customers", icon: UsersIcon },
    { label: "Analytics", icon: TrendingUpIcon },
    { label: "Team", icon: UsersIcon },
    { label: "Integrations", icon: SettingsIcon },
  ];
  return (
    <nav className="hidden lg:flex flex-col w-56 shrink-0 bg-white/[0.03] border-r border-white/8 py-6 px-3 gap-1" aria-label="Dashboard navigation">
      <div className="px-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center font-display font-bold text-navy text-sm">M</div>
          <div>
            <p className="text-navy text-sm font-semibold leading-none">Mio Merchant</p>
            <p className="text-gray-500 text-xs mt-0.5">The Urban Bistro</p>
          </div>
        </div>
      </div>
      {items.map(({ label, icon: Icon }) => (
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

function StatCard({ label, value, change, up, icon: Icon, color }) {
  const colors = {
    violet: "from-violet-600/20 to-violet-500/5 border-violet-500/20",
    indigo: "from-indigo-600/20 to-indigo-500/5 border-indigo-500/20",
    purple: "from-purple-600/20 to-purple-500/5 border-purple-500/20",
    blue: "from-blue-600/20 to-blue-500/5 border-blue-500/20",
  };
  const iconColors = {
    violet: "text-violet-400",
    indigo: "text-indigo-400",
    purple: "text-purple-400",
    blue: "text-blue-400",
  };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} border rounded-xl p-4`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-gray-600 text-xs font-medium">{label}</p>
        <Icon size={16} className={iconColors[color]} />
      </div>
      <p className="text-navy text-2xl font-display font-bold">{value}</p>
      <p className={`text-xs mt-1 ${up ? "text-emerald-400" : "text-red-400"}`}>{change} this week</p>
    </div>
  );
}

function OverviewTab() {
  const chartBars = [60, 80, 55, 90, 70, 95, 85];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>
      {/* Revenue chart */}
      <div className="bg-white border border-border shadow-sm rounded-xl p-5">
        <h3 className="text-navy font-semibold mb-4">Weekly Revenue</h3>
        <div className="flex items-end gap-2 h-32">
          {chartBars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-sm bg-gradient-to-t from-violet-600 to-violet-400 transition-all"
                style={{ height: `${h}%` }}
                role="img"
                aria-label={`${days[i]}: ${h}% of peak`}
              />
              <span className="text-gray-500 text-xs">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Recent orders preview */}
      <div className="bg-white border border-border shadow-sm rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-navy font-semibold">Recent Orders</h3>
          <span className="text-xs text-violet-400 font-medium">Live updates</span>
        </div>
        <div className="space-y-3">
          {ORDERS.slice(0, 3).map((o) => {
            const StatusIcon = STATUS_ICON[o.status];
            return (
              <div key={o.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <StatusIcon size={14} className={o.status === "delivered" ? "text-emerald-400" : o.status === "cancelled" ? "text-red-400" : "text-amber-400"} />
                  <div>
                    <p className="text-navy text-sm font-medium">{o.customer}</p>
                    <p className="text-gray-500 text-xs">{o.items}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-navy text-sm font-semibold">{o.total}</p>
                  <p className="text-gray-500 text-xs">{o.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OrdersTab() {
  return (
    <div className="bg-white border border-border shadow-sm rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-navy font-semibold">All Orders</h3>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/8 text-gray-600 text-xs hover:bg-white/12 transition-colors">
          <FilterIcon size={12} /> Filter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="text-left border-b border-white/8">
              <th scope="col" className="pb-3 text-gray-500 text-xs font-medium pr-4">Order</th>
              <th scope="col" className="pb-3 text-gray-500 text-xs font-medium pr-4">Customer</th>
              <th scope="col" className="pb-3 text-gray-500 text-xs font-medium pr-4 hidden sm:table-cell">Items</th>
              <th scope="col" className="pb-3 text-gray-500 text-xs font-medium pr-4">Total</th>
              <th scope="col" className="pb-3 text-gray-500 text-xs font-medium pr-4">Status</th>
              <th scope="col" className="pb-3 text-gray-500 text-xs font-medium">Time</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((o) => (
              <tr key={o.id} className="border-b border-white/5 last:border-0">
                <td className="py-3 pr-4 text-violet-400 text-sm font-mono">{o.id}</td>
                <td className="py-3 pr-4 text-navy text-sm">{o.customer}</td>
                <td className="py-3 pr-4 text-gray-500 text-xs hidden sm:table-cell">{o.items}</td>
                <td className="py-3 pr-4 text-navy text-sm font-semibold">{o.total}</td>
                <td className="py-3 pr-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLE[o.status]}`}>{o.status}</span>
                </td>
                <td className="py-3 text-gray-500 text-xs">{o.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductsTab() {
  return (
    <div className="bg-white border border-border shadow-sm rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-navy font-semibold">Menu & Products</h3>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg gradient-bg text-navy text-xs font-medium hover:opacity-90 transition-opacity">
          <PlusIcon size={12} /> Add Item
        </button>
      </div>
      <div className="space-y-3">
        {PRODUCTS.map((p) => (
          <div key={p.name} className="flex items-center justify-between p-3 rounded-lg bg-white/4 border border-white/6 hover:bg-white/6 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-violet-600/20 flex items-center justify-center"><IconFood size={20} color="#7c3aed" /></div>
              <div>
                <p className="text-navy text-sm font-medium">{p.name}</p>
                <p className="text-gray-500 text-xs">{p.category} · {p.orders} orders</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-1">
                <StarIcon size={12} className="text-amber-400" />
                <span className="text-gray-600 text-xs">{p.rating}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs ${p.stock === "Available" ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"}`}>{p.stock}</span>
              <p className="text-navy font-semibold text-sm">{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamTab() {
  return (
    <div className="bg-white border border-border shadow-sm rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-navy font-semibold">Team Members</h3>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg gradient-bg text-navy text-xs font-medium hover:opacity-90 transition-opacity">
          <PlusIcon size={12} /> Invite
        </button>
      </div>
      <div className="space-y-3">
        {TEAM.map((m) => (
          <div key={m.name} className="flex items-center justify-between p-3 rounded-lg bg-white/4 border border-white/6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-navy font-bold text-sm">
                {m.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-navy text-sm font-medium">{m.name}</p>
                <p className="text-gray-500 text-xs">{m.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-xs bg-white/8 px-2 py-0.5 rounded-full">{m.role}</span>
              <span className={`w-2 h-2 rounded-full ${m.status === "active" ? "bg-emerald-400" : "bg-white/20"}`} aria-label={m.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IntegrationsTab() {
  const integrations = [
    { name: "Mio AI Assistant", desc: "Voice & chat ordering enabled", connected: true, Icon: IconMore },
    { name: "EasyTap Go NFC", desc: "In-store tap-to-order integration", connected: true, Icon: IconNFC },
    { name: "Stripe Payments", desc: "Secure card & wallet processing", connected: true, Icon: IconPayments },
    { name: "DoorDash Drive", desc: "Third-party delivery network", connected: false, icon: "🚗" },
    { name: "Google Calendar", desc: "Booking sync & appointments", connected: false, Icon: IconServices },
  ];
  return (
    <div className="bg-white border border-border shadow-sm rounded-xl p-5">
      <h3 className="text-navy font-semibold mb-5">Connected Services</h3>
      <div className="space-y-3">
        {integrations.map((i) => (
          <div key={i.name} className="flex items-center justify-between p-3 rounded-lg bg-white/4 border border-white/6">
            <div className="flex items-center gap-3">
              <span className="text-xl" aria-hidden="true">{i.icon}</span>
              <div>
                <p className="text-navy text-sm font-medium">{i.name}</p>
                <p className="text-gray-500 text-xs">{i.desc}</p>
              </div>
            </div>
            <button
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                i.connected
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "bg-white/8 text-gray-500 hover:bg-white/12"
              }`}
              aria-pressed={i.connected}
            >
              {i.connected ? "Connected" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const TAB_CONTENT = {
  Overview: OverviewTab,
  Orders: OrdersTab,
  Products: ProductsTab,
  Bookings: () => (
    <div className="bg-white border border-border shadow-sm rounded-xl p-10 text-center">
      <CalendarIcon size={32} className="text-violet-400 mx-auto mb-3" />
      <p className="text-navy font-semibold mb-1">Bookings & Appointments</p>
      <p className="text-gray-500 text-sm">Your upcoming reservations and service bookings appear here.</p>
    </div>
  ),
  Customers: () => (
    <div className="bg-white border border-border shadow-sm rounded-xl p-10 text-center">
      <UsersIcon size={32} className="text-violet-400 mx-auto mb-3" />
      <p className="text-navy font-semibold mb-1">Customer Profiles</p>
      <p className="text-gray-500 text-sm">View customer order history, preferences, and engagement data.</p>
    </div>
  ),
  Analytics: () => (
    <div className="bg-white border border-border shadow-sm rounded-xl p-10 text-center">
      <BarChart2Icon size={32} className="text-violet-400 mx-auto mb-3" />
      <p className="text-navy font-semibold mb-1">Advanced Analytics</p>
      <p className="text-gray-500 text-sm">Detailed revenue, conversion, and customer behaviour reports.</p>
    </div>
  ),
  Team: TeamTab,
  Integrations: IntegrationsTab,
};

export default function MerchantDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const TabContent = TAB_CONTENT[activeTab] || OverviewTab;

  return (
    <main className="min-h-screen bg-white pt-16">
      {/* Page header */}
      <header className="border-b border-white/8 bg-white/80 backdrop-blur-sm sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <h1 className="text-navy font-display font-bold text-lg">Merchant Dashboard</h1>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30">Live</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg text-gray-500 hover:text-navy hover:bg-white/8 transition-colors" aria-label="Notifications">
                <BellIcon size={18} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-violet-400 rounded-full" aria-hidden="true" />
              </button>
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-navy font-bold text-sm" aria-label="Merchant profile">J</div>
            </div>
          </div>
          {/* Mobile tabs */}
          <div className="flex gap-1 overflow-x-auto pb-0 -mb-px lg:hidden">
            {TABS.map((t) => (
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
        <Sidebar active={activeTab} onSelect={setActiveTab} />
        <div className="flex-1 min-w-0">
          <TabContent />
        </div>
      </div>
    </main>
  );
}
