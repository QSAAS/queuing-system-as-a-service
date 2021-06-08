import EntityId from "@app/Command/Domain/ValueObject/EntityId";
import Permission, { AuthorizedAction, ResourceType } from "@app/Command/Domain/ValueObject/Permission";

export default class PermissionBuilder {
  constructor(public resourceId: EntityId | null = null,
    public resourceType: ResourceType = ResourceType.ENDPOINT,
    public action: AuthorizedAction = AuthorizedAction.CREATE) { }

  public withResourceId(id: EntityId|null): PermissionBuilder {
    this.resourceId = id;
    return this;
  }

  public withResourceType(type: ResourceType): PermissionBuilder {
    this.resourceType = type;
    return this;
  }

  public withAction(action: AuthorizedAction): PermissionBuilder {
    this.action = action;
    return this;
  }

  public build(): Permission {
    return Permission.create(this.resourceId, this.resourceType, this.action);
  }
}
