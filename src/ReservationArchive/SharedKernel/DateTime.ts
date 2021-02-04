export default class DateTime {
    // TODO: Make DateTime interface since it can have multiple implementations
    // This is a placeholder implementation using typescript's date time until we decide on a library or something.
    private readonly dateTime: Date;

    constructor(dateTime: Date) {
        this.dateTime = dateTime;
    }

    public static from(dateTime: string): DateTime {
        return new DateTime(new Date(dateTime));
    }

    public getDateTimeString(): string {
        return this.dateTime.toDateString();
    }
}
