export async function isElectronActive(): Promise<boolean> {
    if (!window.electronAPI) {
        return false;
    }

    return window.electronAPI.isElectronActive();
}
