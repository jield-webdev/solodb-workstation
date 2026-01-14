import { BrowserRouter, Link } from "react-router-dom";
import { Providers } from "../providers/Providers";
import { AppRoutes } from "../routes/AppRoutes";

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <div className="min-vh-100 d-flex flex-column bg-body-tertiary">
          <nav className="navbar navbar-expand-lg bg-dark border-bottom border-dark" data-bs-theme="dark">
            <div className="container">
              <Link className="navbar-brand fw-semibold" to="/dashboard">
                Solodb Workstation
              </Link>
              <div className="d-flex gap-2">
                <Link className="btn btn-sm btn-outline-light" to="/dashboard">
                  Dashboard
                </Link>
                <Link className="btn btn-sm btn-outline-light" to="/device/1">
                  Demo Device
                </Link>
                <Link className="btn btn-sm btn-outline-light" to="/login">
                  Session
                </Link>
              </div>
            </div>
          </nav>
          <main className="flex-grow-1">
            <AppRoutes />
          </main>
          <footer className="border-top bg-body py-3">
            <div className="container d-flex flex-wrap justify-content-between align-items-center gap-2 small text-secondary">
              <span>Solodb demo workstation UI</span>
              <span>Preview data only</span>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </Providers>
  );
}
