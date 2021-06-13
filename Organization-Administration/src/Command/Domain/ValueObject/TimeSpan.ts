import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";
import Clock from "@app/Command/Domain/ValueObject/Clock";

export default class TimeSpan extends ValueObject {
  constructor(private start: Clock, private end: Clock) {
    super();
  }

  equals(other: this): boolean {
    return this.start.equals(other.start) && this.end.equals(other.end);
  }

  getStartTime() {
    return this.start;
  }

  getEndTime() {
    return this.end;
  }

  contains(time: Clock): boolean {
    // TODO should we handle cases where start time is greater than end time (night shift)
    //  e.g. start = 21:00:00, end = 03:00:00
    return time.greaterThanOrEqual(this.start) && time.lessThanOrEqual(this.end);
  }
}
