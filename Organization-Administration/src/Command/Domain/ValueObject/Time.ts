import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";
import InvalidTimeError from "@app/Command/Domain/Error/InvalidTimeError";
import InvalidTimeComparisonError from "@app/Command/Domain/Error/InvalidTimeComparisonError";

/* eslint-disable no-underscore-dangle */

// TODO TypeScript has no Integer type, should we use a package?
export default class Time extends ValueObject { // changed class name from 'Clock' to 'Time'
  private _hours: number | undefined;
  private _minutes: number | undefined;
  private _seconds: number | undefined;

  constructor(hours: number, minutes: number, seconds: number) {
    super();

    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
  }

  get hours(): number | undefined {
    return this._hours;
  }

  get minutes(): number | undefined {
    return this._minutes;
  }

  get seconds(): number | undefined {
    return this._seconds;
  }

  set hours(value: number | undefined) {
    if (value === undefined || value < 0 || value >= 24) {
      throw new InvalidTimeError(`Invalid value for hours: ${value}`);
    }
    this._hours = value;
  }

  set minutes(value: number | undefined) {
    if (value === undefined || value < 0 || value >= 60) {
      throw new InvalidTimeError(`Invalid value for minutes: ${value}`);
    }
    this._minutes = value;
  }

  set seconds(value: number | undefined) {
    if (value === undefined || value < 0 || value >= 60) {
      throw new InvalidTimeError(`Invalid value for seconds: ${value}`);
    }
    this._seconds = value;
  }

  equals(other: this): boolean {
    return this._hours === other._hours
            && this._minutes === other._minutes
            && this._seconds === other._seconds;
  }

  greaterThan(other: this): boolean {
    if (this._seconds === undefined
        || this._minutes === undefined
        || this._hours === undefined
        || other._hours === undefined
        || other._minutes === undefined
        || other._seconds === undefined) {
      throw new InvalidTimeComparisonError();
    }

    const equalHours: boolean = this._hours === other._hours;
    const equalMinutes: boolean = this._minutes === other._minutes;
    if (this._hours > other._hours) {
      return true;
    }
    if (equalHours && this._minutes > other._minutes) {
      return true;
    }
    return equalHours && equalMinutes && this._seconds > other._seconds;
  }

  lessThanOrEqual(other: this): boolean {
    return !this.greaterThan(other);
  }

  greaterThanOrEqual(other: this): boolean {
    return this.greaterThan(other) || this.equals(other);
  }
}
