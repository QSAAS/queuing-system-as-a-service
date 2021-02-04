import { v4 as uuidv4 } from "uuid";

export default class ReservationId {
    private readonly id: string;

    constructor(id: string) {
        this.id = id;
    }

    static from(id: string): ReservationId {
        return new ReservationId(id);
    }

    static create(): ReservationId {
        return new ReservationId(uuidv4());
    }

    getString(): string {
        return this.id;
    }
}
