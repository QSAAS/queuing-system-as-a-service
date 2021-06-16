import { Request, Response } from "express";
import CreateOrganizationEndpointRequest from "@app/Command/Application/DataTransferObject/Request/CreateOrganizationEndpointRequest";
import GeolocationDTO from "@app/Command/Application/DataTransferObject/Object/GeolocationDTO";
import CreateOrganizationEndpoint from "@app/Command/Application/Service/CreateOrganizationEndpoint";
import Joi from "joi";
import EmployeeAccessTokenSchema from "@app/Command/Presentation/Api/ValidationSchema/EmployeeAccessTokenSchema";
import Controller from "@app/Command/Presentation/Api/Controller/Controller";

export default class OrganizationEndpointController extends Controller {
  constructor(private appService: CreateOrganizationEndpoint) {
    super();
  }

  async create(request: Request, response: Response) {
    await this.validateRequest(request);
    const { employeeId } = request.body.access_token;
    const { name, latitude, longitude } = request.body;
    const geolocationDto = new GeolocationDTO(latitude, longitude);
    const requestDto = new CreateOrganizationEndpointRequest(employeeId, name, geolocationDto);
    const responseDto = await this.appService.execute(requestDto);
    response.json(responseDto);
  }

  createSchema(): Joi.Schema {
    return Joi.object({
      access_token: EmployeeAccessTokenSchema,
      name: Joi.string().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    });
  }
}
