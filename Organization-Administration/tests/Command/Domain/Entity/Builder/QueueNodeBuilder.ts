import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import TimeSpanBuilder from "@tests/Command/Domain/ValueObject/Builder/TimeSpanBuilder";
import MetadataSpecificationBuilder from "@tests/Command/Domain/ValueObject/Builder/MetadataSpecificationBuilder";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";

export default class QueueNodeBuilder {
  private id: QueueNodeId;
  private endpointId: OrganizationEndpointId;
  private metaSpecs: MetadataSpecification;
  private timeSpan: TimeSpan;

  constructor() {
    this.id = QueueNodeId.create();
    this.endpointId = OrganizationEndpointId.create();
    this.metaSpecs = new MetadataSpecificationBuilder().build();
    this.timeSpan = new TimeSpanBuilder().build();
  }

  build() {
    return new QueueNode(this.id, this.endpointId, this.metaSpecs, this.timeSpan);
  }
}
