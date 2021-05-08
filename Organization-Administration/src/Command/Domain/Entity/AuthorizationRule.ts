import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import Permission from "@app/Command/Domain/ValueObject/Permission";

export default class AuthorizationRule extends AggregateRoot {
  private organizationEmployeeId: OrganizationEmployeeId;
  private permission: Permission;

  constructor(organizationEmployeeId: OrganizationEmployeeId, permission: Permission) {
    super();
    this.organizationEmployeeId = organizationEmployeeId;
    this.permission = permission;
  }

  public getOrganizationEmployeeId(): OrganizationEmployeeId {
    return this.organizationEmployeeId;
  }

  public getPermission(): Permission {
    return this.permission;
  }
}
