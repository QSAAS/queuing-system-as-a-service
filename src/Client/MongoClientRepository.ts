import { Document } from "mongoose";
import ClientRepository from "./ClientRepository";
import Client from "./Client";
import MongoClientModel from "./MongoClientModel";

class MongoClientRepository implements ClientRepository {
    create(client: Client): Promise<Document> {
        const mongoClient = new MongoClientModel({
            username: client.getUsername(),
            password: client.getPassword(),
            email: client.getEmail(),
        });
        return mongoClient.save();
    }
}

export default MongoClientRepository;
