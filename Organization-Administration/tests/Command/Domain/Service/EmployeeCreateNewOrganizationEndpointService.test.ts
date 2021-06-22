import EmployeeCreateNewOrganizationEndpointService from "@app/Command/Domain/Service/EmployeeCreateNewOrganizationEndpointService";
import FailingOrganizationEndpointAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/FailingOrganizationEndpointAuthorizationService";
import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/Builder/OrganizationEmployeeBuilder";
import GeolocationBuilder from "@tests/Command/Domain/ValueObject/Builder/GeolocationBuilder";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import PassingOrganizationEndpointAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/PassingOrganizationEndpointAuthorizationService";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";
import OrganizationEndpointCreated from "@app/Command/Domain/Event/OrganizationEndpointCreated";

describe("Organization endpoint creation", () => {
  const admin = new OrganizationEmployeeBuilder().build();
  const location = new GeolocationBuilder().build();
  it("Raises an exception with the admin doesn't have the permission", async () => {
    const failingAuth = new FailingOrganizationEndpointAuthorizationService();
    const service = new EmployeeCreateNewOrganizationEndpointService(failingAuth);
    await expect(service.execute(admin, "::EndpointName::", location)).rejects.toBeInstanceOf(EmployeeNotAuthorizedError);
  });
  it("Raises an event on created object", async () => {
    const passingAuth = new PassingOrganizationEndpointAuthorizationService();
    const service = new EmployeeCreateNewOrganizationEndpointService(passingAuth);
    const endpoint = await service.execute(admin, "::EndpointName::", location);
    expect(
      eventsArrayContains(endpoint.getRaisedEvents(), OrganizationEndpointCreated, (event) =>
        event.getEndpoint().getId().equals(endpoint.getId()),
      ),
    ).toBeTruthy();
  });
});
