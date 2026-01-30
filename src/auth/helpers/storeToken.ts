/**
 * Stores the token as the refresh token in the session storage.
 */

import { setCookie } from "../../helpers/cookies";

export function saveRefreshToken(token: string) {
  setCookie("refresh_token", token, 5)
}
