import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.REACT_APP_BACKEND_URL": JSON.stringify(
        env.REACT_APP_BACKEND_URL
      ),
      "process.env.REACT_APP_FRONTEND_URL": JSON.stringify(
        env.REACT_APP_FRONTEND_URL
      ),
    },
    plugins: [react()],
    server: {
      port: 3000,
    },
  };
});
