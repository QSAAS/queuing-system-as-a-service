import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import GenericTransformer from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/Interface/GenericTransformer";
import IQueueServer from "@app/Command/Infrastructure/Repository/Mongoose/Types/IQueueServer";
import QueueServer from "@app/Command/Domain/Entity/QueueServer";

export default class QueueServerMongooseTransformer implements GenericTransformer<IQueueServer, QueueServer> {
  mongooseObjectFrom(serverInstance: QueueServer): IQueueServer {
    return {
      id: serverInstance.getId().toString(),
      endpointId: serverInstance.getOrganizationEndpointId().toString(),
      serves: serverInstance.getServes().map((queueId) => queueId.toString()),
    };
  }

  domainInstanceFrom(serverObject: IQueueServer): QueueServer {
    const id = QueueNodeId.from(serverObject.id);
    const endpointId = OrganizationEndpointId.from(serverObject.endpointId);
    const queueNodeIds = serverObject.serves.map((nodeId) => QueueNodeId.from(nodeId));
    return new QueueServer(id, endpointId, queueNodeIds);
  }
}
