import { config } from "./src/config/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: config.databaseUrl,
  },
});
