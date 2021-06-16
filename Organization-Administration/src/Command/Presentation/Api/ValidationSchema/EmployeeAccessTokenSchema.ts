import Joi from "joi";

const EmployeeAccessTokenSchema = Joi.object({
  type: Joi.string().equal("ACCESS_TOKEN"),
  employee_id: Joi.string().uuid(),
}).required();

export default EmployeeAccessTokenSchema;
