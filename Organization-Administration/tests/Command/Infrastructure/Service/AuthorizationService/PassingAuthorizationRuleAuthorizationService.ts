import AuthorizationRuleAuthorizationService from "@app/Command/Domain/Service/AuthorizationRuleAuthorizationService";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";

export default class PassingAuthorizationRuleAuthorizationService implements AuthorizationRuleAuthorizationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ensureEmployeeCanEdit(employeeId: OrganizationEmployeeId): void {}
}
