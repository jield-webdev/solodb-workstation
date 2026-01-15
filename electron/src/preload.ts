import { contextBridge, ipcRenderer } from "electron";
import type { ElectronAPI } from "./electronApi";

// HOW TO EXPOSE FUNCTIONS TO THE ELECTRON API:

// 1. Declare the API interface that specifies the functions you want to expose to the renderer process.
// 2. Implement the API functions by using ipcRenderer to send messages to the main process.
// 3. Expose the API to the renderer process using contextBridge to ensure secure communication between the main and renderer processes.

const api: ElectronAPI = {
    isElectronActive: () => ipcRenderer.invoke('isElectronActive'),
}

// Expose the 'electronAPI' object to the global window object of the renderer process,
// allowing the renderer to safely access the API functions.
contextBridge.exposeInMainWorld("electronAPI", api);

