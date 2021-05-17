import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";
import InvalidTimeError from "@app/Command/Domain/Error/InvalidTimeError";
import InvalidTimeComparisonError from "@app/Command/Domain/Error/InvalidTimeComparisonError";

/* eslint-disable no-underscore-dangle */

// TODO TypeScript has no Integer type, should we use a package?
export default class Time extends ValueObject { // changed class name from 'Clock' to 'Time'
  private hours: number | undefined;
  private minutes: number | undefined;
  private seconds: number | undefined;

  constructor(hours: number, minutes: number, seconds: number) {
    super();
    this.setHours(hours);
    this.setMinutes(minutes);
    this.setSeconds(seconds);
  }

  getHours(): number | undefined {
    return this.hours;
  }

  getMinutes(): number | undefined {
    return this.minutes;
  }

  getSeconds(): number | undefined {
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
    if (this.seconds === undefined
        || this.minutes === undefined
        || this.hours === undefined
        || other.hours === undefined
        || other.minutes === undefined
        || other.seconds === undefined) {
      throw new InvalidTimeComparisonError();
    }

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
