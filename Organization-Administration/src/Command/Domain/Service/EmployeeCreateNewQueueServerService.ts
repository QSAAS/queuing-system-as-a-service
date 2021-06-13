import OrganizationEndpointAuthorizationService
  from "@app/Command/Domain/Service/OrganizationEndpointAuthorizationService";
import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import OrganizationEndpointCreated from "@app/Command/Domain/Event/OrganizationEndpointCreated";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import EntityId from "@app/Command/Domain/ValueObject/EntityId";
import QueueServerCreated from "@app/Command/Domain/Event/QueueServerCreated";
import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";

// TODO: Remove after h=we merge hanafy's code
interface QueueServerAuthService {
  ensureEmployeeCanCreate(id: OrganizationEmployeeId): void;
}

class QueueServerId extends EntityId {
}

class QueueServer extends AggregateRoot {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    id: QueueServerId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    organizationEndpointId: OrganizationEndpointId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    serves: QueueNodeId[],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {
    super();
  }
}

export default class EmployeeCreateNewQueueServerService {
  constructor(
    private queueServerAuthService: QueueServerAuthService,
  ) {
  }

  execute(admin: OrganizationEmployee, endpointId: OrganizationEndpointId, serves: QueueNodeId[]): QueueServer {
    this.queueServerAuthService.ensureEmployeeCanCreate(admin.getOrganizationId());
    const server = new QueueServer(
      QueueServerId.create(),
      endpointId,
      serves,
    );
    server.raiseEvent(new QueueServerCreated(server));
    return server;
  }
}
