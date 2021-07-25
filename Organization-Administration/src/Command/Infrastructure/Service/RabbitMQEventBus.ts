// eslint-disable-next-line max-classes-per-file
import EventBus, { IncomingEvent } from "@app/Command/Domain/Service/EventBus";
import DomainEvent from "@app/Command/Domain/Event/DomainEvent";
import { BaseQueueHandler, Rabbit } from "rabbit-queue";
import "json-circular-stringify";

type RabbitMqMessage = {
  msg: object;
  event: string;
  correlationId: string;
  startTime: number;
};

class DemoHandler extends BaseQueueHandler {
  constructor(queueName: string, connection: Rabbit, props: object, private handler: Function) {
    super(queueName, connection, props);
  }

  handle(message: RabbitMqMessage) {
    this.handler(message);
  }
}

export default class RabbitMQEventBus implements EventBus {
  private connection: Rabbit;

  private QUEUE_NAME = "EventQueue";

  constructor(private url: string) {
    this.connection = new Rabbit(this.url, {
      prefetch: 1,
      replyPattern: true,
      scheduledPublish: false,
      prefix: "",
      socketOptions: {},
    });
  }

  async waitForConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.on("connected", () => {
        console.log("RMQ connected");
        resolve();
      });

      setTimeout(() => reject(), 15000); // Timeout after a while

      this.connection.on("disconnected", () => {
        console.log("RMQ disconnected");
        setTimeout(() => this.connection.reconnect(), 5000);
      });
    });
  }

  async publishEvent(event: DomainEvent): Promise<void> {
    await this.connection.publish(this.QUEUE_NAME, JSON.stringify(event));
  }

  async publishEvents(events: DomainEvent[]): Promise<void> {
    await Promise.all(events.map((event) => this.publishEvent(event)));
  }

  async getNextEvent(): Promise<IncomingEvent> {
    return new Promise((resolve) => {
      // eslint-disable-next-line no-new
      new DemoHandler(
        this.QUEUE_NAME,
        this.connection,
        {
          retries: 3,
          retryDelay: 1000,
          logEnabled: true, // log queue processing time
          scope: "SINGLETON", // can also be 'PROTOTYPE' to create a new instance every time
          createAndSubscribeToQueue: true, // used internally no need to overwriteÏÏ
        },
        ({ event }: RabbitMqMessage) => {
          const data = JSON.parse(event);
          resolve({
            type: data.eventName,
            data,
          });
        },
      );
    });
  }
}
