import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import Clock from "@app/Command/Domain/ValueObject/Clock";

export default class TimeSpanBuilder {
  build() {
    // 9 to 5 🤡
    return new TimeSpan(
      new Clock(9, 0, 0),
      new Clock(17, 0, 0),
    );
  }
}
