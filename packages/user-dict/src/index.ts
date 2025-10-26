import { openDB } from "idb";

const DB_NAME = "kothatype-dict";
const STORE_NAME = "words";

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME, { keyPath: "roman" });
    }
  });
}

export async function saveWord(roman: string, bangla: string) {
  const db = await getDB();
  await db.put(STORE_NAME, { roman, bangla });
}

export async function all() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}
