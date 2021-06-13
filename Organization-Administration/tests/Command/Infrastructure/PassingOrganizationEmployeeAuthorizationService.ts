import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationEmployeeAuthorizationService
  from "@app/Command/Domain/Service/OrganizationEmployeeAuthorizaitonService";

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
