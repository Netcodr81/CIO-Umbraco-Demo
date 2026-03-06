import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/custom-forms-dashboard.ts", // your web component source file
      formats: ["es"],
    },
    outDir: "../App_Plugins/custom-forms-dashboard", // all compiled files will be placed here
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [/^@umbraco/], // ignore the Umbraco Backoffice package in the build
    },
  },
  base: "wwwroot", // the base path of the app in the browser (used for assets)
});
