import EventBus from "@app/Command/Domain/Service/EventBus";
import EventListener from "@app/Command/Application/EventListener/EventListener";

export default class EventHandler {
  private POLL_INTERVAL = 1000;

  constructor(private eventBus: EventBus, private eventMap: { [key: string]: EventListener<any>[] }) {}

  async run() {
    const event = await this.eventBus.getNextEvent();

    const listeners = this.eventMap[event.type] || [];

    listeners.forEach((listener) => listener.execute(event));

    setTimeout(() => this.run(), this.POLL_INTERVAL);
  }
}
