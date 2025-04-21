// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./app/router.tsx";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <AuthProvider>
    <RouterProvider router={Router} />
  </AuthProvider>
  // </StrictMode>
);
