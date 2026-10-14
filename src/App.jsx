import { Routes, Route } from "react-router";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import Features from "./pages/Features.jsx";
import Pricing from "./pages/Pricing.jsx";
import MerchantDashboard from "./pages/MerchantDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import DeveloperPortal from "./pages/DeveloperPortal.jsx";
import WidgetDemo from "./pages/WidgetDemo.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/merchant" element={<MerchantDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/developers" element={<DeveloperPortal />} />
        <Route path="/widget" element={<WidgetDemo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
