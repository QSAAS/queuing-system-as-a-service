import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import QueueServerCreated from "@app/Command/Domain/Event/QueueServerCreated";
import QueueServer from "@app/Command/Domain/Entity/QueueServer";
import QueueServerAuthorizationService from "@app/Command/Domain/Service/QueueServerAuthorizationService";
import QueueServerId from "@app/Command/Domain/ValueObject/QueueServerId";

export default class EmployeeCreateNewQueueServerService {
  constructor(
    private queueServerAuthService: QueueServerAuthorizationService,
  ) {
  }

  execute(admin: OrganizationEmployee, endpointId: OrganizationEndpointId, serves: QueueNodeId[]): QueueServer {
    this.queueServerAuthService.ensureEmployeeCanCreate(admin.getId());
    const server = new QueueServer(
      QueueServerId.create(),
      endpointId,
      serves,
    );
    server.raiseEvent(new QueueServerCreated(server));
    return server;
  }
}
