import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import Permission from "@app/Command/Domain/ValueObject/Permission";

export default class AuthorizationRule extends AggregateRoot {
  constructor(protected organizationEmployeeId: OrganizationEmployeeId,
    protected permission: Permission) {
    super();
  }

  public getOrganizationEmployeeId(): OrganizationEmployeeId {
    return this.organizationEmployeeId;
  }

  public getPermission(): Permission {
    return this.permission;
  }
}
