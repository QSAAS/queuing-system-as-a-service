import DomainEvent from "@app/Command/Domain/Event/DomainEvent";
import QueueServerRepository from "@app/Command/Domain/Service/QueueServerRepository";
import QueueServer from "@app/Command/Domain/Entity/QueueServer";
import QueueServerId from "@app/Command/Domain/ValueObject/QueueServerId";
import QueueServerNotFound from "@app/Command/Domain/Error/QueueServerNotFound";

export default class MockQueueServerRepository implements QueueServerRepository {
  constructor(
    private items: QueueServer[] = [],
    private publishedEvents: DomainEvent[] = [],
  ) {
  }

  async delete(item: QueueServer): Promise<void> {
    const idx = this.getMatchingIdx(item.getId());
    this.items.splice(idx, 1);
    this.publishedEvents.push(...item.getRaisedEvents());
  }

  private getMatchingIdx(itemId: QueueServerId): number {
    for (let i = 0; i < this.items.length; ++i) {
      const current = this.items[i];
      if (current.getId().equals(itemId)) {
        return i;
      }
    }
    return -1;
  }

  public getById(id: QueueServerId): QueueServer {
    const idx = this.getMatchingIdx(id);
    if (idx === -1) {
      throw new QueueServerNotFound();
    }
    return this.items[idx];
  }

  async save(item: QueueServer): Promise<void> {
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
