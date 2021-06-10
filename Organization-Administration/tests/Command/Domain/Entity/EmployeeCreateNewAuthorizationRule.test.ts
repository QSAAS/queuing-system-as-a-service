import EmployeeCreateNewAuthorizationRule from "@app/Command/Domain/Service/EmployeeCreateNewAuthorizationRule";
import FailingAuthorizationRuleAuthorizationService
  from "@tests/Command/Infrastructure/FailingAuthorizationRuleAuthorizationService";
import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/OrganizationEmployeeBuilder";
import PermissionBuilder from "@tests/Command/Domain/ValueObject/PermissionBuilder";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import PassingAuthorizationRuleAuthorizationService
  from "@tests/Command/Infrastructure/PassingAuthorizationRuleAuthorizationService";
import AuthorizationRule from "@app/Command/Domain/Entity/AuthorizationRule";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";
import AuthorizationRuleCreated from "@app/Command/Domain/Event/AuthorizationRuleCreated";

describe("Authorization rule creation", () => {
  const admin = new OrganizationEmployeeBuilder().build();
  const other = new OrganizationEmployeeBuilder().build();
  const permission = new PermissionBuilder().build();
  it("Raises an exception with the admin doesn't have the permission", () => {
    const failingAuthService = new FailingAuthorizationRuleAuthorizationService();
    const service = new EmployeeCreateNewAuthorizationRule(failingAuthService);
    expect(() => {
      service.execute(admin, other, permission);
    }).toThrowError(EmployeeNotAuthorizedError);
  });
  it("Doesn't raise an exception for authorized admins", () => {
    const passingAuthService = new PassingAuthorizationRuleAuthorizationService();
    const service = new EmployeeCreateNewAuthorizationRule(passingAuthService);
    expect(() => {
      const rule = service.execute(admin, other, permission);
      expect(rule).toBeInstanceOf(AuthorizationRule);
    }).not.toThrowError(EmployeeNotAuthorizedError);
  });
  it("Raises an event on created object", () => {
    const passingAuthService = new PassingAuthorizationRuleAuthorizationService();
    const service = new EmployeeCreateNewAuthorizationRule(passingAuthService);
    const rule = service.execute(admin, other, permission);
    eventsArrayContains(rule.getRaisedEvents(), AuthorizationRuleCreated, (event) => (
      event.getAuthorizationRule().getOrganizationEmployeeId().equals(other.getId())
      && event.getAuthorizationRule().getPermission().equals(permission)
    ));
  });
});
