import { v4 as uuidv4 } from "uuid";

export default class QueuingNodeId {
    private readonly id: string;

    constructor(id: string) {
        this.id = id;
    }

    static from(id: string): QueuingNodeId {
        return new QueuingNodeId(id);
    }

    static create(): QueuingNodeId {
        return new QueuingNodeId(uuidv4());
    }

    getString(): string {
        return this.id;
    }
}
