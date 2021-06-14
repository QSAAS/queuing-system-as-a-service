import DomainEvent from "@app/Command/Domain/Event/DomainEvent";
import AuthorizationRule from "@app/Command/Domain/Entity/AuthorizationRule";

export default class AuthorizationRuleDeleted extends DomainEvent {
  constructor(private authorizationRule: AuthorizationRule) {
    super();
  }

  public getAuthorizationRule(): AuthorizationRule {
    return this.authorizationRule;
  }
}
