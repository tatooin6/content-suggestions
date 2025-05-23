import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // listen all interfaces
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/vitest.setup.js"],
  },
});
