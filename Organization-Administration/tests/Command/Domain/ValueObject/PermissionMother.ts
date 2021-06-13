import PermissionBuilder from "@tests/Command/Domain/ValueObject/PermissionBuilder";
import EntityId from "@app/Command/Domain/ValueObject/EntityId";

export default class PermissionMother {
  public static withNullResourceId(): PermissionBuilder {
    return new PermissionBuilder().withResourceId(null);
  }

  public static withResourceId(): PermissionBuilder {
    return new PermissionBuilder().withResourceId(EntityId.create());
  }
}
