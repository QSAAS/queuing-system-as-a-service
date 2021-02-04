import {
    model, Document, Schema, Model,
} from "mongoose";
import ClientId from "@app/Client/Domain/ValueObjects/ClientId";
import ClientRepository from "../Domain/Repositories/ClientRepository";
import Client from "../Domain/Entities/Client";

/**
 * FixMe discuss: this interface does not serve the purpose we intend it to,
 * I think the only thing it does is provide type hints for mongoose model instances.
 * However, it does not provide any error checking whatsoever.
 */
interface IClient extends Document {
    id: string;
    username: string;
    password: string;
    email: string;
}

const schema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 256,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
    },
});

const mongooseClient: Model<IClient> = model("Client", schema);

class MongoClientRepository implements ClientRepository {
    async save(client: Client): Promise<Client> {
        const mongoClient = await mongooseClient.create({
            id: client.getId().toString(),
            username: client.getUsername(),
            password: client.getPassword(),
            email: client.getEmail(),
        });
        return MongoClientRepository.toClient(mongoClient);
    }

    private static toClient(mongoClient: IClient): Client {
        return new Client(ClientId.from(mongoClient.id), mongoClient.username, mongoClient.password, mongoClient.email);
    }
}

export default MongoClientRepository;
