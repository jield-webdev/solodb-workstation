import { type ReactElement } from "react";
import { AuthProvider } from "../../auth/context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
  children: ReactElement;
}

const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthProvider>
  );
}
