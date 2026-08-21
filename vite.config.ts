import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      // En dev, /api/*.php n'existe pas côté Vite — on le renvoie vers un
      // serveur PHP local dont la racine est déjà public/api (ex :
      // `php -S 127.0.0.1:8891 -t public/api`), donc on retire le préfixe
      // /api avant de transmettre.
      "/api": {
        target: "http://127.0.0.1:8891",
        rewrite: (requestPath) => requestPath.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
}));
