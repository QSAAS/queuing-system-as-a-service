import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";
import Time from "@app/Command/Domain/ValueObject/Time";

export default class TimeSpan extends ValueObject {
  constructor(public readonly start: Time, public readonly end: Time) {
    super();
  }

  equals(other: this): boolean {
    return (this.start.equals(other.start) && this.end.equals(other.end));
  }

  contains(time: Time): boolean {
    // TODO should we handle cases where start time is greater than end time (night shift)
    //  e.g. start = 21:00:00, end = 03:00:00
    return time.greaterThanOrEqual(this.start) && time.lessThanOrEqual(this.end);
  }
}
