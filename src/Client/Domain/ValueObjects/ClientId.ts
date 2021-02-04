import { v4 as uuidv4, validate as isValidUUID } from "uuid";
import InvalidUUIDError from "@app/Client/Domain/Errors/InvalidUUIDError";

class ClientId {
    constructor(private readonly id: string) {}

    static from(id: string): ClientId | never {
        if (!isValidUUID(id)) {
            throw new InvalidUUIDError(`'${id}' is not a valid UUID`);
        }
        return new ClientId(id);
    }

    static generate(): ClientId {
        return new ClientId(uuidv4());
    }

    toString(): string {
        return this.id;
    }
}

export default ClientId;
