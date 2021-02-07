import ConnectionManager
    from "@app/SharedKernel/Infrastructure/Persistence/Mongoose/Connection/ConnectionManager";
import { Connection, createConnection } from "mongoose";

export default class SingletonConnectionManager implements ConnectionManager {
    private static connection: Connection;

    constructor(db_url: string) {
        SingletonConnectionManager.connection = createConnection(db_url);
    }

    getConnection(): Connection {
        return SingletonConnectionManager.connection;
    }
}
