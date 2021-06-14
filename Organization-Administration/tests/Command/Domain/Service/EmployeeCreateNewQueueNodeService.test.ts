import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/Builder/OrganizationEmployeeBuilder";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";
import FailingQueueNodeAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/FailingQueueNodeAuthorizationService";
import EmployeeCreateNewQueueNodeService from "@app/Command/Domain/Service/EmployeeCreateNewQueueNodeService";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import MetadataSpecificationBuilder from "@tests/Command/Domain/ValueObject/Builder/MetadataSpecificationBuilder";
import TimeSpanBuilder from "@tests/Command/Domain/ValueObject/Builder/TimeSpanBuilder";
import QueueNodeCreated from "@app/Command/Domain/Event/QueueNodeCreated";
import PassingQueueNodeAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/PassingQueueNodeAuthorizationService";

describe("Queue node creation", () => {
  const admin = new OrganizationEmployeeBuilder().build();
  const endpointId = OrganizationEndpointId.create();
  const metadataSpecs = new MetadataSpecificationBuilder().build();
  const operatingTimes = new TimeSpanBuilder().build();
  it("Raises an exception with the admin doesn't have the permission", () => {
    const failingAuth = new FailingQueueNodeAuthorizationService();
    const service = new EmployeeCreateNewQueueNodeService(failingAuth);
    expect(service.execute(admin, endpointId, metadataSpecs, operatingTimes)).rejects.toBeInstanceOf(
      EmployeeNotAuthorizedError,
    );
  });
  it("Raises an event on created object", async () => {
    const passingAuth = new PassingQueueNodeAuthorizationService();
    const service = new EmployeeCreateNewQueueNodeService(passingAuth);
    const node = await service.execute(admin, endpointId, metadataSpecs, operatingTimes);
    expect(
      eventsArrayContains(node.getRaisedEvents(), QueueNodeCreated, (event) =>
        event.getQueueNode().getId().equals(node.getId()),
      ),
    ).toBeTruthy();
  });
});
