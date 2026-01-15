import { ipcMain } from "electron";

export function setupIPCListeners() {
    ipcMain.handle('isElectronActive', (_event) => {
        return true;
    });
}
