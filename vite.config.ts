import react from "@vitejs/plugin-react";
import vike from "vike/plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vike({ prerender: true }), react({})],
  base: "/geniv",
  resolve: {
    alias: {
      "@": __dirname,
    },
  },
});
