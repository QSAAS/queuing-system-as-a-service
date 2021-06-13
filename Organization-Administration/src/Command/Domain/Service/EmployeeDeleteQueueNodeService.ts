import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import QueueNodeRepository from "@app/Command/Domain/Service/QueueNodeRepository";
import QueueNodeAuthorizationService from "@app/Command/Domain/Service/QueueNodeAuthorizationService";
import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import QueueNodeDeleted from "@app/Command/Domain/Event/QueueNodeDeleted";

export default class EmployeeDeleteQueueNodeService {
  constructor(private nodeRepository: QueueNodeRepository, private nodeAuthService: QueueNodeAuthorizationService) {}

  async execute(admin: OrganizationEmployee, node: QueueNode): Promise<void> {
    this.nodeAuthService.ensureEmployeeCanDelete(admin.getId(), node.getId());
    node.raiseEvent(new QueueNodeDeleted(node));
    await this.nodeRepository.delete(node);
  }
}
