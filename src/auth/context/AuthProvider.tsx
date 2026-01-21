import { configureAxiosHeaders, getMe, type User } from "@jield/solodb-typescript-core";
import { useEffect, useState, type ReactElement } from "react";
import { AuthContext } from "./AuthContext";
import { getServerUri } from "../../helpers/runtimeConfig";

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const bearerToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpZCI6MSwianRpIjoxLCJpc3MiOiJzb2xvZGIiLCJhdWQiOiIwMzg3NmVkYzBkYjU1ZjQ5MDljNTg4YjJkYmVmZmU3ZWUyNTIzNWE0Iiwic3ViIjoxLCJleHAiOjE3OTk2MDYzNTksImlhdCI6MTc2ODA3MDM1OSwidG9rZW5fdHlwZSI6IlJTMjU2Iiwic2NvcGUiOiJvcGVuaWQifQ.KAWtEHQkOx3msBwDz5KHhEu2kOdkFPMJs0MnkzkV8X19LLV-XMhqiDGjMs8u2kKi9lXj-eowZf_Dmaihvhc6uLDzRrWDmaHeddtieu4v9eoXAovv-H-vqIkqbukYWuySKTXINMKbuxZMagmio-j-rXzR5nLap5Ck2TiAup7FjW0rCr1nVbkN0J2uBagb3AT6gZ9HKy8O71GtjPOE4L40Xi2szs3FUBOoTdv0un1mu3tP9AU0MyIde_lsupt0YP473ef5LQOfldVD1vDR_TwUxxfHSXs93vxeXnxhEdvDP6d0cv033krlY99l3kZ6pbhXCVGKs-XQ1KrPcgbqIutPAA";

    configureAxiosHeaders(bearerToken, getServerUri());

    getMe()
      .then(setUser)
      .finally(() => setIsLoadingUser(false));
  }, []);

  if (isLoadingUser) {
        return <>Geting credentials...</>
  }

  return <AuthContext.Provider value={{ user,isLoadingUser }}>{children}</AuthContext.Provider>;
};
