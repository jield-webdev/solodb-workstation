import { getCookie } from "../../helpers/coockies";

/**
 * Returns an access token derived from the refresh token.
 * Placeholder implementation for scaffolded auth flow.
 */
export async function exchangeRefreshToken(refreshToken: string): Promise<string | null> {
    // for now the refresh token and the real one will allways be the same
    return refreshToken;
}

/**
 * Reads the stored refresh token from session storage.
 * Placeholder for future secure storage integration.
 */
export function getStoredToken(): string | null {
    const refreshToken = getCookie("refresh_token");; 

    // for now the refresh token and the real one will allways be the same
    return refreshToken;
}
