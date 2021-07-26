import { ErrorRequestHandler } from "express";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import ValidationError from "@app/Command/Application/Error/ValidationError";
import IncorrectCredentialsError from "@app/Command/Application/Error/IncorrectCredentialsError";
import InvalidEmployeeUsernameError from "@app/Command/Domain/Error/InvalidEmployeeUsernameError";

const ErrorHandler: ErrorRequestHandler = (err, request, response, next) => {
  if (err instanceof EmployeeNotAuthorizedError) {
    response.status(403).json({
      message: "User is not authorized to carry this action",
    });
  } else if (err instanceof ValidationError || err instanceof InvalidEmployeeUsernameError) {
    response.status(400).json({
      message: err.message,
    });
  } else if (err instanceof IncorrectCredentialsError) {
    response.status(401).json({
      message: err.message,
    });
  } else {
    response.status(500).json({
      message: err.message,
    });
  }
  next(err);
};

export default ErrorHandler;
