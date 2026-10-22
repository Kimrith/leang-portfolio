import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schema } from "./src/sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "e4a4xylg";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  basePath: "/admin",
  name: "leang_portfolio_studio",
  title: "Leang Portfolio Studio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema,
});
