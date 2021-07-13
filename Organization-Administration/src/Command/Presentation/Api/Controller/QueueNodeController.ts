import { Request, Response } from "express";
import Joi from "joi";
import CreateQueueNodeService from "@app/Command/Application/Service/CreateQueueNodeService";
import Controller from "@app/Command/Presentation/Api/Controller/Controller";
import EmployeeAccessTokenSchema from "@app/Command/Presentation/Api/ValidationSchema/EmployeeAccessTokenSchema";
import TimeSpanDTO from "@app/Command/Application/DataTransferObject/Object/TimeSpanDTO";
import ClockDTO from "@app/Command/Application/DataTransferObject/Object/ClockDTO";
import CreateQueueNodeRequest from "@app/Command/Application/DataTransferObject/Request/CreateQueueNodeRequest";
import MetadataSpecificationFieldDTO
  from "@app/Command/Application/DataTransferObject/Object/MetadataSpecificationFieldDTO";

export default class QueueNodeController extends Controller {
  constructor(private appService: CreateQueueNodeService) {
    super();
  }

  async create(request: Request, response: Response) {
    await this.validateRequest(request);
    const { employeeId } = request.body.access_token;
    const {
      endpointId,
      metaSpecs,
      timeSpan
    } = request.body;
    const {
      hours: sHours,
      minutes: sMinutes,
      seconds: sSeconds
    } = timeSpan.start;
    const {
      hours: eHours,
      minutes: eMinutes,
      seconds: eSeconds
    } = timeSpan.end;
    const metaSpecsDto = metaSpecs.map((field) => new MetadataSpecificationFieldDTO(
      field.name,
      field.isRequired,
      JSON.stringify(field.)
    ))
    const timeSpanDto = new TimeSpanDTO(
      new ClockDTO(
        sHours,
        sMinutes,
        sSeconds,
      ),
      new ClockDTO(
        eHours,
        eMinutes,
        eSeconds,
      ),
    );
    const requestDto = new CreateQueueNodeRequest(
      employeeId,
      endpointId,
      metaSpecsDto,
      timeSpanDto,
    );
    const responseDto = await this.appService.execute(requestDto);
    response.json(responseDto);
  }

  protected createSchema(): Joi.Schema {
    const field = Joi.object()
      .keys({
        name: Joi.string()
          .required(),
        isRequired: Joi.boolean()
          .required(),
        kind: Joi.string()
          .required(),
      });

    const clock = Joi.object()
      .keys({
        hours: Joi.number()
          .min(0)
          .max(23),
        minutes: Joi.number()
          .min(0)
          .max(59),
        seconds: Joi.number()
          .min(0)
          .max(59),
      });

    return Joi.object({
      access_token: EmployeeAccessTokenSchema,
      endpointId: Joi.number()
        .required(),
      metaSpecs: Joi.array()
        .items(field),
      timeSpan: Joi.object()
        .keys({
          start: clock,
          end: clock,
        })
    });
  }
}
