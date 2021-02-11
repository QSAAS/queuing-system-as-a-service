import ConnectionManager
    from "@app/SharedKernel/Infrastructure/Persistence/Mongoose/Connection/ConnectionManager";
import { Connection, createConnection } from "mongoose";

export default class SimpleConnectionManager implements ConnectionManager {
    private connection: Connection;

    constructor(db_url: string) {
        this.connection = createConnection(db_url);
    }

    getConnection(): Connection {
        return this.connection;
    }

    closeConnection(): void {
        this.connection.close();
    }
}
