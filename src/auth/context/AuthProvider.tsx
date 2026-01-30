import {configureAxiosHeaders, getMe, type User} from "@jield/solodb-typescript-core";
import {useEffect, useState, type ReactElement} from "react";
import {AuthContext} from "./AuthContext";
import {getServerUri} from "../../helpers/runtimeConfig";

export const AuthProvider = ({children}: { children: ReactElement }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    useEffect(() => {
        const bearerToken = 'Bearer abcd';

        configureAxiosHeaders(bearerToken, getServerUri());

        getMe()
            .then(setUser)
            .finally(() => setIsLoadingUser(false));
    }, []);

    if (isLoadingUser) {
        return <>Getting credentials...</>
    }

    return <AuthContext.Provider value={{user, isLoadingUser}}>{children}</AuthContext.Provider>;
};
