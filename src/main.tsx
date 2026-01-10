import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import { initConfig } from './lib/runtimeConfig'

initConfig({
  serverUri: "https://solodb-onelab.docker.localhost",
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
