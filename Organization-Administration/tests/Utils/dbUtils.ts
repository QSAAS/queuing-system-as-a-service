import mongoose, { Connection } from "mongoose";

async function removeAllCollections(connection: Connection) {
  const models = await connection.modelNames();
  // eslint-disable-next-line no-restricted-syntax
  for (const model of models) {
    // eslint-disable-next-line no-await-in-loop
    await connection.models[model].deleteMany({});
  }
}

export default async function createTestingDbConnection(
  beforeAllHook: (conn: Connection) => void = () => {},
  connection: Connection | null = null,
): Promise<Connection> {
  const { DB_URL, DB_PORT, DB_NAME } = process.env;
  return new Promise((resolve) => {
    let mongooseConnection: Connection;
    beforeAll(async () => {
      if (connection === null) {
        mongooseConnection = await mongoose.createConnection(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        });
      } else {
        mongooseConnection = connection;
      }
      await beforeAllHook(mongooseConnection);
      resolve(mongooseConnection);
    });
    beforeEach(async () => {
      return removeAllCollections(mongooseConnection);
    });
    afterAll(async () => {
      await mongooseConnection?.close();
    });
  });
}
