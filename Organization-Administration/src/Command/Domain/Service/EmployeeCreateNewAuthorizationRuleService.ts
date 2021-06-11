import Permission from "@app/Command/Domain/ValueObject/Permission";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import AuthorizationRuleAuthorizationService from "@app/Command/Domain/Service/AuthorizationRuleAuthorizationService";
import AuthorizationRule from "@app/Command/Domain/Entity/AuthorizationRule";
import AuthorizationRuleCreated from "@app/Command/Domain/Event/AuthorizationRuleCreated";

export default class EmployeeCreateNewAuthorizationRuleService {
  constructor(
    private ruleAuthService: AuthorizationRuleAuthorizationService,
  ) {
  }

  public execute(
    admin: OrganizationEmployee,
    employee: OrganizationEmployee,
    permission: Permission,
  ): AuthorizationRule {
    this.ruleAuthService.ensureEmployeeCanEdit(admin.getId());
    const rule = new AuthorizationRule(employee.getId(), permission);
    rule.raiseEvent(new AuthorizationRuleCreated(rule));
    return rule;
  }
}
