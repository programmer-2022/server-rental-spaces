import { CorsOptions } from "vite";

export const CORS: CorsOptions = {
  origin: true,
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
  credentials: true,
};
