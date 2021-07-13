import express from "express";
import Controller from "@app/Command/Presentation/Api/Controller/Controller";
import LoginService from "@app/Command/Application/Service/LoginService";
import Joi from "joi";
import LoginRequest from "@app/Command/Application/DataTransferObject/Request/LoginRequest";
import JwtTokenGenerator from "@app/Command/Presentation/Api/Service/JwtTokenGenerator";
import ValidationError from "@app/Command/Application/Error/ValidationError";
import RegisterRequest from "@app/Command/Application/DataTransferObject/Request/RegisterRequest";
import RegisterService from "@app/Command/Application/Service/RegisterService";

const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  organizationId: Joi.string().required(),
});

export default class OrganizationEmployeeController extends Controller {
  constructor(
    private loginService: LoginService,
    private registerService: RegisterService,
    private tokenGenerator: JwtTokenGenerator,
  ) {
    super();
  }

  async login(request: express.Request, response: express.Response) {
    await this.validateRequest(request);
    const { username, password } = request.body;
    const requestDto = new LoginRequest(username, password);
    const employeeId: string = await this.loginService.execute(requestDto);
    response.json({
      token: this.tokenGenerator.createToken(employeeId),
    });
  }

  async register(request: express.Request, response: express.Response) {
    try {
      await registerSchema.validateAsync(request.body);
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        throw new ValidationError(error.message);
      }
      throw error;
    }
    const { username, password, name, organizationId } = request.body;
    const requestDto = new RegisterRequest(username, password, organizationId, name);
    const employeeId: string = await this.registerService.execute(requestDto);
    response.json({
      token: this.tokenGenerator.createToken(employeeId),
    });
  }

  // TODO createSchema function assumes this controller only performs 1 service
  protected createSchema(): Joi.Schema {
    return Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
  }
}
