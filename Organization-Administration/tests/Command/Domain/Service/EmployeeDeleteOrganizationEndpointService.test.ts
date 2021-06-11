import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/OrganizationEmployeeBuilder";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";
import OrganizationEndpointBuilder from "@tests/Command/Domain/Entity/OrganizationEndpointBuilder";
import MockOrganizationEndpointRepository
  from "@tests/Command/Infrastructure/Mongoose/Repository/MockOrganizationEndpointRepository";
import FailingOrganizationEndpointAuthorizationService
  from "@tests/Command/Infrastructure/FailingOrganizationEndpointAuthorizationService";
import EmployeeDeleteOrganizationEndpointService from "@app/Command/Domain/Service/EmployeeDeleteOrganizationEndpoint";
import PassingOrganizationEndpointAuthorizationService
  from "@tests/Command/Infrastructure/PassingOrganizationEndpointAuthorizationService";
import OrganizationEndpointNotFound from "@app/Command/Domain/Error/OrganizationEndpointNotFound";
import OrganizationEndpointDeleted from "@app/Command/Domain/Event/OrganizationEndpointDeleted";

describe("Employee delete authorization rule", () => {
  const endpoint = new OrganizationEndpointBuilder().build();
  const admin = new OrganizationEmployeeBuilder().build();
  it("raises an exception when admin is not authorized", () => {
    const repo = new MockOrganizationEndpointRepository([endpoint], []);
    const failingAuthService = new FailingOrganizationEndpointAuthorizationService();
    const service = new EmployeeDeleteOrganizationEndpointService(repo, failingAuthService);
    expect(() => {
      service.execute(admin, endpoint);
    }).toThrow(EmployeeNotAuthorizedError);
  });
  it("removes from repository", () => {
    const repo = new MockOrganizationEndpointRepository([endpoint], []);
    const passingAuthService = new PassingOrganizationEndpointAuthorizationService();
    const service = new EmployeeDeleteOrganizationEndpointService(repo, passingAuthService);
    service.execute(admin, endpoint);
    expect(() => {
      repo.getById(endpoint.getOrganizationEndpointId());
    }).toThrow(OrganizationEndpointNotFound);
  });
  it("publishes an event for deleted authorization services", () => {
    const repo = new MockOrganizationEndpointRepository([endpoint], []);
    const passingAuthService = new PassingOrganizationEndpointAuthorizationService();
    const service = new EmployeeDeleteOrganizationEndpointService(repo, passingAuthService);
    service.execute(admin, endpoint);
    expect(
      eventsArrayContains(repo.getPublishedEvents(), OrganizationEndpointDeleted,
        (event) => (
          event.getOrganizationEndpoint().getOrganizationId().equals(endpoint.getOrganizationId()))),
    );
  });
});
