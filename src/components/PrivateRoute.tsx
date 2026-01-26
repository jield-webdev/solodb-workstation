import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";

export default function PrivateRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return user !== null ? <Outlet /> : <Navigate to="/login" replace />;
}
