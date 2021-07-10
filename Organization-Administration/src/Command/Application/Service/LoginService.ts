import OrganizationEmployeeRepository from "@app/Command/Domain/Service/OrganizationEmployeeRepository";
import LoginRequest from "@app/Command/Application/DataTransferObject/Request/LoginRequest";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import IncorrectCredentialsError from "@app/Command/Application/Error/IncorrectCredentialsError";

export default class LoginService {
  constructor(
    private employeeRepo: OrganizationEmployeeRepository,
  ){}

  async execute(request: LoginRequest): Promise<string> {
    const employee = await this.employeeRepo.getByUsername(EmployeeUsername.from(request.username));
    const isCorrectPassword: boolean = await employee.getPasswordHash().matches(request.password);
    if (!isCorrectPassword) {
      throw new IncorrectCredentialsError("Incorrect username or password.");
    }
    return employee.getId().toString();
  }
}
