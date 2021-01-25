import { v4 as uuidv4 } from "uuid";

class ClientId {
    constructor(private readonly id: string) {}

    static from(id: string): ClientId { // What the hell is this supposed to do?
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
