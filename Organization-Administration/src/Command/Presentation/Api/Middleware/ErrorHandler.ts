import { ErrorRequestHandler } from "express";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";

const ErrorHandler: ErrorRequestHandler = (err, request, response, next) => {
  if(err instanceof EmployeeNotAuthorizedError){
    response.status(422).json({
      error: true,
      message: "User is not authorized to carry this action"
    })
  }else{
    // TODO: Handle all error types
    response.status(500).json({
      error: true,
      message: err.message
    });
  }
  next(err);
};

export default ErrorHandler;
