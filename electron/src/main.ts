import { app, BrowserWindow } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setupIPCListeners } from "./setup-ipc";

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.join(__dirname, '..', '..');

process.env.APP_ROOT = appRoot;

export let mainWindow: BrowserWindow | null = null;

async function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "..", "preload", "preload.cjs"),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    return;
  }

  await mainWindow.loadFile(
    path.join(__dirname, "..", "renderer", MAIN_WINDOW_VITE_NAME, "index.html")
  );
}

function initializeApp() {
  setupIPCListeners();
  createWindow();
}

app.whenReady().then(initializeApp);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
