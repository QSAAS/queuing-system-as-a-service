import AuthorizationRule from "@app/Command/Domain/Entity/AuthorizationRule";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import Permission from "@app/Command/Domain/ValueObject/Permission";

export default interface AuthorizationRuleRepository {
  save(rule: AuthorizationRule): Promise<void>
  delete(rule: AuthorizationRule): Promise<void>
  getByEmployeeAndPermission(employeeId: OrganizationEmployeeId, permission: Permission): Promise<AuthorizationRule>
}
