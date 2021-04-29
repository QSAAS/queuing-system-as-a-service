import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import QueueNodeUpdated from "@app/Command/Domain/Event/QueueNodeUpdated";
import QueueNodeAuthorizationService from "@app/Command/Domain/Service/QueueNodeAuthorizationService";

// TODO remove dummy classes
class OrganizationEmployee {}

export default class AdministratedQueueNode extends QueueNode {
  constructor(public readonly admin: OrganizationEmployee, public readonly queueNode: QueueNode,
    public readonly authService: QueueNodeAuthorizationService) {
    super(queueNode.id, queueNode.endpointId, queueNode.metaSpecs, queueNode.timeSpan);
  }

  setOperatingTimes(span: TimeSpan): void {
    this.timeSpan = span;
    // TODO discuss: is this the correct way of raising events?
    this.raiseEvent(new QueueNodeUpdated(this));
  }

  setMetaDataSpecification(metaSpecs: MetadataSpecification) {
    this.metaSpecs = metaSpecs;
    // TODO discuss: is this the correct way of raising events?
    this.raiseEvent(new QueueNodeUpdated(this));
  }
}
