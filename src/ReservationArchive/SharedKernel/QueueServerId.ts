import { v4 as uuidv4 } from "uuid";

export default class QueueServerId {
    private readonly id: string;

    constructor(id: string) {
        this.id = id;
    }

    static from(id: string): QueueServerId {
        return new QueueServerId(id);
    }

    static create(): QueueServerId {
        return new QueueServerId(uuidv4());
    }

    getString(): string {
        return this.id;
    }
}
