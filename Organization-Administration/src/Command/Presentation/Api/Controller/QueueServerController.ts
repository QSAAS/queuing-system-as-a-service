import { Request, Response } from "express";
import Joi from "joi";
import EmployeeAccessTokenSchema from "@app/Command/Presentation/Api/ValidationSchema/EmployeeAccessTokenSchema";
import Controller from "@app/Command/Presentation/Api/Controller/Controller";
import CreateQueueServerService from "@app/Command/Application/Service/CreateQueueServerService";
import CreateQueueServerRequest from "@app/Command/Application/DataTransferObject/Request/CreateQueueServerRequest";

export default class QueueServerController extends Controller {
  constructor(private appService: CreateQueueServerService) {
    super();
  }

  async create(request: Request, response: Response) {
    await this.validateRequest(request);
    const { employeeId } = request.body.access_token;
    const { endpointId, queueNodeIds } = request.body;
    const requestDto = new CreateQueueServerRequest(employeeId, endpointId, queueNodeIds);
    const responseDto = await this.appService.execute(requestDto);
    response.json(responseDto);
  }

  protected createSchema(): Joi.Schema {
    return Joi.object({
      access_token: EmployeeAccessTokenSchema,
      employeeId: Joi.string().required(),
      endpointId: Joi.string().required(),
      queueNodeIds: Joi.array().required(),
    });
  }
}
