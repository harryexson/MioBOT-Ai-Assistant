import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../lib/useAuth.jsx";

/**
 * Wraps a page so only authenticated users can see it.
 * Unauthenticated visitors are redirected to the home page
 * where they can sign in via the modal.
 */
export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;
  return children;
}
