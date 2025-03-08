import { ElectronAPI } from '@electron-toolkit/preload'
import { DbData, TimerData } from '@types/db'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      db: {
        getAllTimers: () => Promise<DbData>,
        addTimer: (timer: Omit<TimerData, "id">) => Promise<void>
      }
    }
  }
}
