import QueueServerAuthorizationService from "@app/Command/Application/Service/QueueServerAuthorizationService";
import QueueServerId from "@app/Command/Domain/ValueObject/QueueServerId";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";

export default class PassingQueueServerAuthorizationService implements QueueServerAuthorizationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ensureEmployeeCanCreate(organizationEmployeeId: OrganizationEmployeeId): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ensureEmployeeCanDelete(organizationEmployeeId: OrganizationEmployeeId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queueServerId: QueueServerId): void {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ensureEmployeeCanUpdate(organizationEmployeeId: OrganizationEmployeeId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queueServerId: QueueServerId): void {
  }
}
