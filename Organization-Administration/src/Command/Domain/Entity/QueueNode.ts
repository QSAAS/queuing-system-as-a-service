import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";

export default class QueueNode extends AggregateRoot {
  constructor(
    private id: QueueNodeId,
    protected endpointId: OrganizationEndpointId,
    protected metaSpecs: MetadataSpecification,
    protected timeSpan: TimeSpan,
  ) {
    super();
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
