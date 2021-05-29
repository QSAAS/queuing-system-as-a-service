import AdministratedOrganizationEmployee from "@app/Command/Domain/Entity/AdministratedOrganizationEmployee";
import AdministratedOrganizationEmployeeBuilder
  from "@tests/Command/Domain/Entity/AdministratedOrganizationEmployeeBuilder";

describe("test AdministratedOrganization Employee", () => {
  describe("Events", () => {
    it("raise event when update username", () => {
      const administratedEmployee: AdministratedOrganizationEmployee = new
      AdministratedOrganizationEmployeeBuilder().build();
      administratedEmployee.setUsername(administratedEmployee.getUsername());

      expect(administratedEmployee.getRaisedEvents().length).toEqual(1);
    });
    it("raise event when update name", () => {
      const administratedEmployee: AdministratedOrganizationEmployee = new
      AdministratedOrganizationEmployeeBuilder().build();
      administratedEmployee.setName(administratedEmployee.getName());

      expect(administratedEmployee.getRaisedEvents().length).toEqual(1);
    });

    it("should raise event when set passwordHash", () => {
      const administratedEmployee: AdministratedOrganizationEmployee = new
      AdministratedOrganizationEmployeeBuilder().build();
      administratedEmployee.setPasswordHash(administratedEmployee.getPasswordHash());
      expect(administratedEmployee.getRaisedEvents().length).toEqual(1);
    });
  });
});
