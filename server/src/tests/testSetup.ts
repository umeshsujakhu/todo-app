import { initApp } from '../app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { clearDatabase, closeDatabase, dropDatabase } from '../config/db';

let mongod: any = undefined;
let uri: string = '';

export const setupTestEnvironment = async (app) => {
  mongod = await MongoMemoryServer.create();
  uri = mongod.getUri();
  await initApp(app, {
    MONGO_URI: uri,
  });
};

export const teardownTestEnvironment = async () => {
  await clearDatabase();
  await dropDatabase();
  await closeDatabase();
};
