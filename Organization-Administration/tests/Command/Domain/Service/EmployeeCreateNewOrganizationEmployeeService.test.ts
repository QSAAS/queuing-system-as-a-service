import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/OrganizationEmployeeBuilder";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";
import EmployeeCreateNewOrganizaitonEmployeeService
  from "@app/Command/Domain/Service/EmployeeCreateNewOrganizationEmployeeService";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import EmployeeUsernameMother from "@tests/Command/Domain/ValueObject/EmployeeUsernameMother";
import FailingOrganizationEmployeeAuthorizationService
  from "@tests/Command/Infrastructure/FailingOrganizationEmployeeAuthorizationService";
import PassingOrganizationEmployeeAuthorizationService
  from "@tests/Command/Infrastructure/PassingOrganizationEmployeeAuthorizationService";
import OrganizationEmployeeCreated from "@app/Command/Domain/Event/OrganizationEmployeeCreated";

describe("Queue server creation", () => {
  const admin = new OrganizationEmployeeBuilder().build();
  const orgId = OrganizationId.create();
  const name = "::Organization name::";
  const password = "::s3cr3t::";
  const username = EmployeeUsernameMother.complete().build();
  it("Raises an exception with the admin doesn't have the permission", () => {
    const failingAuth = new FailingOrganizationEmployeeAuthorizationService();
    const service = new EmployeeCreateNewOrganizaitonEmployeeService(failingAuth);
    expect(() => {
      service.execute(admin, orgId, name, password, username);
    }).toThrow(EmployeeNotAuthorizedError);
  });
  it("Raises an event on created object", () => {
    const passingAuth = new PassingOrganizationEmployeeAuthorizationService();
    const service = new EmployeeCreateNewOrganizaitonEmployeeService(passingAuth);
    const employee = service.execute(admin, orgId, name, password, username);
    expect(eventsArrayContains(employee.getRaisedEvents(), OrganizationEmployeeCreated, (event) => (
      event.getOrganizationEmployee().getId().equals(employee.getId())
    ))).toBeTruthy();
  });
});
