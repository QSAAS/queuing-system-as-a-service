import InvalidTimeError from "@app/Command/Domain/Error/InvalidTimeError";
import ClockBuilder from "@tests/Command/Domain/ValueObject/Builder/ClockBuilder";

const base = new ClockBuilder().build();

describe("Invalid assignments", () => {
  it("Should throw an InvalidTimeError on hours < 0", () => {
    expect(() => {
      new ClockBuilder().withHours(-1).build();
    }).toThrow(InvalidTimeError);
  });

  it("Should throw an InvalidTimeError on hours >= 24", () => {
    expect(() => {
      new ClockBuilder().withHours(24).build();
    }).toThrow(InvalidTimeError);
  });

  it("Should throw an InvalidTimeError on minutes < 0", () => {
    expect(() => {
      new ClockBuilder().withMinutes(-1).build();
    }).toThrow(InvalidTimeError);
  });

  it("Should throw an InvalidTimeError on minutes >= 60", () => {
    expect(() => {
      new ClockBuilder().withMinutes(60).build();
    }).toThrow(InvalidTimeError);
  });

  it("Should throw an InvalidTimeError on seconds < 0", () => {
    expect(() => {
      new ClockBuilder().withSeconds(-1).build();
    }).toThrow(InvalidTimeError);
  });

  it("Should throw an InvalidTimeError on seconds >= 60", () => {
    expect(() => {
      new ClockBuilder().withSeconds(60).build();
    }).toThrow(InvalidTimeError);
  });
});

describe("Comparison", () => {
  it("Should return true if all time units are equal", () => {
    const other = new ClockBuilder().build();
    expect(base.equals(other)).toBeTruthy();
  });

  it("Should return true on greater hours and false on less hours", () => {
    const other = new ClockBuilder().withHours(base.getHours()! - 1).build();
    expect(base.greaterThan(other)).toBeTruthy();
    expect(other.greaterThan(base)).toBeFalsy();
  });

  it("Should return true on equal hours and greater minutes", () => {
    const other = new ClockBuilder().withMinutes(base.getMinutes()! - 1).build();
    expect(base.greaterThan(other)).toBeTruthy();
    expect(other.greaterThan(base)).toBeFalsy();
  });

  it("Should return true on equal hours, equal minutes, and greater seconds", () => {
    const other = new ClockBuilder().withSeconds(base.getSeconds()! - 1).build();
    expect(base.greaterThan(other)).toBeTruthy();
    expect(other.greaterThan(base)).toBeFalsy();
  });
});
