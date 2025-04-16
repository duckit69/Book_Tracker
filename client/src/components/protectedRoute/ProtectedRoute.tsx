import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { accessToken } = useAuth(); // Get token from context

  if (!accessToken) {
    return <Navigate to="/login" replace />; // Redirect to login
  }

  return <Outlet />; // Render child routes if authenticated
}
