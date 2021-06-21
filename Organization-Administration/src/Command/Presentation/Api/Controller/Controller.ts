import { Request } from "express";
import Joi from "joi";

export default abstract class Controller {
  protected async validateRequest(request: Request) {
    const schema = this.createSchema();
    try {
      await schema.validateAsync(request.body);
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        // TODO: throw validation error
        throw new Error("Validation error occured");
      }
    }
  }

  protected abstract createSchema(): Joi.Schema;
}
