import DomainEvent from "@app/Command/Domain/Event/DomainEvent";

export default interface EventBus {
  publishEvent(event: DomainEvent): Promise<void>;

  publishEvents(events: DomainEvent[]): Promise<void>;

  onNextEvent(callback: (message: IncomingEvent) => void): Promise<void>;
}

export interface IncomingEvent {
  type: string;
  data: object;
}
