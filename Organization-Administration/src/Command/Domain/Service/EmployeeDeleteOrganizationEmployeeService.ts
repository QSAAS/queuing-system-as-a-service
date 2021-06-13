import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeAuthorizationService from "@app/Command/Domain/Service/OrganizationEmployeeAuthorizaitonService";
import OrganizationEmployeeDeleted from "@app/Command/Domain/Event/OrganizationEmployeeDeleted";
import OrganizationEmployeeRepository from "@app/Command/Domain/Service/OrganizationEmployeeRepository";

export default class EmployeeDeleteOrganizationEmployeeService {
  constructor(
    private employeeRepository: OrganizationEmployeeRepository,
    private employeeAuthService: OrganizationEmployeeAuthorizationService,
  ) {}

  async execute(admin: OrganizationEmployee, employee: OrganizationEmployee): Promise<void> {
    this.employeeAuthService.ensureEmployeeCanDelete(admin.getId(), employee.getId());
    employee.raiseEvent(new OrganizationEmployeeDeleted(employee));
    await this.employeeRepository.delete(employee);
  }
}
