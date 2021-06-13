import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeAuthorizationService
  from "@app/Command/Domain/Service/OrganizationEmployeeAuthorizaitonService";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import OrganizationEmployeeCreated from "@app/Command/Domain/Event/OrganizationEmployeeCreated";
import PasswordHashFactory from "@app/Command/Domain/Service/PasswordHashFactory";

export default class EmployeeCreateNewOrganizaitonEmployeeService {
  constructor(
    private employeeAuthService: OrganizationEmployeeAuthorizationService,
    private passwordHashFactory: PasswordHashFactory,
  ) {
  }

  async execute(
    admin: OrganizationEmployee,
    orgId: OrganizationId,
    name: string,
    password: string,
    username: EmployeeUsername,
  ): Promise<OrganizationEmployee> {
    this.employeeAuthService.ensureEmployeeCanCreate(admin.getId());
    const passwordHash = await this.passwordHashFactory.create(password);
    const employee = new OrganizationEmployee(
      OrganizationEmployeeId.create(),
      orgId,
      name,
      passwordHash,
      username,
    );
    employee.raiseEvent(new OrganizationEmployeeCreated(employee));
    return employee;
  }
}
