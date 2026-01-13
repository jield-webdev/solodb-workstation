import { BrowserRouter } from "react-router-dom";
import { Providers } from "../providers/Providers";
import { AppRoutes } from "../routes/AppRoutes";


export default function App() {
  return (
    <Providers>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Providers>
  );
}
