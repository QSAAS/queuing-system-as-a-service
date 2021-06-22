import ClockMongooseTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/ClockMongooseTransformer";
import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import ITimeSpan from "@app/Command/Infrastructure/Repository/Mongoose/Types/ITimeSpan";
import GenericTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/Interface/GenericTransformer";

export default class TimeSpanMongooseTransformer implements GenericTransformer<ITimeSpan, TimeSpan> {
  constructor(private clockTransformer: ClockMongooseTransformer) {}

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
