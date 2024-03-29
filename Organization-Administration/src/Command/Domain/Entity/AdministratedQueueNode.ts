// eslint-disable-next-line max-classes-per-file
import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import TimeSpan from "@app/Command/Domain/ValueObject/TimeSpan";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import QueueNodeUpdated from "@app/Command/Domain/Event/QueueNodeUpdated";
import QueueNodeAuthorizationService from "@app/Command/Domain/Service/QueueNodeAuthorizationService";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";

export default class AdministratedQueueNode extends QueueNode {
  constructor(
    private admin: OrganizationEmployee,
    queueNode: QueueNode,
    private authService: QueueNodeAuthorizationService,
  ) {
    super(queueNode.getId(), queueNode.getEndPointId(), queueNode.getMetaSpecs(), queueNode.getTimeSpan());
  }

  async setOperatingTimes(span: TimeSpan) {
    await this.authService.ensureEmployeeCanUpdate(this.admin.getId(), this.getId());
    this.timeSpan = span;
    this.raiseEvent(new QueueNodeUpdated(this));
  }

  async setMetaDataSpecification(metaSpecs: MetadataSpecification) {
    await this.authService.ensureEmployeeCanUpdate(this.admin.getId(), this.getId());
    this.metaSpecs = metaSpecs;
    this.raiseEvent(new QueueNodeUpdated(this));
  }
}
