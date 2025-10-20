// ============================================================================
// App.tsx — Scalable, Lazy-Loaded, Accessible React Structure (2025 Best Practice)
// ----------------------------------------------------------------------------
// • Persistent Layout: Topbar, Navbar, Footer visible across all pages
// • Homepage-only sections: Hero, Offers, ShopByCategory
// • Route-based code splitting with React.lazy()
// • Scroll restoration for UX
// • Accessibility & mobile responsiveness included
// ============================================================================

import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";

// ------------------------------
// Core Layout Components
// ------------------------------
import Topbar from "./components/header/Topbar";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";

// ------------------------------
// Homepage Sections (eagerly loaded for faster first paint)
// ------------------------------
import Hero from "./components/Hero";
import Offers from "./pages/Offers";
import ShopByCategory from "./pages/ShopByCategory";
import CVS from "./categories/Cadiovascular";
import RadiologySection from "./section/Radiology";
import VCTSection from "./section/VCT";
import LaboratorySection from "./section/Lab";

// ------------------------------
// Lazy-loaded Components (for better performance)
// ------------------------------
const ProductsWrapper = lazy(() => import("./components/ProductsWrapper"));
const ContactUs = lazy(() => import("./outer/ContactUs"));
const PrescriptionUpload = lazy(() => import("./dropdowns/PrescriptionUpload"));
const RequestPrescription = lazy(() => import("./dropdowns/RequestPrescription"));
const TalkToExpert = lazy(() => import("./dropdowns/TalkToExpert"));
const OurStory = lazy(() => import("./outer/OurStory"));
const OurTeam = lazy(() => import("./outer/OurTeam"));
const OurMissionVision = lazy(() => import("./outer/OurMissionVision"));
const MensHealth = lazy(() => import("./dropdowns/Men"));
const WomenHealthShop = lazy(() => import("./dropdowns/Women"));
const OTC = lazy(() => import("./dropdowns/OTC"));
const Vitamins = lazy(() => import("./dropdowns/Vitamins"));
const Equipment = lazy(() => import("./dropdowns/Equipment"));
const DM = lazy(() => import("./dropdowns/Diabetes"));

// ------------------------------
// Layout Component (Persistent Navbar, Topbar, Footer)
// ------------------------------
const Layout = () => {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  // Scroll to top on route change (UX enhancement)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      <header>
        <Topbar />
        <Navbar />
      </header>

      <main role="main" aria-live="polite">
        {isHomepage && (
          <>
            <Hero />
            <Offers />
            <ShopByCategory />
          </>
        )}
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

// ------------------------------
// Fallback Loader Component
// ------------------------------
const Loader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
      fontSize: "1.2rem",
      color: "#0077b6",
      textAlign: "center",
    }}
    role="status"
    aria-busy="true"
  >
    Loading, please wait...
  </div>
);

// ------------------------------
// Root App Component (NO BrowserRouter here!)
// ------------------------------
function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* ---------- GLOBAL LAYOUT ---------- */}
        <Route path="/" element={<Layout />}>
          {/* ---------- HOME ---------- */}
          <Route index element={<></>} />

          {/* ---------- CORE PAGES ---------- */}
          <Route path="shop" element={<ProductsWrapper />} />
          <Route path="contact" element={<ContactUs />} />

          {/* ---------- PHARMACY ---------- */}
          <Route path="pharmacy" element={<div>Pharmacy Overview</div>} />
          <Route path="pharmacy/care" element={<ProductsWrapper />} />
          <Route path="pharmacy/otc" element={<OTC />} />
          <Route path="pharmacy/vitamins" element={<Vitamins />} />
          <Route path="pharmacy/equipment" element={<Equipment />} />

          {/* ---------- HERO ---------- */}
          <Route path="pharmacy" element={<div>Pharmacy Overview</div>} />
          <Route path="pharmacy/care" element={<ProductsWrapper />} />
          <Route path="/supplements" element={<Vitamins/>} />
          <Route path="/devices" element={<Equipment />} />
          <Route path="/contact" element={<ContactUs />} />
           <Route path="/upload" element={<PrescriptionUpload />} />

          {/* ---------- SHOP BY CONDITION ---------- */}
          <Route path="condition" element={<div>Shop by Condition Overview</div>} />
          <Route path="condition/diabetes" element={<DM/>} />
          <Route path="/condition/cvs" element={<CVS/>} />
          <Route path="condition/women" element={<WomenHealthShop />} />
          <Route path="condition/omen" element={<MensHealth />} />

          {/* ---------- OTHER SERVICES ---------- */}
          <Route path="services" element={<div>Other Services Overview</div>} />
          <Route path="services/radiology" element={<RadiologySection/>} />
          <Route path="services/lab" element={<LaboratorySection/>} />
          <Route path="services/vct" element={<VCTSection/>} />
          <Route path="services/mch" element={<div>MCH Clinic</div>} />

          {/* ---------- PRESCRIPTION ASSISTANCE ---------- */}
          <Route path="prescription" element={<div>Prescription Assistance Overview</div>} />
          <Route path="prescription/upload" element={<PrescriptionUpload />} />
          <Route path="prescription/refill" element={<RequestPrescription />} />
          <Route path="prescription/talk" element={<TalkToExpert />} />

          {/* ---------- ABOUT US ---------- */}
          <Route path="about" element={<div>About Us Overview</div>} />
          <Route path="about/story" element={<OurStory />} />
          <Route path="about/team" element={<OurTeam />} />
          <Route path="about/careers" element={<OurMissionVision />} />

          {/* ---------- 404 PAGE ---------- */}
          <Route
            path="*"
            element={
              <div
                style={{
                  padding: "4rem",
                  textAlign: "center",
                  fontSize: "1.2rem",
                  color: "#333",
                }}
              >
                404 — Page Not Found
              </div>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
