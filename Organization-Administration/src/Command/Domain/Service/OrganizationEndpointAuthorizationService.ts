import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";

export default interface OrganizationEndpointAuthorizationService {
  ensureEmployeeCanCreate(employeeId: OrganizationEmployeeId): void

  ensureEmployeeCanDelete(employeeId: OrganizationEmployeeId, endpointId: OrganizationEndpointId): void

  ensureEmployeeCanUpdate(employeeId: OrganizationEmployeeId, endpointId: OrganizationEndpointId): void
}
