import Clock from "@app/Command/Domain/ValueObject/Clock";

export default class ClockBuilder {
  private hours: number;
  private minutes: number;
  private seconds: number;
  constructor(
  ) {
    this.hours = 12;
    this.minutes = 50;
    this.seconds = 13;
  }

  withHours(value: number): ClockBuilder {
    this.hours = value;
    return this;
  }

  withMinutes(value: number): ClockBuilder {
    this.minutes = value;
    return this;
  }

  withSeconds(value: number): ClockBuilder {
    this.seconds = value;
    return this;
  }

  build(): Clock {
    return new Clock(this.hours, this.minutes, this.seconds);
  }
}
