import { type ReactElement } from "react";
import { AuthProvider } from "./auth/AuthProvider";

interface ProvidersProps {
  children: ReactElement;
}

export function Providers({ children }: ProvidersProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
