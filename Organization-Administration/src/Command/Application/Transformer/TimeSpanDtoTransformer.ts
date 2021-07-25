import Transformer from "@app/Command/Application/Transformer/Transformer";
import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import TimeSpanDTO from "@app/Command/Application/DataTransferObject/Object/TimeSpanDTO";
import ClockDTO from "@app/Command/Application/DataTransferObject/Object/ClockDTO";
import Clock from "@app/Command/Domain/ValueObject/Clock";

export default class TimeSpanDtoTransformer implements Transformer<TimeSpan, TimeSpanDTO>{
  toDTO(object: TimeSpan): TimeSpanDTO {
    const startTime = object.getStartTime();
    const endTime = object.getEndTime();
    return new TimeSpanDTO(
      new ClockDTO(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds()),
      new ClockDTO(endTime.getHours(), endTime.getMinutes(), endTime.getSeconds())
    )
  }

  toObject(dto: TimeSpanDTO): TimeSpan {
    return new TimeSpan(
      new Clock(dto.start.hours, dto.start.minutes, dto.start.seconds),
      new Clock(dto.end.hours, dto.end.minutes, dto.end.seconds)
    );
  }

}
