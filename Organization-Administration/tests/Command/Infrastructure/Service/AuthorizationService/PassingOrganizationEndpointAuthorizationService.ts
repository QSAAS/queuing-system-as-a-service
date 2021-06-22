import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import OrganizationEndpointAuthorizationService
  from "@app/Command/Domain/Service/OrganizationEndpointAuthorizationService";

export default class PassingOrganizationEndpointAuthorizationService
implements OrganizationEndpointAuthorizationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureEmployeeCanCreate(organizationEmployeeId: OrganizationEmployeeId) {
    return Promise.resolve();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureEmployeeCanEdit(organizationEmployeeId: OrganizationEmployeeId, endpointId: OrganizationEndpointId) {
    return Promise.resolve();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureEmployeeCanDelete(organizationEmployeeId: OrganizationEmployeeId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpointId: OrganizationEndpointId) {
    return Promise.resolve();

  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureEmployeeCanUpdate(organizationEmployeeId: OrganizationEmployeeId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpointId: OrganizationEndpointId) {
    return Promise.resolve();
  }
}
