import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const objects = await store.getAll();
  const contenttoWrite = objects.length > 0 ? { content: content, id: objects[0].id } : { content: content };
  const request = await store.put(contenttoWrite);
  const result = await request;
};

export const getDb = async () => {
  const jateDb = await openDB("jate", 1);
  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.getAll();
  const result = await request;
  if (result.length > 0) {
      console.log("result.value", result);
      console.log(result[0].content);
      return result[0].content;
  } else {
      return null;
  }
};

initdb();
