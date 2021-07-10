import EmployeeCreateNewAuthorizationRuleService from "@app/Command/Domain/Service/EmployeeCreateNewAuthorizationRuleService";
import FailingAuthorizationRuleAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/FailingAuthorizationRuleAuthorizationService";
import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/Builder/OrganizationEmployeeBuilder";
import PermissionBuilder from "@tests/Command/Domain/ValueObject/Builder/PermissionBuilder";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import PassingAuthorizationRuleAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/PassingAuthorizationRuleAuthorizationService";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";
import AuthorizationRuleCreated from "@app/Command/Domain/Event/AuthorizationRuleCreated";

describe("Authorization rule creation", () => {
  const admin = new OrganizationEmployeeBuilder().build();
  const other = new OrganizationEmployeeBuilder().build();
  const permission = new PermissionBuilder().build();
  it("Raises an exception with the admin doesn't have the permission", () => {
    const failingAuthService = new FailingAuthorizationRuleAuthorizationService();
    const service = new EmployeeCreateNewAuthorizationRuleService(failingAuthService);
    expect(() => {
      service.execute(admin, other, permission);
    }).toThrowError(EmployeeNotAuthorizedError);
  });
  it("Raises an event on created object", () => {
    const passingAuthService = new PassingAuthorizationRuleAuthorizationService();
    const service = new EmployeeCreateNewAuthorizationRuleService(passingAuthService);
    const rule = service.execute(admin, other, permission);
    expect(
      eventsArrayContains(
        rule.getRaisedEvents(),
        AuthorizationRuleCreated,
        (event) =>
          event.getAuthorizationRule().getOrganizationEmployeeId().equals(other.getId()) &&
          event.getAuthorizationRule().getPermission().equals(permission),
      ),
    ).toBeTruthy();
  });
});
