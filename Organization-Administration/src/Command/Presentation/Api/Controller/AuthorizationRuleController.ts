import { Request, Response } from "express";
import Joi from "joi";
import EmployeeAccessTokenSchema from "@app/Command/Presentation/Api/ValidationSchema/EmployeeAccessTokenSchema";
import Controller from "@app/Command/Presentation/Api/Controller/Controller";
import CreateAuthorizationRuleService from "@app/Command/Application/Service/CreateAuthorizationRuleService";
import PermissionDTO from "@app/Command/Application/DataTransferObject/Object/PermissionDTO";
import CreateAuthorizationRuleRequest from "@app/Command/Application/DataTransferObject/Request/CreateAuthorizationRuleRequest";

export default class AuthorizationRuleController extends Controller {
  constructor(private appService: CreateAuthorizationRuleService) {
    super();
  }

  async create(request: Request, response: Response) {
    await this.validateRequest(request);
    const { employeeId: adminId } = request.body.access_token;
    const { employeeId, resourceId, resourceType, accessType } = request.body;
    const permissionDto = new PermissionDTO(resourceId, resourceType, accessType);
    const requestDto = new CreateAuthorizationRuleRequest(adminId, employeeId, permissionDto);
    const responseDto = await this.appService.execute(requestDto);
    response.json(responseDto);
  }

  protected createSchema(): Joi.Schema {
    return Joi.object({
      access_token: EmployeeAccessTokenSchema,
      employeeId: Joi.string().required(),
      resourceId: Joi.string(),
      resourceType: Joi.string().required(),
      accessType: Joi.string(),
    });
  }
}
