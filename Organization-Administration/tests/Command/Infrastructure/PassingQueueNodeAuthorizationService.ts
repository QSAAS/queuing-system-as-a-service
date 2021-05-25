import QueueNodeAuthorizationService from "@app/Command/Domain/Service/QueueNodeAuthorizationService";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";

/* eslint-disable @typescript-eslint/no-unused-vars */
export default class PassingQueueNodeAuthorizationService implements QueueNodeAuthorizationService {
  ensureEmployeeCanCreate(employeeId: OrganizationEmployeeId): void {}

  ensureEmployeeCanDelete(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): void {}

  ensureEmployeeCanUpdate(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): void {}
}
