import DomainEvent from "@app/Command/Domain/Event/DomainEvent";
import QueueNode from "@app/Command/Domain/Entity/QueueNode";

export default class QueueNodeCreated extends DomainEvent {
  constructor(private queueNode: QueueNode) {
    super();
  }

  getQueueNode() {
    return this.queueNode;
  }
}
