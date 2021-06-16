import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";

export default interface OrganizationEmployeeRepository {
  save(employee: OrganizationEmployee): Promise<void>;

  delete(employee: OrganizationEmployee): Promise<void>;

  getById(organizationEmployeeId: OrganizationEmployeeId): Promise<OrganizationEmployee>;
}
