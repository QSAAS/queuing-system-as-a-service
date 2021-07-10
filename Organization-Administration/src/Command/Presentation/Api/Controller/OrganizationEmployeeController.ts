import express from "express";
import Controller from "@app/Command/Presentation/Api/Controller/Controller";
import LoginService from "@app/Command/Application/Service/LoginService";
import Joi from "joi";
import LoginRequest from "@app/Command/Application/DataTransferObject/Request/LoginRequest";
import JwtTokenGenerator from "@app/Command/Presentation/Api/Service/JwtTokenGenerator";

export default class OrganizationEmployeeController extends Controller {
  constructor(private appService: LoginService,
              private tokenGenerator: JwtTokenGenerator) {
    super();
  }

  async login(request: express.Request, response: express.Response) {
    await this.validateRequest(request);
    const {username, password} = request.body;
    const requestDto = new LoginRequest(username, password);
    const employeeId: string = await this.appService.execute(requestDto);
    response.json({
      token: this.tokenGenerator.createToken(employeeId),
    });
  }

  protected createSchema(): Joi.Schema {
    return Joi.object(
      {
        username: Joi.string().required(),
        password: Joi.string().required(), // TODO validate password
      }
    )
  }
}
