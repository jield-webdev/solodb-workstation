import {
  configureAxiosHeaders,
  getMe,
  type User,
} from "@jield/solodb-typescript-core";
import { useEffect, useState, type ReactElement } from "react";
import { AuthContext, AuthMethod } from "./AuthContext";
import { exchangeRefreshToken, getStoredToken } from "../helpers/getToken";
import { getServerUri } from "../../helpers/runtimeConfig";

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const authMethod = AuthMethod.HARDCODED_TOKEN;

  useEffect(() => {
    const refreshToken = getStoredToken();
    if (refreshToken === null) {
      setIsLoading(false);
      return;
    }

    exchangeRefreshToken(refreshToken)
      .then((token) => {
        if (token === null) {
          return;
        }
        configureAxiosHeaders(token, getServerUri());
      })
      .finally(() => {
        getMe()
          .then(setUser)
          .finally(() => {
            setIsLoading(false);
          });
      });
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 gap-3">
        <div
          className="spinner-border text-primary"
          role="status"
          aria-label="Loading credentials"
        />
        <div className="text-muted">Getting credentials...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, authMethod }}>
      {children}
    </AuthContext.Provider>
  );
};
