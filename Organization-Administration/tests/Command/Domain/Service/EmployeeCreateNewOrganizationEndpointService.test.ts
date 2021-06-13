import EmployeeCreateNewOrganizationEndpointService
  from "@app/Command/Domain/Service/EmployeeCreateNewOrganizationEndpointService";
import FailingOrganizationEndpointAuthorizationService
  from "@tests/Command/Infrastructure/FailingOrganizationEndpointAuthorizationService";
import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/OrganizationEmployeeBuilder";
import GeolocationBuilder from "@tests/Command/Domain/ValueObject/GeolocationBuilder";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import PassingOrganizationEndpointAuthorizationService
  from "@tests/Command/Infrastructure/PassingOrganizationEndpointAuthorizationService";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";
import OrganizationEndpointCreated from "@app/Command/Domain/Event/OrganizationEndpointCreated";

describe("Organization endpoint creation", () => {
  const admin = new OrganizationEmployeeBuilder().build();
  const location = new GeolocationBuilder().build();
  it("Raises an exception with the admin doesn't have the permission", () => {
    const failingAuth = new FailingOrganizationEndpointAuthorizationService();
    const service = new EmployeeCreateNewOrganizationEndpointService(failingAuth);
    expect(() => {
      service.execute(admin, "::EndpointName::", location);
    }).toThrow(EmployeeNotAuthorizedError);
  });
  it("Raises an event on created object", () => {
    const passingAuth = new PassingOrganizationEndpointAuthorizationService();
    const service = new EmployeeCreateNewOrganizationEndpointService(passingAuth);
    const endpoint = service.execute(admin, "::EndpointName::", location);
    expect(eventsArrayContains(endpoint.getRaisedEvents(), OrganizationEndpointCreated, (event) => (
      event.getEndpoint().getOrganizationEndpointId().equals(endpoint.getOrganizationEndpointId())
    ))).toBeTruthy();
  });
});
