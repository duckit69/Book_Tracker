import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "../localhost-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "../localhost.pem")),
    },
    cors: true, // Enable CORS if needed
    port: 5173, // Specify your preferred port
  },
});
