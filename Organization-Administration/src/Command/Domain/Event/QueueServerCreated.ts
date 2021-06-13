import DomainEvent from "@app/Command/Domain/Event/DomainEvent";

// TODO: Remove after merging hanafy's work
class QueueServer {
}

export default class QueueServerCreated extends DomainEvent {
  constructor(private queueServer: QueueServer) {
    super();
  }

  getQueueServer() {
    return this.queueServer;
  }
}
