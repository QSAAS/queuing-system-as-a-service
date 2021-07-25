import EventBus, { IncomingEvent } from "@app/Command/Domain/Service/EventBus";
import DomainEvent from "@app/Command/Domain/Event/DomainEvent";
import "json-circular-stringify";
import * as Amqp from "amqp-ts";

export default class RabbitMQEventBus implements EventBus {
  private connection: Amqp.Connection;

  private exchange: Amqp.Exchange;

  private QUEUE_NAME = "EventQueue_OrganizationAdministration";
  private EXCHANGE_NAME = "EventQueueExchange";

  constructor(private url: string) {
    this.connection = new Amqp.Connection(this.url);
    this.exchange = this.connection.declareExchange(this.EXCHANGE_NAME, "fanout");
  }

  async waitForConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.completeConfiguration().then(() => {
        console.log("RMQ connected");
        resolve();
      });

      setTimeout(() => reject(), 15000); // Timeout after a while

      this.connection.on("lost_connection", () => {
        console.log("RMQ disconnected");
      });
      this.connection.on("error_connection", () => {
        console.log("RMQ disconnected (error)");
      });
    });
  }

  async publishEvent(event: DomainEvent): Promise<void> {
    const message = new Amqp.Message(JSON.stringify(event));
    await this.exchange.send(message);
  }

  async publishEvents(events: DomainEvent[]): Promise<void> {
    await Promise.all(events.map((event) => this.publishEvent(event)));
  }

  async onNextEvent(callback: (message: IncomingEvent) => void): Promise<void> {
    const queue = this.connection.declareQueue(this.QUEUE_NAME);
    await queue.bind(this.exchange);
    await queue.activateConsumer((message) => {
      console.log("GOT_MESSAGE", message.getContent());
      const data = JSON.parse(message.getContent());
      callback({
        type: data.eventName,
        data,
      });
    });
  }
}
