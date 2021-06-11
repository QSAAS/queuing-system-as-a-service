import AuthorizationRuleRepository from "@app/Command/Domain/Service/AuthorizationRuleRepository";
import AuthorizationRuleAuthorizationService from "@app/Command/Domain/Service/AuthorizationRuleAuthorizationService";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import AuthorizationRule from "@app/Command/Domain/Entity/AuthorizationRule";
import AuthorizationRuleDeleted from "@app/Command/Domain/Event/AuthorizationRuleDeleted";

export default class EmployeeDeleteAuthorizationRuleService {
  constructor(
    private ruleRepository: AuthorizationRuleRepository,
    private ruleAuthService: AuthorizationRuleAuthorizationService,

  ) {
  }

  execute(admin: OrganizationEmployee, rule: AuthorizationRule): void {
    this.ruleAuthService.ensureEmployeeCanEdit(admin.getId());
    rule.raiseEvent(new AuthorizationRuleDeleted(rule));
    this.ruleRepository.delete(rule);
  }
}
