import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import Permission from "@app/Command/Domain/ValueObject/Permission";
import ResourceType from "@app/Command/Domain/Enum/ResourceType";
import AuthorizationRuleNotFound from "@app/Command/Domain/Error/AuthorizationRuleNotFound";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import AuthorizationRuleRepository from "@app/Command/Domain/Service/AuthorizationRuleRepository";
import QueueServerAuthorizationService from "@app/Command/Domain/Service/QueueServerAuthorizationService";
import QueueServerId from "@app/Command/Domain/ValueObject/QueueServerId";

export default class DirectQueueServereAuthorizationService implements QueueServerAuthorizationService {
  constructor(private authRuleRepo: AuthorizationRuleRepository) {}

  async ensureEmployeeCanCreate(employeeId: OrganizationEmployeeId): Promise<void> {
    const permission = Permission.newCreate(ResourceType.QUEUE_SERVER);
    await this.ensureHasPermission(employeeId, permission);
  }

  async ensureEmployeeCanDelete(employeeId: OrganizationEmployeeId, queueServerId: QueueServerId): Promise<void> {
    const permission = Permission.newDelete(ResourceType.QUEUE_SERVER, queueServerId);
    await this.ensureHasPermission(employeeId, permission);
  }

  async ensureEmployeeCanUpdate(employeeId: OrganizationEmployeeId, queueServerId: QueueServerId): Promise<void> {
    const permission = Permission.newUpdate(ResourceType.QUEUE_SERVER, queueServerId);
    await this.ensureHasPermission(employeeId, permission);
  }

  private async ensureHasPermission(employeeId: OrganizationEmployeeId, permission: Permission): Promise<void> {
    try {
      await this.authRuleRepo.getByEmployeeAndPermission(employeeId, permission);
    } catch (e) {
      if (e instanceof AuthorizationRuleNotFound) {
        throw new EmployeeNotAuthorizedError();
      }
      throw e;
    }
  }
}
