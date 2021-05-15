import QueueServer from "@app/Command/Domain/Entity/QueueServer";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import QueueServerId from "@app/Command/Domain/ValueObject/QueueServerId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import QueueServerUpdated from "@app/Command/Domain/Event/QueueServerUpdated";

export default class AdministratedQueueServer extends QueueServer {
  private administrator : OrganizationEmployee;
  constructor(admin : OrganizationEmployee, queueServerId: QueueServerId,
    organizationSEndpointId: OrganizationEndpointId, serves : QueueNodeId[]) {
    super(queueServerId, organizationSEndpointId, serves);
    this.administrator = admin;
  }

  public setServedQueueNodes(queueNodeIds: QueueNodeId[]) {
    this.raiseEvent(new QueueServerUpdated(this));
    this.setServes(queueNodeIds);
  }
}
