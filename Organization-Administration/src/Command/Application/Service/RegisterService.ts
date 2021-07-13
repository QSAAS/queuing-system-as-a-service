import OrganizationEmployeeRepository from "@app/Command/Domain/Service/OrganizationEmployeeRepository";
import RegisterRequest from "@app/Command/Application/DataTransferObject/Request/RegisterRequest";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import PasswordHashFactory from "@app/Command/Domain/Service/PasswordHashFactory";

export default class RegisterService {
  constructor(private repo: OrganizationEmployeeRepository, private passwordFactory: PasswordHashFactory) {}

  /**
   * @throws DuplicateAttributeError if username already exists
   * @param request
   */
  async execute(request: RegisterRequest): Promise<string> {
    const passwordHash = await this.passwordFactory.create(request.password);
    const employee = new OrganizationEmployee(
      OrganizationEmployeeId.create(),
      OrganizationId.from(request.organizationId),
      request.name,
      passwordHash,
      EmployeeUsername.from(request.username),
    );
    await this.repo.save(employee);
    return employee.getId().toString();
  }
}
