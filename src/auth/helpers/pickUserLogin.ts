import { devAuthToken } from "./mockLogin";
import { saveRefreshToken } from "./storeToken";

/**
 * Reads the userManager auth token from Vite env.
 * This token is for listing users and getting bearer token for the selected user
 * Returns null when the token is missing.
 */
export function getUserManagerToken(): string | null {
  const accessToken = import.meta.env.VITE_USER_MANAGER_TOKEN as string | undefined;
  if (accessToken === undefined || accessToken === null) {
    throw new Error("USER_MANAGER_TOKEN not set");
  }

  if (!accessToken) {
    return null;
  }

  return accessToken;
}

export function loginWithUser(_userId: number) {
  const token = devAuthToken();
  if (token === undefined || token === null) {
    throw new Error("VITE_DEV_AUTH_TOKEN not set for mock login");
  }
  saveRefreshToken(token);
}
