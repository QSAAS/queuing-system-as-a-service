import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";

export default interface OrganizationEndpointAuthorizationService {
  ensureEmployeeCanCreate(organizationEmployeeId: OrganizationEmployeeId): void;
  ensureEmployeeCanEdit(organizationEmployeeId: OrganizationEmployeeId,
    endpointId: OrganizationEndpointId): void;
  ensureEmployeeCanDelete(organizationEmployeeId: OrganizationEmployeeId,
    endpointId: OrganizationEndpointId): void;
  ensureEmployeeCanUpdate(organizationEmployeeId: OrganizationEmployeeId,
    endpointId: OrganizationEndpointId): void;
}
