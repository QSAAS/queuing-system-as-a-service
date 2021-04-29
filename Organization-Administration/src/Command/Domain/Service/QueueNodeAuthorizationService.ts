// TODO move logic to some middleware?
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";

export default interface QueueNodeAuthorizationService {
  ensureEmployeeCanCreate(employeeId: OrganizationEmployeeId): void
  ensureEmployeeCanDelete(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): void
  ensureEmployeeCanUpdate(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): void

  // TODO in the diagram, this throws an Error however this is an interface
}
