/* eslint-disable @typescript-eslint/no-unused-vars */
import EventBus, { IncomingEvent } from "@app/Command/Domain/Service/EventBus";
import DomainEvent from "@app/Command/Domain/Event/DomainEvent";

export default class DummyEventBus implements EventBus {
  publishEvent(event: DomainEvent): Promise<void> {
    return Promise.resolve();
  }

  publishEvents(events: DomainEvent[]): Promise<void> {
    return Promise.resolve();
  }

  onNextEvent(callback: (message: IncomingEvent) => void): Promise<void> {
    return Promise.resolve();
  }
}
