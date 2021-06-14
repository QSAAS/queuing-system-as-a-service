import mongoose, { Connection } from "mongoose";

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  collections.forEach(async (collectionName) => {
    const collection = await mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  });
}

export default async function createTestingDbConnection(
  beforeAllHook: (conn: Connection) => void = () => {},
): Promise<Connection> {
  const { DB_URL, DB_PORT, DB_NAME } = process.env;
  return new Promise((resolve) => {
    let mongooseConnection: Connection;
    beforeAll(async () => {
      mongooseConnection = await mongoose.createConnection(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await beforeAllHook(mongooseConnection);
      resolve(mongooseConnection);
    });
    beforeEach(async () => {
      await removeAllCollections();
    });
    afterAll(async () => {
      await mongooseConnection?.close();
    });
  });
}
