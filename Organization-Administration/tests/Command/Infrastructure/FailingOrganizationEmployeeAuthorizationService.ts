import OrganizationEmployeeAuthorizationService
  from "@app/Command/Application/Service/OrganizationEmployeeAuthorizationService";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";

export default class FailingOrganizationEmployeeAuthorizationService
implements OrganizationEmployeeAuthorizationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ensureEmployeeCanCreate(admin: OrganizationEmployeeId): void {
    throw new EmployeeNotAuthorizedError();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ensureEmployeeCanDelete(admin: OrganizationEmployeeId, administrated: OrganizationEmployeeId): void {
    throw new EmployeeNotAuthorizedError();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ensureEmployeeCanUpdate(admin: OrganizationEmployeeId, administrated: OrganizationEmployeeId): void {
    throw new EmployeeNotAuthorizedError();
  }
}
