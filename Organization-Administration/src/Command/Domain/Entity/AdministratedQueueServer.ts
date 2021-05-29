import QueueServer from "@app/Command/Domain/Entity/QueueServer";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import QueueServerUpdated from "@app/Command/Domain/Event/QueueServerUpdated";
import QueueServerAuthorizationService from "@app/Command/Application/Service/QueueServerAuthorizationService";

export default class AdministratedQueueServer extends QueueServer {
  private administrator : OrganizationEmployee;
  private queueServerAuthorizationService: QueueServerAuthorizationService ;
  constructor(admin : OrganizationEmployee, queueServer:QueueServer,
    queueServerAuthorizationService:QueueServerAuthorizationService) {
    super(queueServer.getQueueServerId(), queueServer.getOrganizationEndpointId(), queueServer.getServes());
    this.administrator = admin;
    this.queueServerAuthorizationService = queueServerAuthorizationService;
  }

  public setServedQueueNodes(queueNodeIds: QueueNodeId[]) {
    this.raiseEvent(new QueueServerUpdated(this));
    this.serves = queueNodeIds;
  }
}
