import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";

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
    request.body.access_token = jwt.verify(authorizationHeader, jwtSecret) as AccessToken;
    next();
  };
}

interface AccessToken {
  type: "ACCESS_TOKEN";
  employee_id: string;
}
