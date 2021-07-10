import QueueServerBuilder from "@tests/Command/Domain/Entity/Builder/QueueServerBuilder";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeMother from "@tests/Command/Domain/Entity/Mother/OrganizationEmployeeMother";
import AdministratedQueueServer from "@app/Command/Domain/Entity/AdministratedQueueServer";
import PassingQueueServerAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/PassingQueueServerAuthorizationService";
import QueueServer from "@app/Command/Domain/Entity/QueueServer";
import QueueServerAuthorizationService from "@app/Command/Domain/Service/QueueServerAuthorizationService";

export default class AdministratedQueueServerBuilder extends QueueServerBuilder {
  private admin: OrganizationEmployee = OrganizationEmployeeMother.admin().build();
  private queueServerAuthorizationService: QueueServerAuthorizationService =
    new PassingQueueServerAuthorizationService();

  private queueServer: QueueServer = new QueueServerBuilder().build();

  withAdmin(admin: OrganizationEmployee): this {
    this.admin = admin;
    return this;
  }

  withQueueServerAuthorizationService(queueServerAuthorizationService: QueueServerAuthorizationService) {
    this.queueServerAuthorizationService = queueServerAuthorizationService;
    return this;
  }

  build(): AdministratedQueueServer {
    return new AdministratedQueueServer(this.admin, this.queueServer, this.queueServerAuthorizationService);
  }
}
