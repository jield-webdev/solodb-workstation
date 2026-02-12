import { setCookie } from "../../helpers/cookies";
import { isElectronActive } from "../../helpers/electron/isElectron";

/**
 * Stores the token as the refresh token in the session storage.
 */
export async function saveRefreshToken(token: string) {
    if (await isElectronActive()) {
        await window.electronAPI.setRefreshToken(token);
    } else {
        setCookie("refresh_token", token, 5);
    }
}
