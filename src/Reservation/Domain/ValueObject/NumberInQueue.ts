export default class NumberInQueue {
    private number: string;

    constructor(number: string) {
        this.number = number;
    }

    getString(): string {
        return this.number;
    }
}
