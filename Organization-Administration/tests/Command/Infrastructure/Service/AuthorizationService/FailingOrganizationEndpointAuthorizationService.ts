import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationEndpointAuthorizationService
  from "@app/Command/Domain/Service/OrganizationEndpointAuthorizationService";

export default class FailingOrganizationEndpointAuthorizationService
implements OrganizationEndpointAuthorizationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureEmployeeCanCreate(organizationEmployeeId: OrganizationEmployeeId): Promise<void> {
    throw new EmployeeNotAuthorizedError();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureEmployeeCanEdit(organizationEmployeeId: OrganizationEmployeeId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpointId: OrganizationEndpointId):  Promise<void> {
    throw new EmployeeNotAuthorizedError();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureEmployeeCanDelete(organizationEmployeeId: OrganizationEmployeeId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpointId: OrganizationEndpointId):  Promise<void> {
    throw new EmployeeNotAuthorizedError();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureEmployeeCanUpdate(organizationEmployeeId: OrganizationEmployeeId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpointId: OrganizationEndpointId):  Promise<void> {
    throw new EmployeeNotAuthorizedError();
  }
}
