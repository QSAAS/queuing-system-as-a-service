import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import QueueNodeAuthorizationService from "@app/Command/Domain/Service/QueueNodeAuthorizationService";
import AdministratedQueueNode, { OrganizationEmployee } from "@app/Command/Domain/Entity/AdministratedQueueNode";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import TimeSpanBuilder from "@tests/Builders/TimeSpanBuilder";
import PassingQueueNodeAuthorizationService from "@tests/Command/Infrastructure/PassingQueueNodeAuthorizationService";

export default class AdministratedQueueNodeBuilder {
  private admin: OrganizationEmployee;
  private queueNode: QueueNode;
  private authService: QueueNodeAuthorizationService;

  constructor() {
    this.admin = new OrganizationEmployee(OrganizationEmployeeId.create());
    this.queueNode = new QueueNode(QueueNodeId.create(), OrganizationEmployeeId.create(),
      new MetadataSpecification([]), new TimeSpanBuilder().build());
    this.authService = new PassingQueueNodeAuthorizationService();
  }

  withAdmin(admin: OrganizationEmployee) {
    this.admin = admin;
    return this;
  }

  withQueueNode(queueNode: QueueNode) {
    this.queueNode = queueNode;
    return this;
  }

  withAuthService(authService: QueueNodeAuthorizationService) {
    this.authService = authService;
    return this;
  }

  build() {
    return new AdministratedQueueNode(this.admin, this.queueNode, this.authService);
  }
}
