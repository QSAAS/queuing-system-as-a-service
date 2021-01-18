export default class CustomerId {
    private readonly id: string;

    constructor(id: string) {
        this.id = id;
    }

    static from(customerId: string): CustomerId {
        return new CustomerId(customerId);
    }

    getString(): string {
        return this.id;
    }
}