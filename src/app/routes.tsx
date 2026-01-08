import { Routes, Route, Navigate } from "react-router-dom";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<> Login Page </>} />
      <Route path="/dashboard" element={<> Dashboard Page </>} />
      <Route path="/device/:id" element={<> Device Page </>} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
