export default class DateTime {
    // TODO: Make DateTime interface since it can have multiple implementations
    // This is a placeholder implementation using typescript's date time until we decide on a library or something.
    private readonly dateTime: Date;

    constructor(dateTime: Date) {
        this.dateTime = dateTime;
    }

    public static from(unixTimeStamp: number): DateTime {
        return new DateTime(new Date(unixTimeStamp * 1000));
    }

    public toString(): string {
        return this.dateTime.toDateString();
    }

    public toUnixTime(): number {
        // eslint-disable-next-line radix
        return parseInt((this.dateTime.getTime() / 1000).toFixed(0));
    }
}
