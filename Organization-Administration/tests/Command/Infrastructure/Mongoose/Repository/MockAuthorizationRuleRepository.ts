import AuthorizationRuleRepository from "@app/Command/Domain/Service/AuthorizationRuleRepository";
import AuthorizationRule from "@app/Command/Domain/Entity/AuthorizationRule";
import Permission from "@app/Command/Domain/ValueObject/Permission";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import AuthorizationRuleNotFound from "@app/Command/Domain/Error/AuthorizationRuleNotFound";
import DomainEvent from "@app/Command/Domain/Event/DomainEvent";

export default class MockAuthorizationRuleRepository implements AuthorizationRuleRepository {
  constructor(
    private items: AuthorizationRule[] = [],
    private publishedEvents: DomainEvent[] = [],
  ) {
  }

  delete(item: AuthorizationRule): void {
    const idx = this.getMatchingIdx(item.getOrganizationEmployeeId(), item.getPermission());
    this.items.splice(idx, 1);
    this.publishedEvents.push(...item.getRaisedEvents());
  }

  private getMatchingIdx(employeeId: OrganizationEmployeeId, permission: Permission): number {
    for (let i = 0; i < this.items.length; ++i) {
      const current = this.items[i];
      if (current.getOrganizationEmployeeId().equals(employeeId)
        && current.getPermission().equals(permission)) {
        return i;
      }
    }
    return -1;
  }

  save(item: AuthorizationRule): void {
    const idx = this.getMatchingIdx(item.getOrganizationEmployeeId(), item.getPermission());
    if (idx === -1) {
      this.items[idx] = item;
    } else {
      this.items.push(item);
    }
    this.publishedEvents.push(...item.getRaisedEvents());
  }

  getPublishedEvents() {
    return this.publishedEvents;
  }

  getByEmployeeAndPermission(employeeId: OrganizationEmployeeId, permission: Permission): AuthorizationRule {
    const idx = this.getMatchingIdx(employeeId, permission);
    if (idx === -1) {
      throw new AuthorizationRuleNotFound();
    }
    return this.items[idx];
  }
}
