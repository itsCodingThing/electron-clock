import { ipcMain } from "electron";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { DbData, TimerData } from "../../types/db";

const dbfile = "electron-db-file.json";
const dbfilePath = os.tmpdir() + path.sep + dbfile;
const dbfileStructure = { timers: [], counter: 0 };

async function checkDbFile() {
  try {
    const fh = await fs.promises.open(dbfilePath, "r+");
    return fh;
  } catch (error) {
    console.log(error);

    const fh = await fs.promises.open(dbfilePath, "w+");
    await fh.close();

    return await fs.promises.open(dbfilePath, "r+");
  }
}

function createDbfile() {
  if (!fs.existsSync(dbfilePath)) {
    fs.writeFileSync(dbfilePath, JSON.stringify(dbfileStructure));
  }
}

async function saveToDbFile(data: DbData) {
  const fh = await checkDbFile();
  const content = JSON.stringify(data);

  await fh.truncate(0);
  await fh.writeFile(content);
  await fh.close();
}

async function readFromDbFile() {
  const fh = await checkDbFile();
  const fileContent = await fh.readFile("utf8");
  await fh.close();

  const data = JSON.parse(fileContent) as DbData;
  return data;
}

export function initDb(): void {
  createDbfile();

  ipcMain.handle("db:timer:get:all", async () => {
    const data = await readFromDbFile();
    return data;
  });

  ipcMain.handle(
    "db:timer:add",
    async (_event, timer: Omit<TimerData, "id created_at">) => {
      const data = await readFromDbFile();

      data.counter = data.counter + 1;
      const payload = {
        ...timer,
        id: data.counter.toString(),
        created_at: new Date().toISOString(),
      };
      data.timers.unshift(payload);

      await saveToDbFile(data);
    },
  );

  ipcMain.handle("db:timer:update", async (_event, timer: TimerData) => {
    const data = await readFromDbFile();

    data.timers = data.timers.map((t) => {
      if (t.id === timer.id) {
        return timer;
      }

      return t;
    });

    await saveToDbFile(data);
  });

  ipcMain.handle("db:timer:delete", async (_event, timerId: string) => {
    const data = await readFromDbFile();

    data.timers = data.timers.filter((t) => {
      if (t.id === timerId) {
        return false;
      }

      return true;
    });

    await saveToDbFile(data);
  });
}
