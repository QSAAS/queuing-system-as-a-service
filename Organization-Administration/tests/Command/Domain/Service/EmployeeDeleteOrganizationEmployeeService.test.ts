import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/OrganizationEmployeeBuilder";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";
import MockOrganizationEmployeeRepository
  from "@tests/Command/Infrastructure/Repository/MockOrganizationEmployeeRepository";
import FailingOrganizationEmployeeAuthorizationService
  from "@tests/Command/Infrastructure/FailingOrganizationEmployeeAuthorizationService";
import EmployeeDeleteOrganizationEmployeeService
  from "@app/Command/Domain/Service/EmployeeDeleteOrganizationEmployeeService";
import PassingOrganizationEmployeeAuthorizationService
  from "@tests/Command/Infrastructure/PassingOrganizationEmployeeAuthorizationService";
import OrganizationEmployeeNotFound from "@app/Command/Domain/Error/OrganizationEmployeeNotFound";
import OrganizationEmployeeCreated from "@app/Command/Domain/Event/OrganizationEmployeeCreated";

describe("Employee delete organization employee", () => {
  const employee = new OrganizationEmployeeBuilder().build();
  const admin = new OrganizationEmployeeBuilder().build();

  it("raises an exception when admin is not authorized", () => {
    const repo = new MockOrganizationEmployeeRepository([employee], []);
    const failingAuthService = new FailingOrganizationEmployeeAuthorizationService();
    const service = new EmployeeDeleteOrganizationEmployeeService(repo, failingAuthService);
    expect(() => {
      service.execute(admin, employee);
    }).toThrow(EmployeeNotAuthorizedError);
  });

  it("removes from repository", () => {
    const repo = new MockOrganizationEmployeeRepository([employee], []);
    const passingAuthService = new PassingOrganizationEmployeeAuthorizationService();
    const service = new EmployeeDeleteOrganizationEmployeeService(repo, passingAuthService);
    service.execute(admin, employee);
    expect(() => {
      repo.getById(employee.getId());
    }).toThrow(OrganizationEmployeeNotFound);
  });

  it("publishes an event for deleted authorization services", () => {
    const repo = new MockOrganizationEmployeeRepository([employee], []);
    const passingAuthService = new PassingOrganizationEmployeeAuthorizationService();
    const service = new EmployeeDeleteOrganizationEmployeeService(repo, passingAuthService);
    service.execute(admin, employee);
    expect(
      eventsArrayContains(repo.getPublishedEvents(), OrganizationEmployeeCreated,
        (event) => (
          event.getOrganizationEmployee().getId().equals(employee.getId()))),
    );
  });
});
