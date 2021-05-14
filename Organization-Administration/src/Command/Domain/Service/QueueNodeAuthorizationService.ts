import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";

export default interface QueueNodeAuthorizationService {
  /**
   * @throws
   * @param employeeId
   */
  ensureEmployeeCanCreate(employeeId: OrganizationEmployeeId): void
  ensureEmployeeCanDelete(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): void
  ensureEmployeeCanUpdate(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): void
}
