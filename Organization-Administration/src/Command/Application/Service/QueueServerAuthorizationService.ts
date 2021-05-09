import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import QueueServerId from "@app/Command/Domain/ValueObject/QueueServerId";

export default interface QueueServerAuthorizationService{
  ensureEmployeeCanCreate(organizationEmployeeId: OrganizationEmployeeId):void ;
  ensureEmployeeCanDelete(organizationEmployeeId:OrganizationEmployeeId, queueServerId:QueueServerId):void ;
  ensureEmployeeCanUpdate(organizationEmployeeId:OrganizationEmployeeId, queueServerId:QueueServerId):void ;
}
