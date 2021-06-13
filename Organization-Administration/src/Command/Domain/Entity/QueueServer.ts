import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import QueueServerId from "@app/Command/Domain/ValueObject/QueueServerId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";

export default class QueueServer extends AggregateRoot {
  protected queueServerId: QueueServerId;
  protected organizationSEndpointId: OrganizationEndpointId;
  protected serves : QueueNodeId[];
  constructor(queueServerId: QueueServerId, organizationSEndpointId: OrganizationEndpointId, serves : QueueNodeId[]) {
    super();
    this.queueServerId = queueServerId;
    this.organizationSEndpointId = organizationSEndpointId;
    this.serves = serves;
  }

  public getServes(): QueueNodeId[] {
    return this.serves;
  }

  public getId(): QueueServerId {
    return this.queueServerId;
  }

  public getOrganizationEndpointId(): OrganizationEndpointId {
    return this.organizationSEndpointId;
  }

  public static create(queueServerId:QueueServerId,
    organizationEndpointId:OrganizationEndpointId, serves:QueueNodeId[]) {
    return new QueueServer(queueServerId, organizationEndpointId, serves);
  }
}
