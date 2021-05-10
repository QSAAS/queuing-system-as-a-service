import QueueServer from "@app/Command/Domain/Entity/QueueServer";

export default class QueueServerUpdated extends Event {
  private readonly queueServer : QueueServer;
  constructor(type: string, eventInitDict: EventInit, queueServer : QueueServer) {
    super(type, eventInitDict);
    this.queueServer = queueServer;
  }

  public getQueueServer():QueueServer {
    return this.queueServer;
  }
}
