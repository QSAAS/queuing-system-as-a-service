import AdministratedOrganizationEmployee from "@app/Command/Domain/Entity/AdministratedOrganizationEmployee";
import AdministratedOrganizationEmployeeBuilder
  from "@tests/Command/Domain/Entity/AdministratedOrganizationEmployeeBuilder";
import FailingOrganizationEmployeeAuthorizationService
  from "@tests/Command/Infrastructure/FailingOrganizationEmployeeAuthorizationService";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";

describe("test AdministratedOrganization Employee", () => {
  describe("Events", () => {
    it("raise event when update username", () => {
      const administratedEmployee: AdministratedOrganizationEmployee = new
      AdministratedOrganizationEmployeeBuilder().build();
      administratedEmployee.setUsername(administratedEmployee.getUsername());
      /// todo
      expect(administratedEmployee.getRaisedEvents().length).toEqual(1);
    });
    it("raise event when update name", () => {
      const administratedEmployee: AdministratedOrganizationEmployee = new
      AdministratedOrganizationEmployeeBuilder().build();
      administratedEmployee.setName(administratedEmployee.getName());
      /// todo
      expect(administratedEmployee.getRaisedEvents().length).toEqual(1);
    });

    it("raise event when set passwordHash", () => {
      const administratedEmployee: AdministratedOrganizationEmployee = new
      AdministratedOrganizationEmployeeBuilder().build();
      administratedEmployee.setPasswordHash(administratedEmployee.getPasswordHash());
      /// todo
      expect(administratedEmployee.getRaisedEvents().length).toEqual(1);
    });
  });
  describe("Exceptions", () => {
    it("Throw exception when set passwordHash with failing OrgEmpAuthServ", () => {
      const administratedEmployee: AdministratedOrganizationEmployee = new
      AdministratedOrganizationEmployeeBuilder()
        .withOEAuthService(new FailingOrganizationEmployeeAuthorizationService()).build();

      expect(() => {
        administratedEmployee.setPasswordHash(administratedEmployee.getPasswordHash());
      }).toThrow(EmployeeNotAuthorizedError);
    });
    it("Throw exception when set Name with failing OrgEmpAuthServ", () => {
      const administratedEmployee: AdministratedOrganizationEmployee = new
      AdministratedOrganizationEmployeeBuilder()
        .withOEAuthService(new FailingOrganizationEmployeeAuthorizationService()).build();

      expect(() => {
        administratedEmployee.setName(administratedEmployee.getName());
      }).toThrow(EmployeeNotAuthorizedError);
    });
    it("Throw exception when set username with failing OrgEmpAuthServ", () => {
      const administratedEmployee: AdministratedOrganizationEmployee = new
      AdministratedOrganizationEmployeeBuilder()
        .withOEAuthService(new FailingOrganizationEmployeeAuthorizationService()).build();

      expect(() => {
        administratedEmployee.setUsername(administratedEmployee.getUsername());
      }).toThrow(EmployeeNotAuthorizedError);
    });
    it("Throw exception when set OrganizationEmployeeId with failing OrgEmpAuthServ", () => {
      const administratedEmployee: AdministratedOrganizationEmployee = new
      AdministratedOrganizationEmployeeBuilder()
        .withOEAuthService(new FailingOrganizationEmployeeAuthorizationService()).build();

      expect(() => {
        administratedEmployee.setOrganizationEmployeeId(administratedEmployee.getOrganizationEmployeeId());
      }).toThrow(EmployeeNotAuthorizedError);
    });
    it("Throw exception when set OrganizationId with failing OrgEmpAuthServ", () => {
      const administratedEmployee: AdministratedOrganizationEmployee = new
      AdministratedOrganizationEmployeeBuilder()
        .withOEAuthService(new FailingOrganizationEmployeeAuthorizationService()).build();

      expect(() => {
        administratedEmployee.setOrganizationId(administratedEmployee.getOrganizationId());
      }).toThrow(EmployeeNotAuthorizedError);
    });
  });
});
