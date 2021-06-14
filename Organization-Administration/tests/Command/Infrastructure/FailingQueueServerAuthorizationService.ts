import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import QueueServerId from "@app/Command/Domain/ValueObject/QueueServerId";
import QueueServerAuthorizationService from "@app/Command/Domain/Service/QueueServerAuthorizationService";

export default class FailingQueueServerAuthorizationService implements QueueServerAuthorizationService {
  /**
   * @throws EmployeeNotAuthorizedError
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ensureEmployeeCanCreate(organizationEmployeeId: OrganizationEmployeeId): void {
    throw new EmployeeNotAuthorizedError();
  }

  /**
   * @throws EmployeeNotAuthorizedError
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ensureEmployeeCanDelete(organizationEmployeeId: OrganizationEmployeeId, queueServerId: QueueServerId): void {
    throw new EmployeeNotAuthorizedError();
  }

  /**
   * @throws EmployeeNotAuthorizedError
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ensureEmployeeCanUpdate(organizationEmployeeId: OrganizationEmployeeId, queueServerId: QueueServerId): void {
    throw new EmployeeNotAuthorizedError();
  }
}
