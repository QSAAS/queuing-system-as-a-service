import AdministratedOrganizationEmployee from "@app/Command/Domain/Entity/AdministratedOrganizationEmployee";
import AdministratedOrganizationEmployeeBuilder
  from "@tests/Command/Domain/Entity/AdministratedOrganizationEmployeeBuilder";

describe("test AdministratedOrganization Employee", () => {
  const administratedEmployee: AdministratedOrganizationEmployee = new
  AdministratedOrganizationEmployeeBuilder().build();
  describe("Events", () => {
    administratedEmployee.setUsername(administratedEmployee.getUsername());
    it("raise event when update username", () => {
      expect(administratedEmployee.getRaisedEvents().length).toEqual(1);
    });
    administratedEmployee.setName(administratedEmployee.getName());
    it("raise event when update name", () => {
      expect(administratedEmployee.getRaisedEvents().length).toEqual(1);
    });
    administratedEmployee.setPasswordHash(administratedEmployee.getPasswordHash());
    it("should raise event when set passwordHash", () => {
      expect(administratedEmployee.getRaisedEvents().length).toEqual(1);
    });
  });
});
