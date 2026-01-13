import type { User } from "@jield/solodb-typescript-core";
import { createContext } from "react";

interface AuthContext {
  user: User | null;
  isLoadingUser: boolean;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  isLoadingUser: true,
});
