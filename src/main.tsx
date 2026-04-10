import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./app/App";
import { initConfig } from "./helpers/runtimeConfig";
import { getStoredThemeMode } from './helpers/themeMode';

document.documentElement.setAttribute("data-bs-theme", getStoredThemeMode());

initConfig({
  serverUri: import.meta.env.VITE_BASE_URL,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
