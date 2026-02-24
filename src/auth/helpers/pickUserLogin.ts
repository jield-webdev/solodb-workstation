import { getServerUri } from "../../helpers/runtimeConfig";
import { saveRefreshToken } from "./storeToken";

/**
 * Reads the userManager auth token from Vite env.
 * This token is for listing users and getting bearer token for the selected user
 * Returns null when the token is missing.
 */
export function getUserManagerToken(): string | null {
  const accessToken = import.meta.env.VITE_USER_MANAGER_TOKEN as
    | string
    | undefined;
  if (accessToken === undefined || accessToken === null) {
    throw new Error("USER_MANAGER_TOKEN not set");
  }

  if (!accessToken) {
    return null;
  }

  return accessToken;
}

/**
 * Reads the userManager oauth client id from Vite env.
 */
export function getUserManagerOauthClientId(): string | null {
  const clientId = import.meta.env.VITE_USER_MANAGER_OAUTH_CLIENT_ID as
    | string
    | undefined;
  if (clientId === undefined || clientId === null) {
    throw new Error("VITE_USER_MANAGER_OAUTH_CLIENT_ID not set");
  }

  if (!clientId) {
    return null;
  }

  return clientId;
}

export async function loginWithUser(userId: number) {
  const endpoint = `${getServerUri()}/user/token/${userId}`;

  // Raw fetch so we dont need to send the token to axios
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getUserManagerToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: `${getUserManagerOauthClientId()}`,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`,
    );
  }

  const token = (await response.json()).token;

  if (token === undefined || token === null) {
    throw new Error("Error while getting the auth token for user");
  }

  return saveRefreshToken(token);
}
