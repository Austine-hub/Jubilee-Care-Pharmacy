import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// ============================================================
// ✅ Unified Vite Configuration
// - Enables React (SWC compiler)
// - Fixes browser refresh on React Router routes
// ============================================================

export default defineConfig({
  plugins: [react()],

  // ✅ Use appType: "spa" instead of historyApiFallback
  appType: "spa",

  server: {
    port: 5173, // optional
    open: true, // auto open browser
  },

  build: {
    outDir: "dist", // default but explicit is good
  },
});
