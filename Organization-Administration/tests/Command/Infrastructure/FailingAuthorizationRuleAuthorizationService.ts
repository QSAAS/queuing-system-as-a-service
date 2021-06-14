import AuthorizationRuleAuthorizationService from "@app/Command/Domain/Service/AuthorizationRuleAuthorizationService";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";

export default class FailingAuthorizationRuleAuthorizationService implements AuthorizationRuleAuthorizationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ensureEmployeeCanEdit(employeeId: OrganizationEmployeeId): void {
    throw new EmployeeNotAuthorizedError();
  }
}
