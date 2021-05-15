import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import Time from "@app/Command/Domain/ValueObject/Time";

export default class TimeSpanBuilder {
  private readonly span: TimeSpan;
  constructor() {
    // 9 to 5 🤡
    this.span = new TimeSpan(
      new Time(9, 0, 0),
      new Time(17, 0, 0),
    );
  }

  build() {
    return this.span;
  }
}
