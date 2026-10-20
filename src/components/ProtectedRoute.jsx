import { Navigate, useLocation } from "react-router";
import { useAuth } from "../lib/useAuth";
export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  return isLoggedIn ? children : <Navigate to={`/signin?next=${encodeURIComponent(location.pathname)}`} replace />;
}
