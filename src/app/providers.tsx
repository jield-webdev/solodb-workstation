import { type ReactElement } from "react";

interface ProvidersProps {
  children: ReactElement;
}

export function Providers({ children }: ProvidersProps) {
  return <>{children}</>;
}
