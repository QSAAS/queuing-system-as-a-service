import OrganizationEmployeeRepository from "@app/Command/Domain/Service/OrganizationEmployeeRepository";
import RegisterRequest from "@app/Command/Application/DataTransferObject/Request/RegisterRequest";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import ValidationError from "@app/Command/Application/Error/ValidationError";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import BCryptPassowrdHash from "@app/Command/Infrastructure/ValueObject/BCryptPassowrdHash";
import bcrypt from "bcrypt";

export default class RegisterService {
  constructor(
    private repo: OrganizationEmployeeRepository,
  ) {}

  /**
   * @throws DuplicateAttributeError if username already exists
   * TODO catch DuplicateAttributeError and throw custom application layer error
   * @param request
   */
  async execute(request: RegisterRequest): Promise<string> {
    const passwordHash = new BCryptPassowrdHash(
      await bcrypt.hash(request.password,
        Math.floor(Math.random() * 10) + 1) // TODO read from env or inject
    );
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
