import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import IQueueNode from "@app/Command/Infrastructure/Mongoose/Types/IQueueNode";
import MetadataSpecificationFieldTransformer
  from "@app/Command/Infrastructure/Mongoose/Transformer/MetadataSpecificationFieldTransformer";
import TimeSpanTransformer from "@app/Command/Infrastructure/Mongoose/Transformer/TimeSpanTransformer";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";

export default class QueueNodeTransformer {
  constructor(
    private metadataFieldTransformer: MetadataSpecificationFieldTransformer,
    private timespanTransformer: TimeSpanTransformer,
  ) {

  }

  toMongooseType(queueNode: QueueNode): IQueueNode {
    return {
      id: queueNode.getId().toString(),
      endpointId: queueNode.getEndPointId().toString(),
      timeSpan: this.timespanTransformer.toMongooseType(queueNode.getTimeSpan()),
      metaSpecs: {
        fields: queueNode.getMetaSpecs().getFields().map(
          (field) => this.metadataFieldTransformer.toMongooseType(field),
        ),
      },
    };
  }

  toEntity(node: IQueueNode): QueueNode {
    const id = QueueNodeId.from(node.id);
    const endpointId = OrganizationEndpointId.from(node.endpointId);
    const timeSpan = this.timespanTransformer.toDomainObject(node.timeSpan);
    const metaSpecs = new MetadataSpecification(
      node.metaSpecs.fields.map((field) => this.metadataFieldTransformer.toDomainObject(field)),
    );
    return new QueueNode(id, endpointId, metaSpecs, timeSpan);
  }
}
