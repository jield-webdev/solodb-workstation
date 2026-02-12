import { ipcMain } from "electron";
import { getRefreshToken, setRefreshToken } from "./config/refreshToken";

export function setupIPCListeners() {
    ipcMain.handle('isElectronActive', (_event) => {
        return true;
    });

    ipcMain.handle("getRefreshToken", async () => {
        return getRefreshToken();
    });

    ipcMain.handle("setRefreshToken", async (_event, token: string) => {
        await setRefreshToken(token);
    });
}
