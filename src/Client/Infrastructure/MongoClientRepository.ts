import { Document } from "mongoose";
import ClientRepository from "../Domain/Repositories/ClientRepository";
import Client from "../Domain/Entities/Client";
import MongoClientModel from "./MongoClientModel";

class MongoClientRepository implements ClientRepository {
    create(client: Client): Promise<Document> {
        const mongoClient = new MongoClientModel({
            id: client.getId().toString(),
            username: client.getUsername(),
            password: client.getPassword(),
            email: client.getEmail(),
        });
        return mongoClient.save();
    }
}

export default MongoClientRepository;
