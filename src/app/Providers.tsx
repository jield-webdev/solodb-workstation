import { type ReactElement } from "react";
import { AuthProvider } from "../auth/context/AuthProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ScannerProvider,
  NotificationProvider,
} from "@jield/solodb-react-components";

interface ProvidersProps {
  children: ReactElement;
}

const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ScannerProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ScannerProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
