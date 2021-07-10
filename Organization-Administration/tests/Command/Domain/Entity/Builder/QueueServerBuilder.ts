import QueueServerId from "@app/Command/Domain/ValueObject/QueueServerId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import QueueServer from "@app/Command/Domain/Entity/QueueServer";

export default class QueueServerBuilder {
  protected queueServerId:QueueServerId = QueueServerId.create();
  protected organizationEndpointId:OrganizationEndpointId = OrganizationEndpointId.create();
  protected serves: QueueNodeId[] = [QueueNodeId.create()] ;

  public withQueueServerId(queueServerId:QueueServerId):this {
    this.queueServerId = queueServerId;
    return this;
  }

  public withOrganizationEndpointId(organizationEndpointId:OrganizationEndpointId)
    : this {
    this.organizationEndpointId = organizationEndpointId;
    return this;
  }

  public withServes(serves: QueueNodeId[]): this {
    this.serves = serves;
    return this;
  }

  public build():QueueServer {
    return QueueServer.create(this.queueServerId,
      this.organizationEndpointId, this.serves);
  }
}
