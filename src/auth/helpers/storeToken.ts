/**
 * Stores the token as the refresh token in the session storage.
 */

export function saveRefreshToken(token: string) {
  sessionStorage.setItem("refresh_token", token);
}
