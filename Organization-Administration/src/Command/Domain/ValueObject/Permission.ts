import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";
import EntityId from "@app/Command/Domain/ValueObject/EntityId";

export enum ResourceType {
  ORGANIZATION_EMPLOYEE,
  ENDPOINT,
  QUEUE_NODE,
  QUEUE_SERVER,
  AUTHORIZATION_RULE,
}

export enum AuthorizedAction {
  CREATE,
  UPDATE,
  DELETE,
  MANAGE,
}

export default class Permission extends ValueObject {
  private resourceId: EntityId|null;
  private resourceType: ResourceType;
  private action: AuthorizedAction;

  constructor(resourceId: EntityId | null, resourceType: ResourceType, action: AuthorizedAction) {
    super();
    this.resourceId = resourceId;
    this.resourceType = resourceType;
    this.action = action;
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

  public newCreate(resourceType: ResourceType): Permission {
    return new Permission(null,
      resourceType,
      AuthorizedAction.CREATE);
  }

  public newUpdate(resourceType: ResourceType, entityId: EntityId): Permission {
    return new Permission(entityId,
      resourceType,
      AuthorizedAction.UPDATE);
  }

  public newDelete(resourceType: ResourceType, entityId: EntityId): Permission {
    return new Permission(entityId,
      resourceType,
      AuthorizedAction.DELETE);
  }

  public newManage(resourceType: ResourceType, entityId: EntityId): Permission {
    return new Permission(entityId,
      resourceType,
      AuthorizedAction.MANAGE);
  }

  public equals(other: Permission): boolean {
    if (this.resourceId && other.resourceId) return this.resourceId.equals(other.resourceId);
    return this.resourceId === other.resourceId;
  }
}