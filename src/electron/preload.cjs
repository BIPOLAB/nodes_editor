// preload.cjs
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    enviarComando: (cmd) => ipcRenderer.send('enviar-comando', cmd),
  onSerialData: (callback) => ipcRenderer.on('serial-data', (event, data) => callback(data)),
  test: () => ipcRenderer.send("test"),
  window: {
    close: () => ipcRenderer.invoke("closeWindow"),
    minimize: () => ipcRenderer.invoke("minimizeWindow"),
    maximize: () => ipcRenderer.invoke("maximizeWindow"),
    restore:  () => ipcRenderer.invoke("restoreWindow"),
    isMaximized: () => ipcRenderer.invoke("isMaximized"),
  },
});
