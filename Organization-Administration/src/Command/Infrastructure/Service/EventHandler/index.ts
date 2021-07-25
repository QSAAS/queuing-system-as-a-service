import EventBus, { IncomingEvent } from "@app/Command/Domain/Service/EventBus";
import EventListener from "@app/Command/Application/EventListener/EventListener";

export default class EventHandler {
  constructor(private eventBus: EventBus, private eventMap: { [key: string]: EventListener<any>[] }) {}

  async run() {
    await this.eventBus.onNextEvent((eventMessage: IncomingEvent) => {
      console.log("Routing event", eventMessage);
      const listeners = this.eventMap[eventMessage.type] || [];
      listeners.forEach((listener) => listener.execute(eventMessage));
    });
  }
}
