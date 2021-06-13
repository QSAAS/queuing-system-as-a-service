import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/OrganizationEmployeeBuilder";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import PassingOrganizationEndpointAuthorizationService
  from "@tests/Command/Infrastructure/PassingOrganizationEndpointAuthorizationService";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import EmployeeCreateNewQueueServerService from "@app/Command/Domain/Service/EmployeeCreateNewQueueServerService";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import FailingQueueServerAuthorizationService
  from "@tests/Command/Infrastructure/FailingQueueServerAuthorizationService";
import QueueServerCreated from "@app/Command/Domain/Event/QueueServerCreated";

describe("Queue server creation", () => {
  const admin = new OrganizationEmployeeBuilder().build();
  const endpointId = OrganizationEndpointId.create();
  const serves = [
    QueueNodeId.create(),
    QueueNodeId.create(),
  ];
  it("Raises an exception with the admin doesn't have the permission", () => {
    const failingAuth = new FailingQueueServerAuthorizationService();
    const service = new EmployeeCreateNewQueueServerService(failingAuth);
    expect(() => {
      service.execute(admin, endpointId, serves);
    }).toThrow(EmployeeNotAuthorizedError);
  });
  it("Raises an event on created object", () => {
    const passingAuth = new PassingOrganizationEndpointAuthorizationService();
    const service = new EmployeeCreateNewQueueServerService(passingAuth);
    const server = service.execute(admin, endpointId, serves);
    expect(eventsArrayContains(server.getRaisedEvents(), QueueServerCreated, (event) => (
      event.getQueueServer().getQueueServerId().equals(server.getQueueServerId())
    ))).toBeTruthy();
  });
});
