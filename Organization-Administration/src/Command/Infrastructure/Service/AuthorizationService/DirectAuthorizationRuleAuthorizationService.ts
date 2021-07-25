import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import Permission from "@app/Command/Domain/ValueObject/Permission";
import ResourceType from "@app/Command/Domain/Enum/ResourceType";
import AuthorizationRuleNotFound from "@app/Command/Domain/Error/AuthorizationRuleNotFound";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import AuthorizationRuleRepository from "@app/Command/Domain/Service/AuthorizationRuleRepository";
import AuthorizationRuleAuthorizationService from "@app/Command/Domain/Service/AuthorizationRuleAuthorizationService";
import AuthorizedAction from "@app/Command/Domain/Enum/AuthorizedAction";

export default class DirectAuthorizationRuleAuthorizationService implements AuthorizationRuleAuthorizationService {
  constructor(private authRuleRepo: AuthorizationRuleRepository) {}

  async ensureEmployeeCanEdit(employeeId: OrganizationEmployeeId): Promise<void> {
    const permission = new Permission(null, ResourceType.AUTHORIZATION_RULE, AuthorizedAction.UPDATE);
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
