import Clock from "@app/Command/Domain/ValueObject/Clock";
import IClock from "@app/Command/Infrastructure/Mongoose/Types/IClock";

export default class ClockTransformer {
  toMongooseType(clock: Clock): IClock {
    return {
      hours: clock.getHours()!,
      minutes: clock.getMinutes()!,
      seconds: clock.getSeconds()!,
    };
  }

  toDomainObject(clock: IClock): Clock {
    return new Clock(clock.hours, clock.minutes, clock.seconds);
  }
}
