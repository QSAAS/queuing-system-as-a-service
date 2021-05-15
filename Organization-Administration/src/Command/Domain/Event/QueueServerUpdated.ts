import QueueServer from "@app/Command/Domain/Entity/QueueServer";
import DomainEvent from "@app/Command/Domain/Event/DomainEvent";

export default class QueueServerUpdated extends DomainEvent {
  private readonly queueServer : QueueServer;
  constructor(queueServer : QueueServer) {
    super();
    this.queueServer = queueServer;
  }

  public getQueueServer():QueueServer {
    return this.queueServer;
  }
}
