import { BrowserRouter, Link } from "react-router-dom";
import { Providers } from "../providers/Providers";
import { AppRoutes } from "../routes/AppRoutes";
import { useState, useEffect } from "react";
import { isElectronActive } from "../../helpers/electron/isElectron";

export default function App() {
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    // Check if the electron API is available 
    isElectronActive().then((isActive) => setIsElectron(isActive));
  }, []);

  return (
    <Providers>
      <BrowserRouter>
        <div className="min-vh-100 d-flex flex-column bg-body-tertiary">
          <nav
            className="navbar navbar-expand-lg bg-dark border-bottom border-dark"
            data-bs-theme="dark"
          >
            <div className="container">
              <Link className="navbar-brand fw-semibold" to="/dashboard">
                Solodb Workstation{" "}
                {isElectron ? " Desktop version" : " Web version"}
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
        </div>
      </BrowserRouter>
    </Providers>
  );
}
