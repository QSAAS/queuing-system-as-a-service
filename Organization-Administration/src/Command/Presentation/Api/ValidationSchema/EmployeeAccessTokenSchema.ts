import Joi from "joi";

const EmployeeAccessTokenSchema = Joi.object({
  type: Joi.string().equal("ACCESS_TOKEN"),
  employeeId: Joi.string().uuid(),
  iat: Joi.number(),
  exp: Joi.number()
}).required();

export default EmployeeAccessTokenSchema;
