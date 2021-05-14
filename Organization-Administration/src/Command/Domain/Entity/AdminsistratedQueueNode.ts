import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import QueueNodeUpdated from "@app/Command/Domain/Event/QueueNodeUpdated";
import QueueNodeAuthorizationService from "@app/Command/Domain/Service/QueueNodeAuthorizationService";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";

// TODO remove type after merging
type OrganizationEmployee = {
  id: OrganizationEmployeeId,
};

export default class AdministratedQueueNode extends QueueNode {
  constructor(public readonly admin: OrganizationEmployee, public readonly queueNode: QueueNode,
    public readonly authService: QueueNodeAuthorizationService) {
    super(queueNode.id, queueNode.endpointId, queueNode.metaSpecs, queueNode.timeSpan);
  }

  setOperatingTimes(span: TimeSpan): void {
    this.authService.ensureEmployeeCanUpdate(this.admin.id, this.id);
    this.timeSpan = span;
    this.raiseEvent(new QueueNodeUpdated(this));
  }

  setMetaDataSpecification(metaSpecs: MetadataSpecification) {
    this.authService.ensureEmployeeCanUpdate(this.admin.id, this.id);
    this.metaSpecs = metaSpecs;
    this.raiseEvent(new QueueNodeUpdated(this));
  }
}
