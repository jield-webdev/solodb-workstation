import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setupIPCListeners } from './setup-ipc';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.join(__dirname, '..');

process.env.APP_ROOT = appRoot;

export const MAIN_DIST = path.join(appRoot, 'dist-electron');
export const RENDERER_DIST = path.join(appRoot, 'dist');

export let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  mainWindow.loadFile(path.join(RENDERER_DIST, 'index.html'))
}

function initializeApp(): void {
    setupIPCListeners();
    createWindow();
}

app.whenReady().then(initializeApp)
