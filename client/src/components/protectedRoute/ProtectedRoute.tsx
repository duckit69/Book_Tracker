import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const { accessToken, isInitializing } = useAuth(); // Get token from context

  if (isInitializing) {
    return <div>Loading...</div>; // Or a nice spinner
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />; // Redirect to login
  }

  return <Outlet />;
}
