import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import Clock from "@app/Command/Domain/ValueObject/Clock";
import ClockBuilder from "@tests/Command/Domain/ValueObject/Builder/ClockBuilder";

export default class TimeSpanBuilder {
  private start: Clock;
  private end: Clock;

  constructor() {
    this.start = new ClockBuilder().withHours(9).withMinutes(0).withSeconds(0).build();
    this.end = new ClockBuilder().withHours(17).withMinutes(0).withSeconds(0).build();
  }

  public withStart(clock: Clock) {
    this.start = clock;
    return this;
  }

  public withEnd(clock: Clock) {
    this.end = clock;
    return this;
  }

  build() {
    return new TimeSpan(this.start, this.end);
  }
}
