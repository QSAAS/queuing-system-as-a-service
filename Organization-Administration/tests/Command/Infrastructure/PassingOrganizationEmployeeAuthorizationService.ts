import OrganizationEmployeeAuthorizationService
  from "@app/Command/Application/Service/OrganizationEmployeeAuthorizationService";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";

export default class PassingOrganizationEmployeeAuthorizationService
implements OrganizationEmployeeAuthorizationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ensureEmployeeCanCreate(organizationEmployeeId: OrganizationEmployeeId): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ensureEmployeeCanDelete(organizationEmployeeId: OrganizationEmployeeId): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ensureEmployeeCanUpdate(organizationEmployeeId: OrganizationEmployeeId): void {
  }
}
