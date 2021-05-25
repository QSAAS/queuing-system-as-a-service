// eslint-disable-next-line max-classes-per-file
import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import QueueNodeUpdated from "@app/Command/Domain/Event/QueueNodeUpdated";
import QueueNodeAuthorizationService from "@app/Command/Domain/Service/QueueNodeAuthorizationService";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";

export class OrganizationEmployee {
  constructor(private id: OrganizationEmployeeId) {}

  getId(): OrganizationEmployeeId {
    return this.id;
  }
} // TODO remove after merging

export default class AdministratedQueueNode extends QueueNode {
  constructor(
    private admin: OrganizationEmployee,
    queueNode: QueueNode,
    private authService: QueueNodeAuthorizationService,
  ) {
    super(queueNode.getId(), queueNode.getEndPointId(), queueNode.getMetaSpecs(), queueNode.getTimeSpan());
  }

  setOperatingTimes(span: TimeSpan): void {
    this.authService.ensureEmployeeCanUpdate(this.admin.getId(), this.getId());
    this.timeSpan = span;
    this.raiseEvent(new QueueNodeUpdated(this));
  }

  setMetaDataSpecification(metaSpecs: MetadataSpecification) {
    this.authService.ensureEmployeeCanUpdate(this.admin.getId(), this.getId());
    this.metaSpecs = metaSpecs;
    this.raiseEvent(new QueueNodeUpdated(this));
  }
}
