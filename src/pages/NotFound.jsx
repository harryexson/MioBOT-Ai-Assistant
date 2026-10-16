import { Link } from "react-router";
import ArrowRightIcon from "icon:arrow-right";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 text-center" style={{ background: "#fff" }}>
      <div>
        <p className="font-display font-800 text-8xl gradient-text mb-4">404</p>
        <h1 className="font-display font-700 text-3xl mb-3" style={{ color: "#0f1035" }}>Page not found</h1>
        <p className="mb-8" style={{ color: "#4b5563" }}>This page doesn't exist — but Mio can find you anything else.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all"
        >
          Back to Mio
          <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
