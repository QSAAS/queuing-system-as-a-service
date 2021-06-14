import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/Builder/OrganizationEmployeeBuilder";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";
import EmployeeCreateNewOrganizaitonEmployeeService from "@app/Command/Domain/Service/EmployeeCreateNewOrganizationEmployeeService";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import EmployeeUsernameMother from "@tests/Command/Domain/ValueObject/Mother/EmployeeUsernameMother";
import FailingOrganizationEmployeeAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/FailingOrganizationEmployeeAuthorizationService";
import PassingOrganizationEmployeeAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/PassingOrganizationEmployeeAuthorizationService";
import OrganizationEmployeeCreated from "@app/Command/Domain/Event/OrganizationEmployeeCreated";
import DummyPasswordHashFactory from "@tests/Command/Infrastructure/Service/DummyPasswordHashFactory";

describe("Queue server creation", () => {
  const admin = new OrganizationEmployeeBuilder().build();
  const passwordHash = new DummyPasswordHashFactory();
  const orgId = OrganizationId.create();
  const name = "::Organization name::";
  const password = "::s3cr3t::";
  const username = EmployeeUsernameMother.complete().build();
  it("Raises an exception with the admin doesn't have the permission", () => {
    const failingAuth = new FailingOrganizationEmployeeAuthorizationService();
    const service = new EmployeeCreateNewOrganizaitonEmployeeService(failingAuth, passwordHash);
    expect(service.execute(admin, orgId, name, password, username)).rejects.toBeInstanceOf(EmployeeNotAuthorizedError);
  });
  it("Raises an event on created object", async () => {
    const passingAuth = new PassingOrganizationEmployeeAuthorizationService();
    const service = new EmployeeCreateNewOrganizaitonEmployeeService(passingAuth, passwordHash);
    const employee = await service.execute(admin, orgId, name, password, username);
    expect(
      eventsArrayContains(employee.getRaisedEvents(), OrganizationEmployeeCreated, (event) =>
        event.getOrganizationEmployee().getId().equals(employee.getId()),
      ),
    ).toBeTruthy();
  });
});
