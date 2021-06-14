import GenericTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/Interface/GenericTransformer";
import IAuthorizationRule from "@app/Command/Infrastructure/Repository/Mongoose/Types/IAuthorizationRule";
import AuthorizationRule from "@app/Command/Domain/Entity/AuthorizationRule";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import ResourceType from "@app/Command/Domain/Enum/ResourceType";
import AuthorizedAction from "@app/Command/Domain/Enum/AuthorizedAction";
import Permission from "@app/Command/Domain/ValueObject/Permission";
import EntityId from "@app/Command/Domain/ValueObject/EntityId";

export default class AuthorizationRuleTransformer implements GenericTransformer<IAuthorizationRule, AuthorizationRule> {
  mongooseObjectFrom(instance: AuthorizationRule): IAuthorizationRule {
    const permission = instance.getPermission();
    return {
      organizationEmployeeId: instance.getOrganizationEmployeeId().toString(),
      resourceId: permission.getResourceId() ? permission.getResourceId()!.toString() : null,
      resourceType: ResourceType[permission.getResourceType()],
      action: AuthorizedAction[permission.getAction()],
    };
  }

  domainInstanceFrom(object: IAuthorizationRule): AuthorizationRule {
    const permission = new Permission(
      object.resourceId ? EntityId.from(object.resourceId) : null,
      ResourceType[object.resourceType as keyof typeof ResourceType],
      AuthorizedAction[object.action as keyof typeof AuthorizedAction],
    );
    return new AuthorizationRule(OrganizationEmployeeId.from(object.organizationEmployeeId), permission);
  }
}
