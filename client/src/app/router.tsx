import { createBrowserRouter } from "react-router";

import Home from "./routes/Home";
import SignUp from "./routes/SignUp";

const Router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/signup", Component: SignUp },
]);

export default Router;
