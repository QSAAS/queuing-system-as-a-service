import OrganizationEmployeeRepository from "@app/Command/Domain/Service/OrganizationEmployeeRepository";
import LoginRequest from "@app/Command/Application/DataTransferObject/Request/LoginRequest";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import IncorrectCredentialsError from "@app/Command/Application/Error/IncorrectCredentialsError";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeNotFound from "@app/Command/Domain/Error/OrganizationEmployeeNotFound";

export default class LoginService {
  constructor(
    private employeeRepo: OrganizationEmployeeRepository,
  ){}

  async execute(request: LoginRequest): Promise<string> {
    const errorMessage = "Incorrect username or password.";

    let employee: OrganizationEmployee;
    try {
      employee = await this.employeeRepo.getByUsername(EmployeeUsername.from(request.username));
    } catch (e) {
      if (e instanceof OrganizationEmployeeNotFound) {
        throw new IncorrectCredentialsError(errorMessage);
      }
      throw e;
    }

    const isCorrectPassword: boolean = await employee.getPasswordHash().matches(request.password);
    if (!isCorrectPassword) {
      throw new IncorrectCredentialsError(errorMessage);
    }

    return employee.getId().toString();
  }
}
