import Transformer from "@app/Command/Application/Transformer/Transformer";
import PermissionDTO from "@app/Command/Application/DataTransferObject/Object/PermissionDTO";
import Permission from "@app/Command/Domain/ValueObject/Permission";
import EntityId from "@app/Command/Domain/ValueObject/EntityId";
import ResourceType from "@app/Command/Domain/Enum/ResourceType";
import AuthorizedAction from "@app/Command/Domain/Enum/AuthorizedAction";

export default class PermissionDtoTransformer implements Transformer<Permission, PermissionDTO> {
  toDTO(object: Permission): PermissionDTO {
    return new PermissionDTO(
      object.getResourceId() !== null ? object.getResourceId()!.toString() : null,
      object.getResourceType(),
      object.getResourceType(),
    );
  }

  toObject(dto: PermissionDTO): Permission {
    let type: ResourceType = ResourceType.ENDPOINT;
    let action: AuthorizedAction = AuthorizedAction.CREATE;
    if (dto.resourceType === "ORGANIZATION_EMPLOYEE") {
      type = ResourceType.ORGANIZATION_EMPLOYEE;
    } else if (dto.resourceType === "ENDPOINT") {
      type = ResourceType.ENDPOINT;
    } else if (dto.resourceType === "QUEUE_NODE") {
      type = ResourceType.QUEUE_NODE;
    } else if (dto.resourceType === "QUEUE_SERVER") {
      type = ResourceType.QUEUE_SERVER;
    } else if (dto.resourceType === "AUTHORIZATION_RULE") {
      type = ResourceType.AUTHORIZATION_RULE;
    }

    if (dto.type === "CREATE") {
      action = AuthorizedAction.CREATE;
    } else if (dto.type === "UPDATE") {
      action = AuthorizedAction.UPDATE;
    } else if (dto.type === "DELETE") {
      action = AuthorizedAction.DELETE;
    } else if (dto.type === "MANAGE") {
      action = AuthorizedAction.MANAGE;
    }

    return new Permission(dto.resourceId === null ? null : EntityId.from(dto.resourceId!), type, action);
  }
}
