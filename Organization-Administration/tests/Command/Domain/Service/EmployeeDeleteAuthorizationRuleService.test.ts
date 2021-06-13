import EmployeeDeleteAuthorizationRuleService from "@app/Command/Domain/Service/EmployeeDeleteAuthorizationRuleService";
import MockAuthorizationRuleRepository
  from "@tests/Command/Infrastructure/Repository/MockAuthorizationRuleRepository";
import AuthorizationRuleBuilder from "@tests/Command/Domain/Entity/AuthorizationRuleBuilder";
import FailingAuthorizationRuleAuthorizationService
  from "@tests/Command/Infrastructure/FailingAuthorizationRuleAuthorizationService";
import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/OrganizationEmployeeBuilder";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import PassingAuthorizationRuleAuthorizationService
  from "@tests/Command/Infrastructure/PassingAuthorizationRuleAuthorizationService";
import AuthorizationRuleNotFound from "@app/Command/Domain/Error/AuthorizationRuleNotFound";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";
import AuthorizationRuleDeleted from "@app/Command/Domain/Event/AuthorizationRuleDeleted";

describe("Employee delete authorization rule", () => {
  const rule = new AuthorizationRuleBuilder().build();
  const admin = new OrganizationEmployeeBuilder().build();

  it("raises an exception when admin is not authorized", async () => {
    const repo = new MockAuthorizationRuleRepository([rule], []);
    const failingAuthService = new FailingAuthorizationRuleAuthorizationService();
    const service = new EmployeeDeleteAuthorizationRuleService(repo, failingAuthService);
    await expect(service.execute(admin, rule)).rejects.toBeInstanceOf(EmployeeNotAuthorizedError);
  });

  it("removes rule from repository", async () => {
    const repo = new MockAuthorizationRuleRepository([rule], []);
    const passingAuthService = new PassingAuthorizationRuleAuthorizationService();
    const service = new EmployeeDeleteAuthorizationRuleService(repo, passingAuthService);
    await service.execute(admin, rule);
    await expect(repo.getByEmployeeAndPermission(rule.getOrganizationEmployeeId(), rule.getPermission()))
      .rejects.toBeInstanceOf(AuthorizationRuleNotFound);
  });

  it("publishes an event for deleted authorization services", async () => {
    const repo = new MockAuthorizationRuleRepository([rule], []);
    const passingAuthService = new PassingAuthorizationRuleAuthorizationService();
    const service = new EmployeeDeleteAuthorizationRuleService(repo, passingAuthService);
    await service.execute(admin, rule);
    expect(
      eventsArrayContains(repo.getPublishedEvents(), AuthorizationRuleDeleted,
        (event) => (event.getAuthorizationRule().equals(rule))),
    );
  });
});
