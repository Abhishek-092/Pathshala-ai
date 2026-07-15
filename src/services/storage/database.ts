import { db } from "./db";

export async function initDB(): Promise<any> {
  return db.open();
}

export async function getStoreValue(storeName: string, key: string): Promise<any> {
  return (db as any)[storeName]?.get(key);
}

export async function putStoreValue(storeName: string, value: any): Promise<any> {
  return (db as any)[storeName]?.put(value);
}
