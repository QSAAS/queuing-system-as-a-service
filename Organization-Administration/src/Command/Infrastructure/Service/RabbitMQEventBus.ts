import EventBus from "@app/Command/Domain/Service/EventBus";
import DomainEvent from "@app/Command/Domain/Event/DomainEvent";
import { Rabbit } from "rabbit-queue";
import "json-circular-stringify";

export default class RabbitMQEventBus implements EventBus {
  private connection: Rabbit;

  private QUEUE_NAME = "EventQueue";

  constructor(url: string) {
    this.connection = new Rabbit(url, {
      prefetch: 1,
      replyPattern: true,
      scheduledPublish: false,
      prefix: "",
      socketOptions: {},
    });
    this.connection.on("connected", () => {
      console.log("RMQ connected");
    });
    this.connection.on("disconnected", () => {
      console.log("RMQ disconnected");
      setTimeout(() => this.connection.reconnect(), 5000);
    });
  }

  async publishEvent(event: DomainEvent): Promise<void> {
    await this.connection.publish(this.QUEUE_NAME, JSON.stringify(event));
  }

  async publishEvents(events: DomainEvent[]): Promise<void> {
    await Promise.all(events.map((event) => this.publishEvent(event)));
  }
}
