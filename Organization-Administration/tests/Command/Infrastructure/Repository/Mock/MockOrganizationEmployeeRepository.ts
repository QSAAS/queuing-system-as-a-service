import DomainEvent from "@app/Command/Domain/Event/DomainEvent";
import OrganizationEmployeeRepository from "@app/Command/Domain/Service/OrganizationEmployeeRepository";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationEmployeeNotFound from "@app/Command/Domain/Error/OrganizationEmployeeNotFound";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/Builder/OrganizationEmployeeBuilder";

export default class MockOrganizationEmployeeRepository implements OrganizationEmployeeRepository {
  constructor(private items: OrganizationEmployee[] = [], private publishedEvents: DomainEvent[] = []) {}

  async delete(item: OrganizationEmployee): Promise<void> {
    const idx = this.getMatchingIdx(item.getId());
    this.items.splice(idx, 1);
    this.publishedEvents.push(...item.getRaisedEvents());
  }

  private getMatchingIdx(itemId: OrganizationEmployeeId): number {
    for (let i = 0; i < this.items.length; ++i) {
      const current = this.items[i];
      if (current.getId().equals(itemId)) {
        return i;
      }
    }
    return -1;
  }

  public getById(id: OrganizationEmployeeId): Promise<OrganizationEmployee> {
    const idx = this.getMatchingIdx(id);
    if (idx === -1) {
      throw new OrganizationEmployeeNotFound();
    }
    return Promise.resolve(this.items[idx]);
  }

  async save(item: OrganizationEmployee): Promise<void> {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getByUsername(username: EmployeeUsername): Promise<OrganizationEmployee> {
    return Promise.resolve(new OrganizationEmployeeBuilder().build()); // TODO
  }
}
