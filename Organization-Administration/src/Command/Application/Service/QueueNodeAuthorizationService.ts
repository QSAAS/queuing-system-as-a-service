import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";

export default interface QueueNodeAuthorizationService {
  ensureEmployeeCanCreate(organizationEmployeeId: OrganizationId): void;
  ensureEmployeeCanDelete(organizationEmployeeId: OrganizationId, queueNodeId: QueueNodeId): void;
  ensureEmployeeCanUpdate(organizationEmployeeId: OrganizationId, queueNodeId: QueueNodeId): void;
}
