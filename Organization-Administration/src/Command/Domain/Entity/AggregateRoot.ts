import DomainEvent from "@app/Command/Domain/Event/DomainEvent";

export default abstract class AggregateRoot {
  private events: DomainEvent[] = [];

  public raiseEvent(event: DomainEvent): void {
    this.events.push(event);
  }

  public getRaisedEvents(): DomainEvent[] {
    return this.events;
  }
}
