import AdministratedOrganizationEmployee from "@app/Command/Domain/Entity/AdministratedOrganizationEmployee";
import AdministratedOrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/Builder/AdministratedOrganizationEmployeeBuilder";
import FailingOrganizationEmployeeAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/FailingOrganizationEmployeeAuthorizationService";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";
import OrganizationEmployeeUpdated from "@app/Command/Domain/Event/OrganizationEmployeeUpdated";

describe("test AdministratedOrganization Employee", () => {
  describe("Events", () => {
    it("raise event when update username", () => {
      const administratedEmployee: AdministratedOrganizationEmployee =
        new AdministratedOrganizationEmployeeBuilder().build();
      administratedEmployee.setUsername(administratedEmployee.getUsername());
      expect(
        eventsArrayContains(administratedEmployee.getRaisedEvents(), OrganizationEmployeeUpdated, (event) =>
          event.getOrganizationEmployee().getId().equals(administratedEmployee.getId()),
        ),
      );
    });
    it("raise event when update name", () => {
      const administratedEmployee: AdministratedOrganizationEmployee =
        new AdministratedOrganizationEmployeeBuilder().build();
      administratedEmployee.setName(administratedEmployee.getName());
      expect(
        eventsArrayContains(administratedEmployee.getRaisedEvents(), OrganizationEmployeeUpdated, (event) =>
          event.getOrganizationEmployee().getId().equals(administratedEmployee.getId()),
        ),
      );
    });

    it("raise event when set passwordHash", () => {
      const administratedEmployee: AdministratedOrganizationEmployee =
        new AdministratedOrganizationEmployeeBuilder().build();
      administratedEmployee.setPasswordHash(administratedEmployee.getPasswordHash());
      expect(
        eventsArrayContains(administratedEmployee.getRaisedEvents(), OrganizationEmployeeUpdated, (event) =>
          event.getOrganizationEmployee().getId().equals(administratedEmployee.getId()),
        ),
      );
    });
  });
  describe("Exceptions", () => {
    it("Throw exception when set passwordHash with failing OrgEmpAuthServ", () => {
      const administratedEmployee: AdministratedOrganizationEmployee = new AdministratedOrganizationEmployeeBuilder()
        .withOEAuthService(new FailingOrganizationEmployeeAuthorizationService())
        .build();

      expect(() => {
        administratedEmployee.setPasswordHash(administratedEmployee.getPasswordHash());
      }).toThrow(EmployeeNotAuthorizedError);
    });
    it("Throw exception when set Name with failing OrgEmpAuthServ", () => {
      const administratedEmployee: AdministratedOrganizationEmployee = new AdministratedOrganizationEmployeeBuilder()
        .withOEAuthService(new FailingOrganizationEmployeeAuthorizationService())
        .build();

      expect(() => {
        administratedEmployee.setName(administratedEmployee.getName());
      }).toThrow(EmployeeNotAuthorizedError);
    });
    it("Throw exception when set username with failing OrgEmpAuthServ", () => {
      const administratedEmployee: AdministratedOrganizationEmployee = new AdministratedOrganizationEmployeeBuilder()
        .withOEAuthService(new FailingOrganizationEmployeeAuthorizationService())
        .build();

      expect(() => {
        administratedEmployee.setUsername(administratedEmployee.getUsername());
      }).toThrow(EmployeeNotAuthorizedError);
    });
    it("Throw exception when set OrganizationEmployeeId with failing OrgEmpAuthServ", () => {
      const administratedEmployee: AdministratedOrganizationEmployee = new AdministratedOrganizationEmployeeBuilder()
        .withOEAuthService(new FailingOrganizationEmployeeAuthorizationService())
        .build();

      expect(() => {
        administratedEmployee.setOrganizationEmployeeId(administratedEmployee.getId());
      }).toThrow(EmployeeNotAuthorizedError);
    });
    it("Throw exception when set OrganizationId with failing OrgEmpAuthServ", () => {
      const administratedEmployee: AdministratedOrganizationEmployee = new AdministratedOrganizationEmployeeBuilder()
        .withOEAuthService(new FailingOrganizationEmployeeAuthorizationService())
        .build();

      expect(() => {
        administratedEmployee.setOrganizationId(administratedEmployee.getOrganizationId());
      }).toThrow(EmployeeNotAuthorizedError);
    });
  });
});
