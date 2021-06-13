import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import QueueServerId from "@app/Command/Domain/ValueObject/QueueServerId";

export default interface QueueServerAuthorizationService {
  /**
   * @throws EmployeeNotAuthorizedError
   * @param admin
   * @param queueServerId
   */
  ensureEmployeeCanDelete(admin: OrganizationEmployeeId, queueServerId: QueueServerId): void;
  /**
   * @throws EmployeeNotAuthorizedError
   * @param admin
   * @param queueServerId
   */
  ensureEmployeeCanUpdate(admin: OrganizationEmployeeId, queueServerId: QueueServerId): void;
  /**
   * @throws EmployeeNotAuthorizedError
   * @param admin
   */
  ensureEmployeeCanCreate(admin: OrganizationEmployeeId): void;
}
