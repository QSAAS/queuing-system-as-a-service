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
    if (dto.type === "ORGANIZATION_EMPLOYEE")
      return new Permission(
        dto.resourceId === null ? null : EntityId.from(dto.resourceId!),
        ResourceType[dto.resourceType],
        AuthorizedAction[dto.type],
      );
  }
}
