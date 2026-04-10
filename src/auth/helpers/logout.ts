import { saveRefreshToken } from "./storeToken";

/**
 * Logout function
 */
export default function logout() {
  saveRefreshToken("").then(() => location.reload());
}
