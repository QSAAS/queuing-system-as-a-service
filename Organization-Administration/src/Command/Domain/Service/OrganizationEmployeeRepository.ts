import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";

export default interface OrganizationEmployeeRepository {
  save(employee: OrganizationEmployee): Promise<void>;

  delete(employee: OrganizationEmployee): Promise<void>;

  getById(organizationEmployeeId: OrganizationEmployeeId): Promise<OrganizationEmployee>;

  getByUsername(username: EmployeeUsername): Promise<OrganizationEmployee>;
}
