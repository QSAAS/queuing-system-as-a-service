export default class QueuingNodeId {
    private readonly id: string;

    constructor(id: string) {
        this.id = id;
    }

    static from(id: string) {
        return new QueuingNodeId(id);
    }

    getString(): string {
        return this.id;
    }
}
