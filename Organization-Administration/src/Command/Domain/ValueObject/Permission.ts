import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";
import EntityId from "@app/Command/Domain/ValueObject/EntityId";
import ResourceType from "@app/Command/Domain/Enum/ResourceType";
import AuthorizedAction from "@app/Command/Domain/Enum/AuthorizedAction";

export default class Permission extends ValueObject {
  constructor(private resourceId: EntityId | null,
    private resourceType: ResourceType,
    private action: AuthorizedAction) {
    super();
    this.resourceId = resourceId;
    this.resourceType = resourceType;
    this.action = action;
  }

  static create(resourceId: EntityId|null, resourceType: ResourceType, action: AuthorizedAction) {
    return new Permission(resourceId, resourceType, action);
  }

  public getResourceId(): EntityId | null {
    return this.resourceId;
  }

  public getResourceType(): ResourceType {
    return this.resourceType;
  }

  public getAction(): AuthorizedAction {
    return this.action;
  }

  public static newCreate(resourceType: ResourceType): Permission {
    return new Permission(null,
      resourceType,
      AuthorizedAction.CREATE);
  }

  public static newUpdate(resourceType: ResourceType, entityId: EntityId): Permission {
    return new Permission(entityId,
      resourceType,
      AuthorizedAction.UPDATE);
  }

  public static newDelete(resourceType: ResourceType, entityId: EntityId): Permission {
    return new Permission(entityId,
      resourceType,
      AuthorizedAction.DELETE);
  }

  public static newManage(resourceType: ResourceType, entityId: EntityId): Permission {
    return new Permission(entityId,
      resourceType,
      AuthorizedAction.MANAGE);
  }

  public equals(other: Permission): boolean {
    // Check both are not null and equal
    // OR both are null
    const equalIds = (this.resourceId && other.resourceId && this.resourceId.equals(other.resourceId))
    || this.resourceId === other.resourceId;

    return equalIds
        && this.resourceType === other.resourceType
        && this.action === other.action;
  }
}
