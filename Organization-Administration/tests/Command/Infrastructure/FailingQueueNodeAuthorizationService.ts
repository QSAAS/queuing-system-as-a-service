import QueueNodeAuthorizationService from "@app/Command/Domain/Service/QueueNodeAuthorizationService";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";

/* eslint-disable @typescript-eslint/no-unused-vars */
export default class FailingQueueNodeAuthorizationService implements QueueNodeAuthorizationService {
  ensureEmployeeCanCreate(employeeId: OrganizationEmployeeId): void {
    throw new EmployeeNotAuthorizedError();
  }

  ensureEmployeeCanDelete(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): void {
    throw new EmployeeNotAuthorizedError();
  }

  ensureEmployeeCanUpdate(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): void {
    throw new EmployeeNotAuthorizedError();
  }
}
