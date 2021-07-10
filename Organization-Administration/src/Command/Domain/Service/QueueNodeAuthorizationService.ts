import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";

/**
 * @throws EmployeeNotAuthorizedError
 */
export default interface QueueNodeAuthorizationService {

  ensureEmployeeCanCreate(employeeId: OrganizationEmployeeId): Promise<void>;

  ensureEmployeeCanDelete(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): Promise<void>;

  ensureEmployeeCanUpdate(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): Promise<void>;
}
