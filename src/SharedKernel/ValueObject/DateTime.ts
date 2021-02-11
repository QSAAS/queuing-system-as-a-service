export default class DateTime {
    // TODO: Make DateTime interface since it can have multiple implementations
    // This is a placeholder implementation using typescript's date time until we decide on a library or something.
    private readonly dateTime: Date;

    constructor(dateTime: Date) {
        this.dateTime = dateTime;
    }

    public static from(dateTime: number): DateTime {
        return new DateTime(new Date(dateTime));
    }

    public toString(): string {
        return this.dateTime.toDateString();
    }

    public toUnixTimeStamp(): number {
        return this.dateTime.getTime() / 1000;
    }
}
