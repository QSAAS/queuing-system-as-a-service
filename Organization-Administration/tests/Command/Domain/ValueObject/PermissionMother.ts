import PermissionBuilder from "@tests/Command/Domain/ValueObject/PermissionBuilder";

export default class PermissionMother {
  public static withNullResourceId(): PermissionBuilder {
    return new PermissionBuilder().withResourceId(null);
  }
}
