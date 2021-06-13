import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import Permission from "@app/Command/Domain/ValueObject/Permission";
import PermissionBuilder from "@tests/Command/Domain/ValueObject/PermissionBuilder";
import AuthorizationRule from "@app/Command/Domain/Entity/AuthorizationRule";

export default class AuthorizationRuleBuilder {
  protected organizationEmployeeId: OrganizationEmployeeId;
  protected permission: Permission;

  constructor() {
    this.organizationEmployeeId = OrganizationEmployeeId.create();
    this.permission = new PermissionBuilder().build();
  }

  withEmployeeId(employeeId: OrganizationEmployeeId) {
    this.organizationEmployeeId = employeeId;
    return this;
  }

  withPermission(permission: Permission) {
    this.permission = permission;
    return this;
  }

  build(): AuthorizationRule {
    return new AuthorizationRule(this.organizationEmployeeId, this.permission);
  }
}
