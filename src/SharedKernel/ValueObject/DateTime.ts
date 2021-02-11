import InvalidDateTimeError from "@app/SharedKernel/Errors/InvalidDateTimeError";

export default class DateTime {
    private readonly dateTime: Date;

    constructor(dateTime: Date) {
        this.dateTime = dateTime;
    }

    public static from(unixTimeStamp: number): DateTime {
        if (unixTimeStamp < 0) throw new InvalidDateTimeError("Unix Timestamp can't be negative");
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
