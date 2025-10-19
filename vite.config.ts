import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Anything starting with /zen will be proxied to zenquotes.io
      "/zen": {
        target: "https://zenquotes.io",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/zen/, ""), // /zen/api/random -> /api/random
      },
    },
  },
});
