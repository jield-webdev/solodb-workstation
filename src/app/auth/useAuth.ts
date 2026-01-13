import { configureAxiosHeaders, getMe, type User } from "@jield/solodb-typescript-core";
import { useEffect, useState } from "react";
import { getServerUri } from "../../lib/runtimeConfig";

export const useAuth = (bearerToken: string | null) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    if (bearerToken === null) {
        setIsLoadingUser(false);
        return;
    }

    configureAxiosHeaders(bearerToken ?? "", getServerUri());

    getMe()
      .then(setUser)
      .finally(() => setIsLoadingUser(false));
  }, [bearerToken]);

  return { user, isLoadingUser };
};
