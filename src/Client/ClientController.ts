import { Request } from "express";
import Client from "./Client";
import MongoClientRepository from "./MongoClientRepository";

class ClientController {
    register(request: Request) {
        const client = new Client(request.body.username, request.body.password, request.body.email);
        const repo = new MongoClientRepository(); // TODO inject ClientRepository type in constructor
        return repo.create(client);
    }
}

export default ClientController;
