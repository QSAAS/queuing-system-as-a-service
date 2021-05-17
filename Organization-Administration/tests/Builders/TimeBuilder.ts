import Time from "@app/Command/Domain/ValueObject/Time";

const hours = 12;
const minutes = 50;
const seconds = 13;

export default class TimeBuilder {
  private time: Time;
  constructor() {
    this.time = new Time(hours, minutes, seconds);
  }

  hours(value: number) {
    this.time = new Time(value, minutes, seconds);
    return this;
  }

  minutes(value: number) {
    this.time = new Time(hours, value, seconds);
    return this;
  }

  seconds(value: number) {
    this.time = new Time(hours, minutes, value);
    return this;
  }

  build() {
    return this.time;
  }
}
