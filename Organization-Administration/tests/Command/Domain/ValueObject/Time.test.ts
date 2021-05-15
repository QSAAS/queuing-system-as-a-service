import InvalidTimeError from "@app/Command/Domain/Error/InvalidTimeError";
import TimeBuilder from "@tests/Builders/TimeBuilder";

/* eslint-disable no-new */

const base = new TimeBuilder().build();

describe("Invalid assignments", () => {
  it("Should throw an InvalidTimeError on hours < 0", () => {
    expect(() => {
      new TimeBuilder().hours(-1).build();
    }).toThrow(InvalidTimeError);
  });

  it("Should throw an InvalidTimeError on hours >= 24", () => {
    expect(() => {
      new TimeBuilder().hours(24).build();
    }).toThrow(InvalidTimeError);
  });

  it("Should throw an InvalidTimeError on minutes < 0", () => {
    expect(() => {
      new TimeBuilder().minutes(-1).build();
    }).toThrow(InvalidTimeError);
  });

  it("Should throw an InvalidTimeError on minutes >= 60", () => {
    expect(() => {
      new TimeBuilder().minutes(60).build();
    }).toThrow(InvalidTimeError);
  });

  it("Should throw an InvalidTimeError on seconds < 0", () => {
    expect(() => {
      new TimeBuilder().seconds(-1).build();
    }).toThrow(InvalidTimeError);
  });

  it("Should throw an InvalidTimeError on seconds >= 60", () => {
    expect(() => {
      new TimeBuilder().seconds(60).build();
    }).toThrow(InvalidTimeError);
  });
});

describe("Comparison", () => {
  it("Should return true if all time units are equal", () => {
    const other = new TimeBuilder().build();
    expect(base.equals(other)).toBeTruthy();
  });

  it("Should return true on greater hours and false on less hours", () => {
    const other = new TimeBuilder().hours(base.hours! - 1).build();
    expect(base.greaterThan(other)).toBeTruthy();
    expect(other.greaterThan(base)).toBeFalsy();
  });

  it("Should return true on equal hours and greater minutes", () => {
    const other = new TimeBuilder().minutes(base.minutes! - 1).build();
    expect(base.greaterThan(other)).toBeTruthy();
    expect(other.greaterThan(base)).toBeFalsy();
  });

  it("Should return true on equal hours, equal minutes, and greater seconds", () => {
    const other = new TimeBuilder().seconds(base.seconds! - 1).build();
    expect(base.greaterThan(other)).toBeTruthy();
    expect(other.greaterThan(base)).toBeFalsy();
  });
});
