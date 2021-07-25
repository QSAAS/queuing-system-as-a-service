import ClockDTO from "@app/Command/Application/DataTransferObject/Object/ClockDTO";

export default class TimeSpanDTO {
  constructor(public start: ClockDTO,
              public end: ClockDTO,
              ) {}
}
