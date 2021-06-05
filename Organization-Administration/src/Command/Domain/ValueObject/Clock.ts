import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";
import InvalidTimeError from "@app/Command/Domain/Error/InvalidTimeError";

export default class Clock extends ValueObject {
  private hours: number;
  private minutes: number;
  private seconds: number;

  constructor(hours: number, minutes: number, seconds: number) {
    super();
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.setHours(hours);
    this.setMinutes(minutes);
    this.setSeconds(seconds);
  }

  getHours(): number {
    return this.hours;
  }

  getMinutes(): number {
    return this.minutes;
  }

  getSeconds(): number {
    return this.seconds;
  }

  private setHours(value: number) {
    if (value < 0 || value >= 24) {
      throw new InvalidTimeError(`Invalid value for hours: ${value}`);
    }
    this.hours = value;
  }

  private setMinutes(value: number) {
    if (value < 0 || value >= 60) {
      throw new InvalidTimeError(`Invalid value for minutes: ${value}`);
    }
    this.minutes = value;
  }

  private setSeconds(value: number) {
    if (value < 0 || value >= 60) {
      throw new InvalidTimeError(`Invalid value for seconds: ${value}`);
    }
    this.seconds = value;
  }

  equals(other: this): boolean {
    return this.hours === other.hours
            && this.minutes === other.minutes
            && this.seconds === other.seconds;
  }

  greaterThan(other: this): boolean {
    const equalHours: boolean = this.hours === other.hours;
    const equalMinutes: boolean = this.minutes === other.minutes;
    if (this.hours > other.hours) {
      return true;
    }
    if (equalHours && this.minutes > other.minutes) {
      return true;
    }
    return equalHours && equalMinutes && this.seconds > other.seconds;
  }

  lessThanOrEqual(other: this): boolean {
    return !this.greaterThan(other);
  }

  greaterThanOrEqual(other: this): boolean {
    return this.greaterThan(other) || this.equals(other);
  }
}
