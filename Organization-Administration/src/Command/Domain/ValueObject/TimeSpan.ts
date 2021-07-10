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
    // Normal case, from 9 to 5
    if (this.start.lessThanOrEqual(this.end)) {
      return time.greaterThanOrEqual(this.start) && time.lessThanOrEqual(this.end);
    }
    // other case e.g. start = 21:00:00, end = 03:00:00
    const dayEnd = new Clock(23, 59, 59);
    const dayStart = new Clock(0, 0, 0);
    return (
      (time.greaterThanOrEqual(this.start) && time.lessThanOrEqual(dayEnd)) ||
      (time.greaterThanOrEqual(dayStart) && time.lessThanOrEqual(this.end))
    );
  }
}
