import { BrowserRouter } from "react-router-dom";
import { Providers } from "../providers/Providers";
import { AppRoutes } from "../routes/AppRoutes";
import AppNavbar from "../../components/AppNavbar";

export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <div className="min-vh-100 d-flex flex-column bg-body-tertiary">
          <AppNavbar />
          <main className="flex-grow-1">
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </Providers>
  );
}
