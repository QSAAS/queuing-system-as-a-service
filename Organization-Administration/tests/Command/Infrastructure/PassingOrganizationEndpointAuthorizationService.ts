import OrganizationEndpointAuthorizationService
  from "@app/Command/Application/Service/OrganizationEndpointAuthorizationService";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";

export default class PassingOrganizationEndpointAuthorizationService
implements OrganizationEndpointAuthorizationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureEmployeeCanCreate(organizationEmployeeId: OrganizationEmployeeId) {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureEmployeeCanEdit(organizationEmployeeId: OrganizationEmployeeId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpointId: OrganizationEndpointId): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureEmployeeCanDelete(organizationEmployeeId: OrganizationEmployeeId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpointId: OrganizationEndpointId): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureEmployeeCanUpdate(organizationEmployeeId: OrganizationEmployeeId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpointId: OrganizationEndpointId): void {
  }
}
