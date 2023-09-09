import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  define:{
    "process.env" : {}
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://gigster-backend-algokings.onrender.com/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
