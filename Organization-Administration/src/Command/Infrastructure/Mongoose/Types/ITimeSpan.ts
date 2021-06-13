import IClock from "@app/Command/Infrastructure/Mongoose/Types/IClock";

export default interface ITimeSpan {
  start: IClock;
  end: IClock;
}
