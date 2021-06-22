import Clock from "@app/Command/Domain/ValueObject/Clock";
import IClock from "@app/Command/Infrastructure/Repository/Mongoose/Types/IClock";
import GenericTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/Interface/GenericTransformer";

export default class ClockMongooseTransformer implements GenericTransformer<IClock, Clock> {
  mongooseObjectFrom(clockInstance: Clock): IClock {
    return {
      hours: clockInstance.getHours(),
      minutes: clockInstance.getMinutes(),
      seconds: clockInstance.getSeconds(),
    };
  }

  domainInstanceFrom(clockObject: IClock): Clock {
    return new Clock(clockObject.hours, clockObject.minutes, clockObject.seconds);
  }
}
