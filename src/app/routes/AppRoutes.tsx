import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute";
import Login from "../pages/Login";
import UserSession from "../pages/UserSession";
import Dashboard from "../pages/Dashboard";
import Device from "../pages/Device";

const NotFound = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
    <div className="text-center">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  </div>
);

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/device/:id" element={<Device />} />
        <Route path="/session" element={<UserSession />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
