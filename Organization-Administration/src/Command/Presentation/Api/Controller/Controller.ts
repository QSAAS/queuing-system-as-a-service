import { Request } from "express";
import Joi from "joi";

export default abstract class Controller {
  async validateRequest(request: Request) {
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

  abstract createSchema(): Joi.Schema;
}
