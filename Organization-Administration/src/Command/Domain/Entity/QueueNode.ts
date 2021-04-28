import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";

export default class QueueNode extends AggregateRoot {
  constructor(private readonly id: QueueNodeId,
    private readonly endpointId: OrganizationEndpointId,
    private readonly metaSpecs: MetadataSpecification) {
    super();
  }
}
