import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, type ProxyOptions } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

const toFirstPartyCookie = (cookie: string): string =>
  cookie
    .replace(/;\s*Secure/gi, "")
    .replace(/;\s*SameSite=None/gi, "; SameSite=Lax")
    .replace(/;\s*Domain=[^;]*/gi, "");

const apiProxy: ProxyOptions = {
  target: "https://cinemaguide.skillbox.cc",
  changeOrigin: true,
  secure: true,
  rewrite: (requestPath) => requestPath.replace(/^\/api/, ""),
  configure: (proxy) => {
    proxy.on("proxyRes", (proxyRes) => {
      const cookies = proxyRes.headers["set-cookie"];
      if (!cookies) return;
      const list = Array.isArray(cookies) ? cookies : [cookies];
      proxyRes.headers["set-cookie"] = list.map(toFirstPartyCookie);
    });
  },
};

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "/src/assets/global/variables" as *;
        @use "/src/assets/global/mixins" as *;
      `,
      },
    },
  },
  server: {
    proxy: {
      "/api": apiProxy,
    },
  },
  preview: {
    proxy: {
      "/api": apiProxy,
    },
  },
});
