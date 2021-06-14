import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import Clock from "@app/Command/Domain/ValueObject/Clock";
import TimeSpanBuilder from "@tests/Command/Domain/ValueObject/TimeSpanBuilder";

const base = new TimeSpanBuilder().build();
const alternate = new TimeSpanBuilder().withStart(new Clock(22, 0, 0)).withEnd(new Clock(6, 0, 0)).build();

describe("Contains", () => {
  it("Should return false if time is greater than span end", () => {
    const greater = new Clock(base.getEndTime().getHours() + 1, 0, 0);
    expect(base.contains(greater)).toBeFalsy();
  });

  it("Should return false if time is less than span start", () => {
    const less = new Clock(base.getStartTime().getHours() - 1, 0, 0);
    expect(base.contains(less)).toBeFalsy();
  });

  it("Should return true if time is within span start and end", () => {
    const within = new Clock(base.getStartTime().getHours() + 1, 0, 0);
    expect(base.contains(within)).toBeTruthy();
  });

  it("Should return false if time is greater than span end (alternate shift)", () => {
    const greater = new Clock(alternate.getEndTime().getHours() + 1, 0, 0);
    expect(alternate.contains(greater)).toBeFalsy();
  });

  it("Should return false if time is less than span start (alternate shift)", () => {
    const less = new Clock(alternate.getStartTime().getHours() - 1, 0, 0);
    expect(alternate.contains(less)).toBeFalsy();
  });

  it("Should return true if time is within span start and end (alternate shift)", () => {
    const within = new Clock(alternate.getStartTime().getHours() + 1, 0, 0);
    expect(alternate.contains(within)).toBeTruthy();
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
