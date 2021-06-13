import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/OrganizationEmployeeBuilder";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import PassingOrganizationEndpointAuthorizationService
  from "@tests/Command/Infrastructure/PassingOrganizationEndpointAuthorizationService";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";
import FailingQueueNodeAuthorizationService from "@tests/Command/Infrastructure/FailingQueueNodeAuthorizationService";
import EmployeeCreateNewQueueNodeService from "@app/Command/Domain/Service/EmployeeCreateNewQueueNodeService";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import MetadataSpecificationBuilder from "@tests/Command/Domain/ValueObject/MetadataSpecificationBuilder";
import TimeSpanBuilder from "@tests/Command/Domain/ValueObject/TimeSpanBuilder";
import QueueNodeCreated from "@app/Command/Domain/Event/QueueNodeCreated";
import EmployeeCreateNewQueueServerService from "@app/Command/Domain/Service/EmployeeCreateNewQueueServerService";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";

describe("Queue node creation", () => {
  const admin = new OrganizationEmployeeBuilder().build();
  const endpointId = OrganizationEndpointId.create();
  const serves = [
    QueueNodeId.create(),
    QueueNodeId.create(),
  ];
  it("Raises an exception with the admin doesn't have the permission", () => {
    const failingAuth = new FailingQueueServerRepository();
    const service = new EmployeeCreateNewQueueServerService(failingAuth);
    expect(() => {
      service.execute(admin, endpointId, serves);
    }).toThrow(EmployeeNotAuthorizedError);
  });
  it("Raises an event on created object", () => {
    const passingAuth = new PassingOrganizationEndpointAuthorizationService();
    const service = new EmployeeCreateNewQueueNodeService(passingAuth);
    const endpoint = service.execute(admin, endpointId, serves);
    expect(eventsArrayContains(endpoint.getRaisedEvents(), QueueNodeCreated, (event) => (
      event.getQueueNode().getId().equals(endpoint.getId())
    ))).toBeTruthy();
  });
});
