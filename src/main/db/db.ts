import { ipcMain } from "electron";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import type { TimerData, DbData } from "../../types/db";

const dbfile = "electron-db-file.json";
const dbfilePath = os.tmpdir() + path.sep + dbfile;

function createDbfile(): void {
  if (!fs.existsSync(dbfilePath)) {
    fs.writeFileSync(dbfilePath, JSON.stringify({ timers: [] }));
  }
}

function saveDbData(data: DbData) {
  if (fs.existsSync(dbfilePath)) {
    fs.writeFileSync(dbfilePath, JSON.stringify(data));
  }
}

export function initDb(): void {
  createDbfile();

  ipcMain.handle("db:timer:get:all", async () => {
    const file = await fs.promises.readFile(dbfilePath, "utf8");
    const data = JSON.parse(file) as DbData;
    return data;
  })

  ipcMain.handle("db:timer:add", async (_event, timer: Omit<TimerData, "id">) => {
    const file = await fs.promises.readFile(dbfilePath, "utf8");
    const data = JSON.parse(file) as DbData;

    const payload = { ...timer, id: "id" };
    data.timers.push(payload);

    saveDbData(data);
  })
}
