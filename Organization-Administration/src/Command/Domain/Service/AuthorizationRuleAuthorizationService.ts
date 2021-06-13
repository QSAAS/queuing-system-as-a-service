import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";

export default interface AuthorizationRuleAuthorizationService {
  ensureEmployeeCanEdit(employeeId: OrganizationEmployeeId): void;
}
