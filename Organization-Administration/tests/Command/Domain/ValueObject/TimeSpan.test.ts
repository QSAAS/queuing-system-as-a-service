import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import Clock from "@app/Command/Domain/ValueObject/Clock";
import TimeSpanBuilder from "@tests/Command/Domain/ValueObject/TimeSpanBuilder";

const base = new TimeSpanBuilder().build();

describe("Contains", () => {
  it("Should return false if time is greater than span end", () => {
    const greater = new Clock(base.getEndTime().getHours()! + 1, 0, 0);
    expect(base.contains(greater)).toBeFalsy();
  });
  it("Should return false if time is less than span start", () => {
    const less = new Clock(base.getStartTime().getHours()! - 1, 0, 0);
    expect(base.contains(less)).toBeFalsy();
  });
  it("Should return true if time is within span start and end", () => {
    const within = new Clock(base.getStartTime().getHours()! + 1, 0, 0);
    expect(base.contains(within)).toBeTruthy();
  });
});

describe("Comparison", () => {
  it("Should return true if spans have equal start and end values", () => {
    const other = new TimeSpan(
      new Clock(base.getStartTime().getHours()!, base.getStartTime().getMinutes()!, base.getStartTime().getSeconds()!),
      new Clock(base.getEndTime().getHours()!, base.getEndTime().getMinutes()!, base.getEndTime().getSeconds()!),
    );
    expect(base.equals(other)).toBeTruthy();
  });
});
