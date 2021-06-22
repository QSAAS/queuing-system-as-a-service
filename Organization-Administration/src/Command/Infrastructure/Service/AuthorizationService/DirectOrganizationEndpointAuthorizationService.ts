import AuthorizationRuleRepository from "@app/Command/Domain/Service/AuthorizationRuleRepository";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import ResourceType from "@app/Command/Domain/Enum/ResourceType";
import Permission from "@app/Command/Domain/ValueObject/Permission";
import AuthorizationRuleNotFound from "@app/Command/Domain/Error/AuthorizationRuleNotFound";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import OrganizationEndpointAuthorizationService
  from "@app/Command/Domain/Service/OrganizationEndpointAuthorizationService";

export default class DirectOrganizationEndpointAuthorizationService implements OrganizationEndpointAuthorizationService{
  constructor(private authRuleRepo: AuthorizationRuleRepository) {}

  async ensureEmployeeCanCreate(employeeId: OrganizationEmployeeId): Promise<void> {
    const permission = Permission.newCreate(ResourceType.ENDPOINT);
    await this.ensureHasPermission(employeeId, permission);
  }

  async ensureEmployeeCanDelete(employeeId: OrganizationEmployeeId, endpointId: OrganizationEndpointId): Promise<void> {
    const permission = Permission.newDelete(ResourceType.ENDPOINT, endpointId);
    await this.ensureHasPermission(employeeId, permission);
  }

  async ensureEmployeeCanUpdate(employeeId: OrganizationEndpointId, endpointId: OrganizationEndpointId): Promise<void> {
    const permission = Permission.newUpdate(ResourceType.ENDPOINT, endpointId);
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
