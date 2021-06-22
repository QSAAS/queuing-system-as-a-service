import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import IQueueNode from "@app/Command/Infrastructure/Repository/Mongoose/Types/IQueueNode";
import MetadataSpecificationFieldTransformer
  from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/MetadataSpecificationFieldTransformer";
import TimeSpanTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/TimeSpanTransformer";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import GenericTransformer
  from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/Interface/GenericTransformer";
import MetadataSpecificationField from "@app/Command/Domain/ValueObject/MetadataSpecificationField";

export default class QueueNodeTransformer implements GenericTransformer<IQueueNode, QueueNode> {
  constructor(
    private metadataFieldTransformer: MetadataSpecificationFieldTransformer,
    private timespanTransformer: TimeSpanTransformer,
  ) {}

  mongooseObjectFrom(nodeInstance: QueueNode): IQueueNode {
    return {
      id: nodeInstance.getId().toString(),
      endpointId: nodeInstance.getEndPointId().toString(),
      timeSpan: this.timespanTransformer.mongooseObjectFrom(nodeInstance.getTimeSpan()),
      metaSpecs: {
        fields: nodeInstance
          .getMetaSpecs()
          .getFields()
          .map((field) => this.metadataFieldTransformer.mongooseObjectFrom(field)),
      },
    };
  }

  domainInstanceFrom(nodeObject: IQueueNode): QueueNode {
    const id = QueueNodeId.from(nodeObject.id);
    const endpointId = OrganizationEndpointId.from(nodeObject.endpointId);
    const timeSpan = this.timespanTransformer.domainInstanceFrom(nodeObject.timeSpan);
    const fields: MetadataSpecificationField[] =  nodeObject.metaSpecs.fields.map((field): MetadataSpecificationField =>{
      return this.metadataFieldTransformer.domainInstanceFrom(field);
    } );
    const metaSpecs = new MetadataSpecification(fields);
    return new QueueNode(id, endpointId, metaSpecs, timeSpan);
  }
}
