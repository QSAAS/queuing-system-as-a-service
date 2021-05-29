import QueueServerBuilder from "@tests/Command/Domain/Entity/QueueServerBuilder";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeMother from "@tests/Command/Domain/Entity/OrganizationEmployeeMother";
import AdministratedQueueServer from "@app/Command/Domain/Entity/AdministratedQueueServer";
import QueueServerAuthorizationService from "@app/Command/Application/Service/QueueServerAuthorizationService";
import PassingQueueServerAuthorizationService
  from "@tests/Command/Infrastructure/PassingQueueServerAuthorizationService";
import QueueServer from "@app/Command/Domain/Entity/QueueServer";

export default class AdministratedQueueServerBuilder extends QueueServerBuilder {
  private admin: OrganizationEmployee = OrganizationEmployeeMother.admin().build();
  private queueServerAuthorizationService:QueueServerAuthorizationService = new
  PassingQueueServerAuthorizationService();

  private queueServer: QueueServer = new QueueServerBuilder().build();

  withAdmin(admin: OrganizationEmployee) : this {
    this.admin = admin;
    return this;
  }

  build(): AdministratedQueueServer {
    return new AdministratedQueueServer(this.admin, this.queueServer, this.queueServerAuthorizationService);
  }
}
