import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import AuthorizationRule from "@app/Command/Domain/Entity/AuthorizationRule";
import Permission from "../ValueObject/Permission";

export default interface AuthorizationRuleRepository {
  getByEmployeeAndPermission(employeeId: OrganizationEmployeeId, permission: Permission): Promise<AuthorizationRule>;
  save(rule: AuthorizationRule): Promise<void>;
  delete(rule: AuthorizationRule): Promise<void>;
}
