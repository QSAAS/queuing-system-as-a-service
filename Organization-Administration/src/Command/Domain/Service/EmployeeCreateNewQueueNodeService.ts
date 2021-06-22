import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import QueueNodeAuthorizationService from "@app/Command/Domain/Service/QueueNodeAuthorizationService";
import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";

export default class EmployeeCreateNewQueueNodeService {
  constructor(private nodeAuthService: QueueNodeAuthorizationService) {}

  async execute(
    admin: OrganizationEmployee,
    endpointId: OrganizationEndpointId,
    metaSpecs: MetadataSpecification,
    timeSpan: TimeSpan,
  ): Promise<QueueNode> {
    await this.nodeAuthService.ensureEmployeeCanCreate(admin.getId());
    return QueueNode.create(QueueNodeId.create(), endpointId, metaSpecs, timeSpan);
  }
}
