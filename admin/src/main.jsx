import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import "./index.css";

const router = createBrowserRouter(routes, {
  basename: "/admin", // required for deployed admin
  // React Router assumes your all client-side URLs are relative to /admin.
  // So <Link to="/something"> will resolve to /admin/something
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
