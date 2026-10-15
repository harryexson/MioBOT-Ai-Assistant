export default function CategoryCard({ icon, label, desc, delay = 0 }) {
  return (
    <div
      className="glass-violet rounded-2xl p-5 flex flex-col gap-3 hover:scale-105 transition-all duration-300 cursor-default group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="font-display font-semibold text-base" style={{ color: "#0f1035" }}>{label}</p>
        <p className="text-sm mt-0.5" style={{ color: "#4b5563" }}>{desc}</p>
      </div>
    </div>
  );
}
