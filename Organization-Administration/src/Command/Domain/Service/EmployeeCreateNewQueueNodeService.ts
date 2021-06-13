import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import QueueNodeAuthorizationService from "@app/Command/Domain/Service/QueueNodeAuthorizationService";
import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import QueueNodeCreated from "@app/Command/Domain/Event/QueueNodeCreated";

export default class EmployeeCreateNewQueueNodeService {
  constructor(private nodeAuthService: QueueNodeAuthorizationService) {}

  execute(
    admin: OrganizationEmployee,
    endpointId: OrganizationEndpointId,
    metadataSpecs: MetadataSpecification,
    operatingTimes: TimeSpan,
  ): QueueNode {
    this.nodeAuthService.ensureEmployeeCanCreate(admin.getId());
    const node = new QueueNode(QueueNodeId.create(), endpointId, metadataSpecs, operatingTimes);
    node.raiseEvent(new QueueNodeCreated(node));
    return node;
  }
}
