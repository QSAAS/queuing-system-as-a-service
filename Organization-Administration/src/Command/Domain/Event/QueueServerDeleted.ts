import DomainEvent from "@app/Command/Domain/Event/DomainEvent";
import QueueServer from "@app/Command/Domain/Entity/QueueServer";

export default class QueueServerDeleted extends DomainEvent {
  constructor(private queueServer: QueueServer) {
    super();
  }

  getQueueServer() {
    return this.queueServer;
  }
}
