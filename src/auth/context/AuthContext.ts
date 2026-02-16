import type { User } from "@jield/solodb-typescript-core";
import { createContext } from "react";

export const AuthMethod = {
  HARDCODED_TOKEN: 1,
} as const;

export type AuthMethod = (typeof AuthMethod)[keyof typeof AuthMethod];

export interface AuthContext {
  user: User | null;
  isLoading: boolean;
  authMethod: AuthMethod;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  isLoading: true,
  authMethod: AuthMethod.HARDCODED_TOKEN,
});
