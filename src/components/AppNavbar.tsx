import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isElectronActive } from "../helpers/electron/isElectron";
import { useAuth } from "../auth/hooks/useAuth";

export default function AppNavbar() {
  const [isElectron, setIsElectron] = useState(false);
  const { user, isLoading } = useAuth();

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
          Solodb Workstation {isElectron ? " Desktop version" : " Web version"}
        </Link>
        <div className="d-flex gap-2">
          {!isLoading && user ? (
            <>
              <Link className="btn btn-sm btn-outline-light" to="/dashboard">
                Dashboard
              </Link>
              <Link className="btn btn-sm btn-outline-light" to="/session">
                Session
              </Link>
            </>
          ) : null}
          {!isLoading && !user ? (
            <Link className="btn btn-sm btn-outline-light" to="/login">
              Login
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
