import ClockTransformer from "@app/Command/Infrastructure/Mongoose/Transformer/ClockTransformer";
import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import ITimeSpan from "@app/Command/Infrastructure/Mongoose/Types/ITimeSpan";

export default class TimeSpanTransformer {
  constructor(
    private clockTransformer: ClockTransformer,
  ) {
  }

  toMongooseType(timespan: TimeSpan): ITimeSpan {
    return {
      start: this.clockTransformer.toMongooseType(timespan.getStartTime()),
      end: this.clockTransformer.toMongooseType(timespan.getEndTime()),
    };
  }

  toDomainObject(timespan: ITimeSpan): TimeSpan {
    return new TimeSpan(
      this.clockTransformer.toDomainObject(timespan.start), this.clockTransformer.toDomainObject(timespan.end),
    );
  }
}
