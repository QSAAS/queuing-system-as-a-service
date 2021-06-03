import ClockTransformer from "@app/Command/Infrastructure/Mongoose/Transformer/ClockTransformer";
import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import ITimeSpan from "@app/Command/Infrastructure/Mongoose/Types/ITimeSpan";
import GenericTransformer from "@app/Command/Infrastructure/Mongoose/Transformer/Interface/GenericTransformer";

export default class TimeSpanTransformer implements GenericTransformer<ITimeSpan, TimeSpan> {
  constructor(
    private clockTransformer: ClockTransformer,
  ) {
  }

  mongooseObjectFrom(timeSpanInstance: TimeSpan): ITimeSpan {
    return {
      start: this.clockTransformer.mongooseObjectFrom(timeSpanInstance.getStartTime()),
      end: this.clockTransformer.mongooseObjectFrom(timeSpanInstance.getEndTime()),
    };
  }

  domainInstanceFrom(timeSpanObject: ITimeSpan): TimeSpan {
    return new TimeSpan(
      this.clockTransformer.domainInstanceFrom(timeSpanObject.start),
      this.clockTransformer.domainInstanceFrom(timeSpanObject.end),
    );
  }
}
