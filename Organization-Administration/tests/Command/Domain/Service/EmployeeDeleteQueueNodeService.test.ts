import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/Builder/OrganizationEmployeeBuilder";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";
import MockQueueNodeRepository from "@tests/Command/Infrastructure/Repository/Mock/MockQueueNodeRepository";
import QueueNodeBuilder from "@tests/Command/Domain/Entity/Builder/QueueNodeBuilder";
import EmployeeDeleteQueueNodeService from "@app/Command/Domain/Service/EmployeeDeleteQueueNodeService";
import FailingQueueNodeAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/FailingQueueNodeAuthorizationService";
import PassingQueueNodeAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/PassingQueueNodeAuthorizationService";
import QueueNodeDeleted from "@app/Command/Domain/Event/QueueNodeDeleted";
import QueueNodeNotFound from "@app/Command/Domain/Error/QueueNodeNotFound";

describe("Employee delete queue node", () => {
  const node = new QueueNodeBuilder().build();
  const admin = new OrganizationEmployeeBuilder().build();

  it("raises an exception when admin is not authorized", async () => {
    const repo = new MockQueueNodeRepository([node], []);
    const failingAuthService = new FailingQueueNodeAuthorizationService();
    const service = new EmployeeDeleteQueueNodeService(repo, failingAuthService);
    await expect(service.execute(admin, node)).rejects.toBeInstanceOf(EmployeeNotAuthorizedError);
  });

  it("removes from repository", async () => {
    const repo = new MockQueueNodeRepository([node], []);
    const passingAuthService = new PassingQueueNodeAuthorizationService();
    const service = new EmployeeDeleteQueueNodeService(repo, passingAuthService);
    await service.execute(admin, node);
    expect(() => {
      repo.getById(node.getId());
    }).toThrow(QueueNodeNotFound);
  });

  it("publishes an event for deleted authorization services", async () => {
    const repo = new MockQueueNodeRepository([node], []);
    const passingAuthService = new PassingQueueNodeAuthorizationService();
    const service = new EmployeeDeleteQueueNodeService(repo, passingAuthService);
    await service.execute(admin, node);
    expect(
      eventsArrayContains(repo.getPublishedEvents(), QueueNodeDeleted, (event) =>
        event.getQueueNode().getId().equals(node.getId()),
      ),
    );
  });
});
