import {openDB} from 'idb';

const DB_NAME = 'PrimeCheckerDB';
const DB_VERSION = 1;

export const initDB = async () => {
  return await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'username' });
      }
      if (!db.objectStoreNames.contains('checks')) {
        const checksStore = db.createObjectStore('checks', { keyPath: 'id', autoIncrement: true });
        checksStore.createIndex('by_date', 'timestamp');
      }
    },
  });
};