import react from "@vitejs/plugin-react";
import path from "node:path";
import vike from "vike/plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vike({}), react({})],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});
