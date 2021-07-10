import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";

export default interface OrganizationEndpointAuthorizationService {
  ensureEmployeeCanCreate(employeeId: OrganizationEmployeeId): Promise<void>;

  ensureEmployeeCanDelete(employeeId: OrganizationEmployeeId, endpointId: OrganizationEndpointId): Promise<void>;

  ensureEmployeeCanUpdate(employeeId: OrganizationEmployeeId, endpointId: OrganizationEndpointId): Promise<void>;
}
