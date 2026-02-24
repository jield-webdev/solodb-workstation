import { saveRefreshToken } from "./storeToken";

/**
 * Reads the development auth token from Vite env.
 * Returns null when the token is missing.
 */
export const devAuthToken = () => {
  const accessToken = import.meta.env.VITE_DEV_AUTH_TOKEN as string | undefined;

  if (!accessToken) {
    return null;
  }

  return accessToken;
};

/**
 * Stores the dev token as the refresh token.
 * Temporary scaffold for mock authentication flows.
 */
export async function mockLogin() {
  // in the future use real auth methods like OAuth or Goldstein to get the token
  const token = devAuthToken();
  if (token === undefined || token === null) {
    throw new Error("VITE_DEV_AUTH_TOKEN not set for mock login");
  }
  saveRefreshToken(token);
}
