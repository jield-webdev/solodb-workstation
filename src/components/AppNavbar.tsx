import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isElectronActive } from "../helpers/electron/isElectron";

export default function AppNavbar() {
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    // Check if the electron API is available
    isElectronActive().then((isActive) => setIsElectron(isActive));
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-dark"
      data-bs-theme="dark"
    >
      <div className="container">
        <Link className="navbar-brand fw-semibold" to="/dashboard">
          Rayleigh Workstation {isElectron ? " (Desktop)" : " (Web)"}
        </Link>
        <div className="d-flex gap-2">
          <Link className="btn btn-sm btn-outline-light" to="/dashboard">
            Dashboard
          </Link>
          <Link className="btn btn-sm btn-outline-light" to="/login">
            Session
          </Link>
        </div>
      </div>
    </nav>
  );
}
