import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  enviarComando: (cmd: string) => ipcRenderer.send('enviar-comando', cmd),
  onSerialData: (callback: (data: string) => void) =>
    ipcRenderer.on('serial-data', (_e, data: string) => callback(data)),

  test: () => ipcRenderer.send('test'),

  window: {
    close: () => ipcRenderer.invoke('closeWindow'),
    minimize: () => ipcRenderer.invoke('minimizeWindow'),
    maximize: () => ipcRenderer.invoke('maximizeWindow'),
    restore: () => ipcRenderer.invoke('restoreWindow'),
    isMaximized: () => ipcRenderer.invoke('isMaximized'),
  },
});

// Tipado global para TypeScript del renderer
declare global {
  interface Window {
    electronAPI: {
      enviarComando: (cmd: string) => void;
      onSerialData: (cb: (data: string) => void) => void;
      test: () => void;
      window: {
        close: () => Promise<void>;
        minimize: () => Promise<void>;
        maximize: () => Promise<void>;
        restore: () => Promise<void>;
        isMaximized: () => Promise<boolean>;
      };
    };
  }
}
