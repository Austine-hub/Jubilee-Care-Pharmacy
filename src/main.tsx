// ============================================================================
// main.tsx — Modern React 19 Entry Point (2025 Best Practice)
// ----------------------------------------------------------------------------
// ✅ Uses React.StrictMode for dev warnings
// ✅ Wraps App in BrowserRouter (single router instance)
// ✅ Includes Suspense fallback for initial hydration
// ✅ Accessible loading state for users with assistive tech
// ✅ Ready for scalability (SSR, Error Boundaries, Suspense-ready APIs)
// ============================================================================

import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

// ------------------------------
// Accessible Fallback Loader
// ------------------------------
const Loader = () => (
  <div
    role="status"
    aria-busy="true"
    aria-label="Loading content, please wait..."
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
      fontSize: "1.1rem",
      fontWeight: 500,
      color: "#0077b6",
      backgroundColor: "#f9f9fb",
      textAlign: "center",
    }}
  >
    Loading application...
  </div>
);

// ------------------------------
// React 18/19 Concurrent Root
// ------------------------------
const container = document.getElementById("root");

if (!container) {
  throw new Error("❌ Root element #root not found in index.html");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);

// ------------------------------
// ✅ Optional: Hot Module Replacement (Dev-Only)
// ------------------------------
if (import.meta.hot) {
  import.meta.hot.accept();
}






