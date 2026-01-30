import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./layout/App";
import { initConfig } from "../helpers/runtimeConfig";

initConfig({
  serverUri: "https://solodb-rayleigh.docker.localhost",
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
