export default function CategoryCard({ icon, label, desc, delay = 0 }) {
  return (
    <div
      className="glass rounded-2xl p-5 flex flex-col gap-3 hover:bg-white/10 transition-all duration-300 cursor-default group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <p className="font-display font-semibold text-white text-base">{label}</p>
        <p className="text-white/55 text-sm mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
