// TODO discuss: we should use a library that handles DateTime e.g. "https://www.npmjs.com/package/unix-timestamp"
// TODO make DateTime an interface
export default class DateTime {
    private readonly dateTime: Date;

    constructor(dateTime: Date) {
        this.dateTime = dateTime;
    }

    public static from(dateTime: string): DateTime {
        return new DateTime(new Date(dateTime));
    }

    public toString(): string {
        return this.dateTime.toDateString();
    }

    public toUnixTime(): number {
        return -1;
    }
}
