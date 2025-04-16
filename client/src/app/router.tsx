import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";

import Home from "./routes/Home";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";

const Router = createBrowserRouter([
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    element: <ProtectedRoute />, // Wrapper for protected routes
    children: [
      {
        path: "/",
        element: <Home />, // Only accessible if authenticated
      },
    ],
  },
]);

export default Router;
