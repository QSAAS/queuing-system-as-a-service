import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";

export default interface QueueNodeAuthorizationService {
  /**
 *  @throws EmployeeNotAuthorizedError
 *
 * */
  ensureEmployeeCanCreate(organizationEmployeeId: OrganizationId): void;
  /**
   *  @throws EmployeeNotAuthorizedError
   *
   * */
  ensureEmployeeCanDelete(organizationEmployeeId: OrganizationId, queueNodeId: QueueNodeId): void;
  /**
   *  @throws EmployeeNotAuthorizedError
   *
   * */
  ensureEmployeeCanUpdate(organizationEmployeeId: OrganizationId, queueNodeId: QueueNodeId): void;
}
