import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";

export default interface OrganizationEmployeeRepository {
  save(employee: OrganizationEmployee): Promise<void>;

  delete(employee: OrganizationEmployee): Promise<void>;
}
