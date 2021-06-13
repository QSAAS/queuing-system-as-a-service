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

describe("Queue node creation", () => {
  const admin = new OrganizationEmployeeBuilder().build();
  const endpointId = OrganizationEndpointId.create();
  const metadataSpecs = new MetadataSpecificationBuilder().build();
  const operatingTimes = new TimeSpanBuilder().build();
  it("Raises an exception with the admin doesn't have the permission", () => {
    const failingAuth = new FailingQueueNodeAuthorizationService();
    const service = new EmployeeCreateNewQueueNodeService(failingAuth);
    expect(() => {
      service.execute(admin, endpointId, metadataSpecs, operatingTimes);
    }).toThrow(EmployeeNotAuthorizedError);
  });
  it("Raises an event on created object", () => {
    const passingAuth = new PassingOrganizationEndpointAuthorizationService();
    const service = new EmployeeCreateNewQueueNodeService(passingAuth);
    const endpoint = service.execute(admin, endpointId, metadataSpecs, operatingTimes);
    expect(eventsArrayContains(endpoint.getRaisedEvents(), QueueNodeCreated, (event) => (
      event.getQueueNode().getId().equals(endpoint.getId())
    ))).toBeTruthy();
  });
});
