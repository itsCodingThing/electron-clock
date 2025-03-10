import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  db: {
    getAllTimers: () => ipcRenderer.invoke("db:timer:get:all"),
    addTimer: (timer) => ipcRenderer.invoke("db:timer:add", timer),
    updateTimer: (timer) => ipcRenderer.invoke("db:timer:update", timer),
    deleteTimer: (timerId) => ipcRenderer.invoke("db:timer:delete", timerId)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
