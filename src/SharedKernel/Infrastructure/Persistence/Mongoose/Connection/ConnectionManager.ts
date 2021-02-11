import { Connection } from "mongoose";

export default interface ConnectionManager {
    getConnection(): Connection;
    closeConnection(): void;
}
