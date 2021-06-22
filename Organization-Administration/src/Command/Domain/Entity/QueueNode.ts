import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import QueueNodeCreated from "@app/Command/Domain/Event/QueueNodeCreated";

export default class QueueNode extends AggregateRoot {
  constructor(
    private id: QueueNodeId,
    protected endpointId: OrganizationEndpointId,
    protected metaSpecs: MetadataSpecification,
    protected timeSpan: TimeSpan,
  ) {
    super();
  }

  // this function should be used if the creation of the QueueNode instance should raise an event
  static create(id: QueueNodeId,
                endpointId: OrganizationEndpointId,
                metaSpecs: MetadataSpecification,
                timeSpan: TimeSpan,
  ) {
    const node = new QueueNode(QueueNodeId.create(), endpointId, metaSpecs, timeSpan);
    node.raiseEvent(new QueueNodeCreated(node));
    return node;
  }

  getId() {
    return this.id;
  }

  getEndPointId() {
    return this.endpointId;
  }

  getMetaSpecs() {
    return this.metaSpecs;
  }

  getTimeSpan() {
    return this.timeSpan;
  }
}
