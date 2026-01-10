import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Device from "../pages/Device";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/device/:id" element={<Device/>} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
