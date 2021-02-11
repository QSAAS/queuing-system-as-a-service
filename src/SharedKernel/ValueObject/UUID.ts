import { v4 as uuidv4, validate as isValidUUID } from "uuid";

export default class UUID {
    private readonly id: string;

    constructor(id: string) {
        this.id = id;
    }

    static from(id: string): UUID {
        if (!isValidUUID(id)) throw new Error(`'${id}' is not a valid UUID`);
        return new UUID(id);
    }

    static create(): UUID {
        return new UUID(uuidv4());
    }

    toString(): string {
        return this.id;
    }
}
