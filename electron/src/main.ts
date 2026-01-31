import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setupIPCListeners } from './setup-ipc';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.join(__dirname, '..', '..');

process.env.APP_ROOT = appRoot;

export let mainWindow: BrowserWindow | null = null;
const devServerUrl = process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:5173/';
const preloadPath = path.join(appRoot, '.vite/preload/preload.cjs');

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: preloadPath,
    },
  })

    mainWindow.loadURL(devServerUrl);
}

function initializeApp(): void {
    setupIPCListeners();
    createWindow();
}

app.whenReady().then(initializeApp)
