import DomainEvent from "@app/Command/Domain/Event/DomainEvent";
import QueueServer from "@app/Command/Domain/Entity/QueueServer";

export default class QueueServerCreated extends DomainEvent {
  constructor(private queueServer: QueueServer) {
    super();
  }

  getQueueServer() {
    return this.queueServer;
  }
}
