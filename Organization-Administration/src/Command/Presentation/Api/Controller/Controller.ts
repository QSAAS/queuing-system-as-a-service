import { Request } from "express";
import Joi from "joi";
import ValidationError from "@app/Command/Application/Error/ValidationError";

export default abstract class Controller {
  protected async validateRequest(request: Request) {
    const schema = this.createSchema();
    try {
      await schema.validateAsync(request.body);
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        throw new ValidationError(error.message);
      }
      throw error;
    }
  }

  protected abstract createSchema(): Joi.Schema;
}
