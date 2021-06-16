import QueueNodeAuthorizationService from "@app/Command/Domain/Service/QueueNodeAuthorizationService";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import Permission from "@app/Command/Domain/ValueObject/Permission";
import ResourceType from "@app/Command/Domain/Enum/ResourceType";
import AuthorizationRuleNotFound from "@app/Command/Domain/Error/AuthorizationRuleNotFound";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import AuthorizationRuleRepository from "@app/Command/Domain/Service/AuthorizationRuleRepository";

export default class DirectQueueNodeAuthorizationService implements QueueNodeAuthorizationService {
  constructor(private authRuleRepo: AuthorizationRuleRepository) {}

  async ensureEmployeeCanCreate(employeeId: OrganizationEmployeeId): Promise<void> {
    const permission = Permission.newCreate(ResourceType.QUEUE_NODE);
    await this.tryGettingPermission(employeeId, permission);
  }

  async ensureEmployeeCanDelete(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): Promise<void> {
    const permission = Permission.newDelete(ResourceType.QUEUE_NODE, queueNodeId);
    await this.tryGettingPermission(employeeId, permission);
  }

  async ensureEmployeeCanUpdate(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): Promise<void> {
    const permission = Permission.newUpdate(ResourceType.QUEUE_NODE, queueNodeId);
    await this.tryGettingPermission(employeeId, permission);
  }

  private async tryGettingPermission(employeeId: OrganizationEmployeeId, permission: Permission): Promise<void> {
    try {
      await this.authRuleRepo.getByEmployeeAndPermission(employeeId, permission);
    } catch (e) {
      if (e instanceof AuthorizationRuleNotFound) {
        throw new EmployeeNotAuthorizedError();
      }
    }
  }
}
