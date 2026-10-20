import { Routes, Route } from "react-router";
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
export default function App() {
  return (
    <>
      <Nav />
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
    </>
  );
}
