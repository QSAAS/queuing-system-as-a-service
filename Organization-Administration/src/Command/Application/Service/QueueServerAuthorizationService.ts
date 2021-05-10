import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import QueueServerId from "@app/Command/Domain/ValueObject/QueueServerId";

export default interface QueueServerAuthorizationService{
  /**
   * @throws EmployeeNotAuthorizedError
   * @param organizationEmployeeId
   * @param queueServerId
   */
  ensureEmployeeCanDelete(organizationEmployeeId:OrganizationEmployeeId, queueServerId:QueueServerId):void ;
  /**
   * @throws EmployeeNotAuthorizedError
   * @param organizationEmployeeId
   * @param queueServerId
   */
  ensureEmployeeCanUpdate(organizationEmployeeId:OrganizationEmployeeId, queueServerId:QueueServerId):void ;
  /**
   * @throws EmployeeNotAuthorizedError
   * @param organizationEmployeeId
   */
  ensureEmployeeCanCreate(organizationEmployeeId: OrganizationEmployeeId):void ;
}
