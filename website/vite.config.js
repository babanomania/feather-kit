import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

// Deployed to https://<user>.github.io/feather-kit/ — base must match the repo name.
// The bare `feather-kit` specifier is aliased to the library source so the site
// builds straight from the workspace (no pre-built dist required); CSS subpaths
// (themes/*, styles.css) still resolve through the package's exports map.
export default defineConfig({
  base: "/feather-kit/",
  server: { port: 5180, strictPort: true },
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^feather-ui-kit$/, replacement: resolve(import.meta.dirname, "../packages/feather-kit/src/index.js") },
    ],
  },
});
