const { contextBridge, ipcRenderer } = require('electron');
const fs = require('node:fs/promises');

contextBridge.exposeInMainWorld('fileSelector', {
    readFile: async (filePath) => {
      return await fs.readFile(filePath, 'utf8');
    }
});

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
  // we can also expose variables, not just functions
}); 
