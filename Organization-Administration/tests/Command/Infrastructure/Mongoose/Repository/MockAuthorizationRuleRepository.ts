import AuthorizationRuleRepository from "@app/Command/Domain/Service/AuthorizationRuleRepository";
import AuthorizationRule from "@app/Command/Domain/Entity/AuthorizationRule";
import Permission from "@app/Command/Domain/ValueObject/Permission";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import AuthorizationRuleNotFound from "@app/Command/Domain/Error/AuthorizationRuleNotFound";
import AuthorizationRuleAlreadyExists from "@app/Command/Domain/Error/AuthorizationRuleAlreadyExists";
import DomainEvent from "@app/Command/Domain/Event/DomainEvent";

export default class MockAuthorizationRuleRepository implements AuthorizationRuleRepository {
  constructor(
    private rules: AuthorizationRule[],
    private publishedEvents: DomainEvent[],
  ) {
  }

  delete(rule: AuthorizationRule): void {
    this.rules = this.rules.filter((current) => !current.equals(rule));
    this.publishedEvents.push(...rule.getRaisedEvents());
  }

  private getMatchingRules(employeeId: OrganizationEmployeeId, permission: Permission): AuthorizationRule[] {
    return this.rules.filter(
      (current) => (
        current.getOrganizationEmployeeId().equals(employeeId) && current.getPermission().equals(permission)
      ),
    );
  }

  getByEmployeeAndPermission(employeeId: OrganizationEmployeeId, permission: Permission): AuthorizationRule {
    const matching = this.getMatchingRules(employeeId, permission);
    if (matching.length === 0) {
      throw new AuthorizationRuleNotFound();
    }
    return matching[0];
  }

  save(rule: AuthorizationRule): void {
    const matching = this.getMatchingRules(rule.getOrganizationEmployeeId(), rule.getPermission());
    if (matching.length !== 0) {
      throw new AuthorizationRuleAlreadyExists();
    }
    this.rules.push(rule);
    this.publishedEvents.push(...rule.getRaisedEvents());
  }

  getPublishedEvents() {
    return this.publishedEvents;
  }
}
