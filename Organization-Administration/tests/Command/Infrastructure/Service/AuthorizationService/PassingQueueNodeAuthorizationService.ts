import QueueNodeAuthorizationService from "@app/Command/Domain/Service/QueueNodeAuthorizationService";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";

/* eslint-disable @typescript-eslint/no-unused-vars */
export default class PassingQueueNodeAuthorizationService implements QueueNodeAuthorizationService {
  async ensureEmployeeCanCreate(employeeId: OrganizationEmployeeId) {
    return Promise.resolve();
  }

  async ensureEmployeeCanDelete(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId) {
    return Promise.resolve();
  }

  async ensureEmployeeCanUpdate(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId) {
    return Promise.resolve();
  }
}
