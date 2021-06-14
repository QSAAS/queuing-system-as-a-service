import IClock from "@app/Command/Infrastructure/Repository/Mongoose/Types/IClock";

export default interface ITimeSpan {
  start: IClock;
  end: IClock;
}
