// main.cjs
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,                // 👈 sin barra nativa
    titleBarStyle: "hiddenInset",
    backgroundColor: "#191A20",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  if (!app.isPackaged) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../../dist/renderer/index.html"));
  }
}

// Controles de ventana
ipcMain.handle("closeWindow", () => win.close());
ipcMain.handle("minimizeWindow", () => win.minimize());
ipcMain.handle("maximizeWindow", () => win.maximize());
ipcMain.handle("restoreWindow", () => win.restore());
ipcMain.handle("isMaximized", () => win.isMaximized());

app.whenReady().then(createWindow);
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
