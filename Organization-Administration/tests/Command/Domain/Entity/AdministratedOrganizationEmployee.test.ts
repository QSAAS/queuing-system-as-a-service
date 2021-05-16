import AdministratedOrganizationEmployee from "@app/Command/Domain/Entity/AdministratedOrganizationEmployee";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";
import TrialPaswordHash from "@tests/Command/Domain/ValueObject/TrialPaswordHash";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
// eslint-disable-next-line max-len
import { PassingOrganizationEmployeeAuthorizationService } from "@tests/Command/Infrastructure/PassingOrganizationEmployeeAuthorizationService";

describe("test AdministratedOrganization Employee", () => {
  const adminEID: OrganizationEmployeeId = new OrganizationEmployeeId("123");
  const anotherEmployeeEID: OrganizationEmployeeId = new OrganizationEmployeeId("2");
  const adminOID: OrganizationId = new OrganizationId("1");
  const adminPasswordHash : PasswordHash = new TrialPaswordHash("passwordHash");
  const adminUsername : EmployeeUsername = new EmployeeUsername("adminusername");
  const anotherEmployeeUsername : EmployeeUsername = new EmployeeUsername("anotherUsername");
  // const adminPass = new adminPasswordHash();
  const admin: OrganizationEmployee = new OrganizationEmployee(adminEID, adminOID,
    "admin", adminPasswordHash, adminUsername);
  // eslint-disable-next-line max-len
  const passingOrganizationEmployeeAuthorizationService: PassingOrganizationEmployeeAuthorizationService = new PassingOrganizationEmployeeAuthorizationService();
  const anotherEmployee: OrganizationEmployee = new OrganizationEmployee(anotherEmployeeEID,
    adminOID, "another employee", adminPasswordHash, anotherEmployeeUsername);

  describe("set Name", () => {
    // eslint-disable-next-line max-len
    const administratedEmployee: AdministratedOrganizationEmployee = new AdministratedOrganizationEmployee(admin, anotherEmployee, passingOrganizationEmployeeAuthorizationService);
    const newName = "ahmed";
    administratedEmployee.setName(newName);
    it("raise event when update name", () => {
      expect(administratedEmployee.getRaisedEvents().length).toEqual(1);
    });
    it("update name", () => {
      expect(administratedEmployee.getName()).toEqual(newName);
    });
  });
  describe("set userName", () => {
    // eslint-disable-next-line max-len
    const administratedEmployee: AdministratedOrganizationEmployee = new AdministratedOrganizationEmployee(admin, anotherEmployee, passingOrganizationEmployeeAuthorizationService);
    const newUsername: EmployeeUsername = new EmployeeUsername("newUsername");
    administratedEmployee.setUsername(newUsername);
    it("raise event when update username", () => {
      expect(administratedEmployee.getRaisedEvents().length).toEqual(1);
    });
    it("update username", () => {
      expect(administratedEmployee.getName()).toEqual(newUsername);
    });
  });
});
