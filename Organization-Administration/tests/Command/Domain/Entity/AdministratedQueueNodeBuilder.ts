import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import QueueNodeAuthorizationService from "@app/Command/Domain/Service/QueueNodeAuthorizationService";
import AdministratedQueueNode from "@app/Command/Domain/Entity/AdministratedQueueNode";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import TimeSpanBuilder from "@tests/Command/Domain/ValueObject/TimeSpanBuilder";
import PassingQueueNodeAuthorizationService from "@tests/Command/Infrastructure/PassingQueueNodeAuthorizationService";
import MetadataSpecificationBuilder from "@tests/Command/Domain/ValueObject/MetadataSpecificationBuilder";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeMother from "@tests/Command/Domain/Entity/OrganizationEmployeeMother";

export default class AdministratedQueueNodeBuilder {
  private admin: OrganizationEmployee;
  private queueNode: QueueNode;
  private authService: QueueNodeAuthorizationService;

  constructor() {
    this.admin = OrganizationEmployeeMother.admin().build();
    this.queueNode = new QueueNode(QueueNodeId.create(),
      OrganizationEmployeeId.create(),
      new MetadataSpecificationBuilder().build(),
      new TimeSpanBuilder().build());
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
