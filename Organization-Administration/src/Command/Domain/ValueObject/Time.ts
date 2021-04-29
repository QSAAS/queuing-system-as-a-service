import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";

// TODO TypeScript has no Integer type, should we use a package?
export default class Time extends ValueObject {
  constructor(public readonly hours: number, public readonly minutes: number, public readonly seconds: number) {
    super();

    // TODO create custom errors
    if ((hours < 0 || hours >= 24) || (minutes < 0 || minutes >= 60) || (seconds < 0 || seconds >= 60)) {
      throw new Error("Invalid value(s) for time");
    }
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
