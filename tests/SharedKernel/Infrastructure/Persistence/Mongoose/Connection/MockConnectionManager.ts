import ConnectionManager from "@app/SharedKernel/Infrastructure/Persistence/Mongoose/Connection/ConnectionManager";
import { Connection, createConnection } from "mongoose";

export default class MockConnectionManager implements ConnectionManager {
    private readonly connection: Connection;
    constructor() {
        this.connection = createConnection("mongodb://127.0.0.1:27017/testingdb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    getConnection(): Connection {
        return this.connection;
    }
}
