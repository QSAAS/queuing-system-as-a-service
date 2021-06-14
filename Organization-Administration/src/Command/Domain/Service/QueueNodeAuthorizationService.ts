import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";

export default interface QueueNodeAuthorizationService {
  /**
   * @throws EmployeeNotAuthorizedError
   * @param employeeId
   */
  ensureEmployeeCanCreate(employeeId: OrganizationEmployeeId): void;

  /**
   * @throws EmployeeNotAuthorizedError
   * @param employeeId
   * @param queueNodeId
   */
  ensureEmployeeCanDelete(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): void;

  /**
   * @throws EmployeeNotAuthorizedError
   * @param employeeId
   * @param queueNodeId
   */
  ensureEmployeeCanUpdate(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): void;
}
