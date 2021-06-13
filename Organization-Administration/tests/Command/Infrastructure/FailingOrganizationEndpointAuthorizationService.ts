import OrganizationEndpointAuthorizationService
  from "@app/Command/Application/Service/OrganizationEndpointAuthorizationService";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";

export default class FailingOrganizationEndpointAuthorizationService
implements OrganizationEndpointAuthorizationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureEmployeeCanCreate(organizationEmployeeId: OrganizationEmployeeId) {
    throw new EmployeeNotAuthorizedError();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureEmployeeCanEdit(organizationEmployeeId: OrganizationEmployeeId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpointId: OrganizationEndpointId): void {
    throw new EmployeeNotAuthorizedError();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureEmployeeCanDelete(organizationEmployeeId: OrganizationEmployeeId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpointId: OrganizationEndpointId): void {
    throw new EmployeeNotAuthorizedError();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureEmployeeCanUpdate(organizationEmployeeId: OrganizationEmployeeId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpointId: OrganizationEndpointId): void {
    throw new EmployeeNotAuthorizedError();
  }
}
