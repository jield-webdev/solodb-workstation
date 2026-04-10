import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isElectronActive } from "../helpers/electron/isElectron";
import {
  getStoredThemeMode,
  setStoredThemeMode,
} from "../helpers/themeMode";
import { useAuth } from "../auth/hooks/useAuth";

export default function AppNavbar() {
  const [isElectron, setIsElectron] = useState(false);
  const [themeMode, setThemeMode] = useState(getStoredThemeMode);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Check if the electron API is available
    isElectronActive().then((isActive) => setIsElectron(isActive));
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", themeMode);
    setStoredThemeMode(themeMode);
  }, [themeMode]);

  const isDarkMode = themeMode === "dark";
  const navButtonClassName = `btn btn-sm ${
    isDarkMode ? "btn-outline-light" : "btn-outline-dark"
  }`;
  const toggleThemeMode = () => {
    setThemeMode((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container-fluid">
        <Link className="navbar-brand fw-semibold" to="/dashboard">
          Rayleigh Workstation {isElectron ? " (Desktop)" : " (Web)"}
        </Link>
        <div className="d-flex gap-2">
          <button
            type="button"
            className={navButtonClassName}
            onClick={toggleThemeMode}
          >
            {!isDarkMode ? "Dark mode" : "Light mode"}
          </button>
          {!isLoading && user ? (
            <>
              <Link className={navButtonClassName} to="/dashboard">
                Dashboard
              </Link>
              <Link className={navButtonClassName} to="/session">
                Session
              </Link>
            </>
          ) : null}
          {!isLoading && !user ? (
            <Link className={navButtonClassName} to="/login">
              Login
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
