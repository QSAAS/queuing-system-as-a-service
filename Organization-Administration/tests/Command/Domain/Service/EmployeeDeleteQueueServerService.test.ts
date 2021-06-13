import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/OrganizationEmployeeBuilder";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";
import QueueServerBuilder from "@tests/Command/Domain/Entity/QueueServerBuilder";
import MockQueueServerRepository from "@tests/Command/Infrastructure/Repository/MockQueueServerRepository";
import FailingQueueServerAuthorizationService
  from "@tests/Command/Infrastructure/FailingQueueServerAuthorizationService";
import EmployeeDeleteQueueServerService from "@app/Command/Domain/Service/EmployeeDeleteQueueServerService";
import PassingQueueServerAuthorizationService
  from "@tests/Command/Infrastructure/PassingQueueServerAuthorizationService";
import QueueServerNotFound from "@app/Command/Domain/Error/QueueServerNotFound";
import QueueServerDeleted from "@app/Command/Domain/Event/QueueServerDeleted";

describe("Employee delete queue server", () => {
  const server = new QueueServerBuilder().build();
  const admin = new OrganizationEmployeeBuilder().build();

  it("raises an exception when admin is not authorized", () => {
    const repo = new MockQueueServerRepository([server], []);
    const failingAuthService = new FailingQueueServerAuthorizationService();
    const service = new EmployeeDeleteQueueServerService(repo, failingAuthService);
    expect(() => {
      service.execute(admin, server);
    }).toThrow(EmployeeNotAuthorizedError);
  });

  it("removes from repository", () => {
    const repo = new MockQueueServerRepository([server], []);
    const passingAuthService = new PassingQueueServerAuthorizationService();
    const service = new EmployeeDeleteQueueServerService(repo, passingAuthService);
    service.execute(admin, server);
    expect(() => {
      repo.getById(server.getId());
    }).toThrow(QueueServerNotFound);
  });

  it("publishes an event for deleted authorization services", () => {
    const repo = new MockQueueServerRepository([server], []);
    const passingAuthService = new PassingQueueServerAuthorizationService();
    const service = new EmployeeDeleteQueueServerService(repo, passingAuthService);
    service.execute(admin, server);
    expect(
      eventsArrayContains(repo.getPublishedEvents(), QueueServerDeleted,
        (event) => (
          event.getQueueServer().getId().equals(server.getId()))),
    );
  });
});
