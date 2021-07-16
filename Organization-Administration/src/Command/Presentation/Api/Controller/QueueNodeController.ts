import { Request, Response } from "express";
import Joi from "joi";
import CreateQueueNodeService from "@app/Command/Application/Service/CreateQueueNodeService";
import Controller from "@app/Command/Presentation/Api/Controller/Controller";
import EmployeeAccessTokenSchema from "@app/Command/Presentation/Api/ValidationSchema/EmployeeAccessTokenSchema";
import TimeSpanDTO from "@app/Command/Application/DataTransferObject/Object/TimeSpanDTO";
import ClockDTO from "@app/Command/Application/DataTransferObject/Object/ClockDTO";
import CreateQueueNodeRequest from "@app/Command/Application/DataTransferObject/Request/CreateQueueNodeRequest";
import MetadataSpecificationFieldDtoTransformer
  from "@app/Command/Application/Transformer/MetadataSpecificationFieldDtoTransformer";

export default class QueueNodeController extends Controller {
  constructor(private appService: CreateQueueNodeService,
              private transformer: MetadataSpecificationFieldDtoTransformer) {
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

    const metaSpecsDto = metaSpecs.map((field: {
      name: string,
      isRequired: boolean,
      kind: string,
      options?: string[],
      maxLength?: number,
      minLength?: number,
      placeholder?: string,
    }) => this.transformer.toDtoFromJson(field));

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

    const field = Joi.object({
      name: Joi.string()
        .required(),
      isRequired: Joi.boolean()
        .required(),
      kind: Joi.string()
        .valid("text", "dropdown")
        .required(),

      // text field
      maxLength: Joi.when("kind", { is: "text",
        then: Joi.number()
          .min(0)
          .required()
      }),
      minLength: Joi.when("kind", { is: "text",
        then: Joi.number()
          .min(0)
          .required()
      }),
      placeholder: Joi.when("kind", { is: "text",
        then: Joi.string()
          .required()
      }),

      // dropdown
      options: Joi.when("kind", { is: "dropdown",
        then: Joi.array()
          .items(Joi.string())
          .required()
      })
    }); // 'field' is not required as metaSpecs can be an empty array

    const clock = Joi.object()
      .keys({
        hours: Joi.number()
          .min(0)
          .max(23)
          .required(),
        minutes: Joi.number()
          .min(0)
          .max(59)
          .required(),
        seconds: Joi.number()
          .min(0)
          .max(59)
          .required(),
      })
      .required();

    return Joi.object({
      access_token: EmployeeAccessTokenSchema,
      endpointId: Joi.string()
        .required(),
      metaSpecs: Joi.array()
        .items(field)
        .required(),
      timeSpan: Joi.object()
        .keys({
          start: clock,
          end: clock,
        })
        .required(),
    });
  }
}
