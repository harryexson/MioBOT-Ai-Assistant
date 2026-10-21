import { Navigate, useLocation } from "react-router";
import { useAuth } from "../lib/useAuth";
export default function ProtectedRoute({ children }) {
  const { isLoggedIn, isPending } = useAuth();
  const location = useLocation();
  if (isPending) return <main id="main" className="wrap platform-section" aria-busy="true">Loading your Mio account…</main>;
  return isLoggedIn ? children : <Navigate to={`/signin?next=${encodeURIComponent(location.pathname)}`} replace />;
}
