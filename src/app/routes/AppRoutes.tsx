import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute";

const Login = lazy(() => import("../pages/Login"));
const UserSession = lazy(() => import("../pages/UserSession"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Device = lazy(() => import("../pages/Device"));

const RouteLoading = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
    <p className="mb-0">Loading...</p>
  </div>
);

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
    <Suspense fallback={<RouteLoading />}>
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
    </Suspense>
  );
}
