import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import { defineConfig } from "vitest";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/vitest.setup.js"],
  },
});
