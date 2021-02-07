import { v4 as uuidv4 } from "uuid";

export default class UUID {
    private readonly id: string;

    constructor(id: string) {
        this.id = id;
    }

    static from(id: string): UUID {
        return new UUID(id);
    }

    static create(): UUID {
        return new UUID(uuidv4());
    }

    toString(): string {
        return this.id;
    }
}
