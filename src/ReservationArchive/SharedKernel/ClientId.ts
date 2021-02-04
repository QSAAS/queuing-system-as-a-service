import { v4 as uuidv4 } from "uuid";

export default class ClientId {
    private readonly id: string;

    constructor(id: string) {
        this.id = id;
    }

    static from(id: string): ClientId {
        return new ClientId(id);
    }

    static create(): ClientId {
        return new ClientId(uuidv4());
    }

    getString(): string {
        return this.id;
    }
}
