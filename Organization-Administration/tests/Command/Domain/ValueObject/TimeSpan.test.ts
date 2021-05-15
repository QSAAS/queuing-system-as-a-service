import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import Time from "@app/Command/Domain/ValueObject/Time";
import TimeSpanBuilder from "@tests/Builders/TimeSpanBuilder";

const base = new TimeSpanBuilder().build();

describe("Contains", () => {
  it("Should return false if time is greater than span end", () => {
    const greater = new Time(base.end.hours! + 1, 0, 0);
    expect(base.contains(greater)).toBeFalsy();
  });
  it("Should return false if time is less than span start", () => {
    const less = new Time(base.start.hours! - 1, 0, 0);
    expect(base.contains(less)).toBeFalsy();
  });
  it("Should return true if time is within span start and end", () => {
    const within = new Time(base.start.hours! + 1, 0, 0);
    expect(base.contains(within)).toBeTruthy();
  });
});

describe("Comparison", () => {
  it("Should return true if spans have equal start and end values", () => {
    const other = new TimeSpan(
      new Time(base.start.hours!, base.start.minutes!, base.start.seconds!),
      new Time(base.end.hours!, base.end.minutes!, base.end.seconds!),
    );
    expect(base.equals(other)).toBeTruthy();
  });
});
