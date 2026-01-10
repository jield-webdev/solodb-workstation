import type { ReactElement } from "react";
import { useAuth } from "./useAuth";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const { user, isLoadingUser } = useAuth(null);

  return <AuthContext.Provider value={{ user,isLoadingUser }}>{children}</AuthContext.Provider>;
};
