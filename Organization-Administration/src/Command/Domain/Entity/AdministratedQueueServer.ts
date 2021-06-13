import QueueServer from "@app/Command/Domain/Entity/QueueServer";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import QueueServerUpdated from "@app/Command/Domain/Event/QueueServerUpdated";
import QueueServerAuthorizationService from "@app/Command/Domain/Service/QueueServerAuthorizationService";

export default class AdministratedQueueServer extends QueueServer {
  constructor(private admin : OrganizationEmployee,
    private queueServer:QueueServer,
    private queueServerAuthorizationService:QueueServerAuthorizationService) {
    super(queueServer.getId(), queueServer.getOrganizationEndpointId(), queueServer.getServes());
  }

  public setServedQueueNodes(queueNodeIds: QueueNodeId[]) {
    this.queueServerAuthorizationService.ensureEmployeeCanUpdate(this.admin.getId(),
      this.queueServerId);
    this.raiseEvent(new QueueServerUpdated(this));
    this.serves = queueNodeIds;
  }
}
