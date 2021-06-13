import DomainEvent from "@app/Command/Domain/Event/DomainEvent";
import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import QueueNodeRepository from "@app/Command/Domain/Service/QueueNodeRepository";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import QueueNodeNotFound from "@app/Command/Domain/Error/QueueNodeNotFound";

export default class MockQueueNodeRepository implements QueueNodeRepository {
  constructor(
    private items: QueueNode[] = [],
    private publishedEvents: DomainEvent[] = [],
  ) {
  }

  async delete(item: QueueNode): Promise<void> {
    const idx = this.getMatchingIdx(item.getId());
    this.items.splice(idx, 1);
    this.publishedEvents.push(...item.getRaisedEvents());
  }

  private getMatchingIdx(itemId: QueueNodeId): number {
    for (let i = 0; i < this.items.length; ++i) {
      const current = this.items[i];
      if (current.getId().equals(itemId)) {
        return i;
      }
    }
    return -1;
  }

  public getById(id: QueueNodeId): QueueNode {
    const idx = this.getMatchingIdx(id);
    if (idx === -1) {
      throw new QueueNodeNotFound();
    }
    return this.items[idx];
  }

  async save(item: QueueNode): Promise<void> {
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
