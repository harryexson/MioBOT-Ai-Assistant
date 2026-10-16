import { Routes, Route } from "react-router";
import { AuthProvider } from "./lib/useAuth.jsx";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import SignIn from "./pages/SignIn.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Features from "./pages/Features.jsx";
import Pricing from "./pages/Pricing.jsx";
import MerchantDashboard from "./pages/MerchantDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import DeveloperPortal from "./pages/DeveloperPortal.jsx";
import WidgetDemo from "./pages/WidgetDemo.jsx";
import EasyTapGo from "./pages/EasyTapGo.jsx";
import Providers from "./pages/Providers.jsx";
import Checkout from "./pages/Checkout.jsx";
import Integrations from "./pages/Integrations.jsx";
import PartnerPortal from "./pages/PartnerPortal.jsx";
import CommissionDashboard from "./pages/CommissionDashboard.jsx";
import VoiceSearch from "./pages/VoiceSearch.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/features" element={<Features />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/merchant" element={<MerchantDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/developers" element={<DeveloperPortal />} />
        <Route path="/widget" element={<WidgetDemo />} />
        <Route path="/easytap" element={<EasyTapGo />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/partners" element={<PartnerPortal />} />
        <Route path="/commissions" element={<CommissionDashboard />} />
        <Route path="/voice" element={<VoiceSearch />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
