import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/weather": {
        target: "https://api.weather.yandex.ru/v2/forecast",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/weather2/, ""),
      },
    },
  },
});
