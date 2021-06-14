import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/Builder/OrganizationEmployeeBuilder";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";
import QueueServerBuilder from "@tests/Command/Domain/Entity/Builder/QueueServerBuilder";
import MockQueueServerRepository from "@tests/Command/Infrastructure/Repository/Mock/MockQueueServerRepository";
import FailingQueueServerAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/FailingQueueServerAuthorizationService";
import EmployeeDeleteQueueServerService from "@app/Command/Domain/Service/EmployeeDeleteQueueServerService";
import PassingQueueServerAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/PassingQueueServerAuthorizationService";
import QueueServerNotFound from "@app/Command/Domain/Error/QueueServerNotFound";
import QueueServerDeleted from "@app/Command/Domain/Event/QueueServerDeleted";

describe("Employee delete queue server", () => {
  const server = new QueueServerBuilder().build();
  const admin = new OrganizationEmployeeBuilder().build();

  it("raises an exception when admin is not authorized", async () => {
    const repo = new MockQueueServerRepository([server], []);
    const failingAuthService = new FailingQueueServerAuthorizationService();
    const service = new EmployeeDeleteQueueServerService(repo, failingAuthService);
    await expect(service.execute(admin, server)).rejects.toBeInstanceOf(EmployeeNotAuthorizedError);
  });

  it("removes from repository", async () => {
    const repo = new MockQueueServerRepository([server], []);
    const passingAuthService = new PassingQueueServerAuthorizationService();
    const service = new EmployeeDeleteQueueServerService(repo, passingAuthService);
    await service.execute(admin, server);
    expect(() => {
      repo.getById(server.getId());
    }).toThrow(QueueServerNotFound);
  });

  it("publishes an event for deleted authorization services", async () => {
    const repo = new MockQueueServerRepository([server], []);
    const passingAuthService = new PassingQueueServerAuthorizationService();
    const service = new EmployeeDeleteQueueServerService(repo, passingAuthService);
    await service.execute(admin, server);
    expect(
      eventsArrayContains(repo.getPublishedEvents(), QueueServerDeleted, (event) =>
        event.getQueueServer().getId().equals(server.getId()),
      ),
    );
  });
});
