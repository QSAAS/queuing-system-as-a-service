/* eslint-disable @typescript-eslint/no-unused-vars */
import EventBus, { IncomingEvent } from "@app/Command/Domain/Service/EventBus";
import DomainEvent from "@app/Command/Domain/Event/DomainEvent";

export default class DummyEventBus implements EventBus {
  getNextEvent(): Promise<IncomingEvent> {
    return new Promise<IncomingEvent>((resolve) => {});
  }

  publishEvent(event: DomainEvent): Promise<void> {
    return Promise.resolve(undefined);
  }

  publishEvents(events: DomainEvent[]): Promise<void> {
    return Promise.resolve(undefined);
  }
}
