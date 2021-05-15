import Time from "@app/Command/Domain/ValueObject/Time";

export default class TimeBuilder {
  private readonly time: Time;
  constructor() {
    this.time = new Time(12, 50, 13);
  }

  hours(value: number) {
    this.time.hours = value;
    return this;
  }

  minutes(value: number) {
    this.time.minutes = value;
    return this;
  }

  seconds(value: number) {
    this.time.seconds = value;
    return this;
  }

  build() {
    return this.time;
  }
}
