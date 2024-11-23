import { route, type RouteConfig } from "@react-router/dev/routes";

export default [
  // however your routes are defined
  route("/", "routes/_index.tsx", { index: true }),
  route("/reference", "routes/reference.tsx"),
] satisfies RouteConfig;
