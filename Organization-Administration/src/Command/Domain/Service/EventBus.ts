import DomainEvent from "@app/Command/Domain/Event/DomainEvent";

export default interface EventBus {
  publishEvent(event: DomainEvent): Promise<void>;

  publishEvents(event: DomainEvent[]): Promise<void>;
}
