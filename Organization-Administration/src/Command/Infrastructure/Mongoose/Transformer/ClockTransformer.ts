import Clock from "@app/Command/Domain/ValueObject/Clock";
import IClock from "@app/Command/Infrastructure/Mongoose/Types/IClock";
import GenericTransformer from "@app/Command/Infrastructure/Mongoose/Transformer/Interface/GenericTransformer";

export default class ClockTransformer implements GenericTransformer<IClock, Clock> {
  mongooseObjectFrom(clockInstance: Clock): IClock {
    return {
      hours: clockInstance.getHours()!,
      minutes: clockInstance.getMinutes()!,
      seconds: clockInstance.getSeconds()!,
      // TODO remove not null assertion operator after merge
    };
  }

  domainInstanceFrom(clockObject: IClock): Clock {
    return new Clock(clockObject.hours, clockObject.minutes, clockObject.seconds);
  }
}
