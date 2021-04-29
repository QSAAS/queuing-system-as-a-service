import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";

export default class QueueNode extends AggregateRoot {
  constructor(public readonly id: QueueNodeId,
    public readonly endpointId: OrganizationEndpointId,
    public metaSpecs: MetadataSpecification,
    public timeSpan: TimeSpan) {
    super();
  }
}
