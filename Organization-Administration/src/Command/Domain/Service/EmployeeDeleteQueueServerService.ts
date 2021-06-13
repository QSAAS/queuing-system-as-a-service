import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import QueueServerAuthorizationService from "@app/Command/Domain/Service/QueueServerAuthorizationService";
import QueueServer from "@app/Command/Domain/Entity/QueueServer";
import QueueServerDeleted from "@app/Command/Domain/Event/QueueServerDeleted";
import QueueServerRepository from "@app/Command/Domain/Service/QueueServerRepository";

export default class EmployeeDeleteQueueServerService {
  constructor(
    private serverRepository: QueueServerRepository,
    private serverAuthService: QueueServerAuthorizationService,
  ) {
  }

  async execute(admin: OrganizationEmployee, server: QueueServer): Promise<void> {
    this.serverAuthService.ensureEmployeeCanDelete(admin.getId(), server.getId());
    server.raiseEvent(new QueueServerDeleted(server));
    await this.serverRepository.delete(server);
  }
}
