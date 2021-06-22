import DomainEvent from "@app/Command/Domain/Event/DomainEvent";
import OrganizationEndpointRepository from "@app/Command/Domain/Service/OrganizationEndpointRepository";
import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import OrganizationEndpointNotFound from "@app/Command/Domain/Error/OrganizationEndpointNotFound";

export default class MockOrganizationEndpointRepository implements OrganizationEndpointRepository {
  constructor(private items: OrganizationEndpoint[] = [], private publishedEvents: DomainEvent[] = []) {}

  async delete(item: OrganizationEndpoint): Promise<void> {
    const idx = this.getMatchingIdx(item.getId());
    this.items.splice(idx, 1);
    this.publishedEvents.push(...item.getRaisedEvents());
  }

  private getMatchingIdx(item: OrganizationEndpointId): number {
    for (let i = 0; i < this.items.length; ++i) {
      const current = this.items[i];
      if (current.getId().equals(item)) {
        return i;
      }
    }
    return -1;
  }

  public getById(id: OrganizationEndpointId): OrganizationEndpoint {
    const idx = this.getMatchingIdx(id);
    if (idx === -1) {
      throw new OrganizationEndpointNotFound();
    }
    return this.items[idx];
  }

  async save(item: OrganizationEndpoint): Promise<void> {
    const idx = this.getMatchingIdx(item.getId());
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
}
