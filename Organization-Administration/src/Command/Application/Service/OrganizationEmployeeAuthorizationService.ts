import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";

export default interface OrganizationEmployeeAuthorizationService {
  /**
   * @throws EmployeeNotAuthorizedError
   * @param admin
   */
  ensureEmployeeCanCreate(admin: OrganizationEmployeeId):void ;
  /**
   * @throws EmployeeNotAuthorizedError
   * @param admin
   * @param administrated
   */
  ensureEmployeeCanDelete(admin:OrganizationEmployeeId, administrated: OrganizationEmployeeId):void ;
  /**
   * @throws EmployeeNotAuthorizedError
   * @param admin
   * @param administrated
   */
  ensureEmployeeCanUpdate(admin:OrganizationEmployeeId, administrated: OrganizationEmployeeId):void ;
}
