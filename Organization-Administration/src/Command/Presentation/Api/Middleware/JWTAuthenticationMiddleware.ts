import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import AccessToken from "@app/Command/Presentation/Api/Type/AccessToken";

export default function JwtAuthenticationMiddleware(jwtSecret: string) {
  return (request: Request, response: Response, next: NextFunction) => {
    const authorizationHeader = request.header("Authorization") || "";
    try {
      Joi.string().base64().required().validate(authorizationHeader);
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        // TODO: throw authentication error
        throw new Error("Authentication error");
      }
    }
    try{
      request.body.access_token = jwt.verify(authorizationHeader, jwtSecret) as AccessToken;
      next();
    } catch (e) {
      throw new Error("Invalid token"); // TODO create custom error
    }
  };
}
