import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeAuthorizationService
  from "@app/Command/Domain/Service/OrganizationEmployeeAuthorizaitonService";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import DummyPasswordHash from "@tests/Command/Domain/ValueObject/DummyPasswordHash";
import OrganizationEmployeeCreated from "@app/Command/Domain/Event/OrganizationEmployeeCreated";

export default class EmployeeCreateNewOrganizaitonEmployeeService {
  constructor(
    private employeeAuthService: OrganizationEmployeeAuthorizationService,
  ) {
  }

  execute(
    admin: OrganizationEmployee,
    orgId: OrganizationId,
    name: string,
    password: string,
    username: EmployeeUsername,
  ): OrganizationEmployee {
    this.employeeAuthService.ensureEmployeeCanCreate(admin.getId());
    // TODO: Use password hash factory
    const passwordHash = new DummyPasswordHash(password);
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
