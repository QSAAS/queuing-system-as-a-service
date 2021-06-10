import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import AuthorizationRule from "@app/Command/Domain/Entity/AuthorizationRule";
import Permission from "../ValueObject/Permission";

export default interface AuthorizationRuleRepository{
  getByEmployeeAndPermission(employeeId: OrganizationEmployeeId, persmission: Permission): AuthorizationRule
  save(rule: AuthorizationRule): void
  delete(rule: AuthorizationRule): void
}
