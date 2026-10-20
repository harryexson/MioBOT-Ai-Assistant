import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./lib/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import { Footer } from "./pages/Home";
const Search = lazy(() => import("./pages/Search"));
const VoiceSearch = lazy(() => import("./pages/VoiceSearch"));
const SignIn = lazy(() => import("./pages/SignIn"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const CommissionDashboard = lazy(() => import("./pages/CommissionDashboard"));
const About = lazy(() => import("./pages/About"));
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import Features from "./pages/Features";
import DeveloperPortal from "./pages/DeveloperPortal";
import WidgetDemo from "./pages/WidgetDemo";
import EasyTapGo from "./pages/EasyTapGo";
import Providers from "./pages/Providers";
import Experience from "./pages/Experience";
import Settings from "./pages/Settings";
import Marketing, { LegalPage, PricingPage } from "./pages/Marketing";
import MerchantDashboard from "./pages/MerchantDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
function Preview({ children }) {
  return (
    <>
      <div className="legacy-notice">
        Concept dashboard · All figures and actions are sample data. No live
        transactions.
      </div>
      {children}
    </>
  );
}
function Detail({ children, sample = false }) {
  return <div className="unified-detail">{sample && <p className="platform-notice">Interactive preview · Results, prices, availability, and transactions shown here are sample data.</p>}{children}<Footer /></div>;
}
export default function App() {
  return (
    <AuthProvider>
      <Nav />
      <Suspense fallback={<main id="main" className="wrap platform-section" aria-busy="true">Opening Mio…</main>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app" element={<Experience />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/features" element={<Features />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/easytap" element={<EasyTapGo />} />
        <Route path="/developers" element={<DeveloperPortal />} />
        <Route path="/widget" element={<WidgetDemo />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/business" element={<Marketing />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/search" element={<Detail sample><Search /></Detail>} />
        <Route path="/voice" element={<Detail sample><VoiceSearch /></Detail>} />
        <Route path="/signin" element={<Detail><SignIn /></Detail>} />
        <Route path="/dashboard" element={<ProtectedRoute><Detail><UserDashboard /></Detail></ProtectedRoute>} />
        <Route path="/commissions" element={<Detail><CommissionDashboard /></Detail>} />
        <Route path="/integrations" element={<Navigate to="/providers" replace />} />
        <Route path="/partners" element={<Navigate to="/providers" replace />} />
        <Route path="/about" element={<Detail><About /></Detail>} />
        <Route path="/privacy" element={<LegalPage />} />
        <Route path="/terms" element={<LegalPage />} />
        <Route
          path="/merchant"
          element={
            <Preview>
              <MerchantDashboard />
            </Preview>
          }
        />
        <Route
          path="/admin"
          element={
            <Preview>
              <AdminDashboard />
            </Preview>
          }
        />
        <Route
          path="/checkout"
          element={
            <Preview>
              <Checkout />
            </Preview>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </AuthProvider>
  );
}
