import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";

export default interface OrganizationEmployeeAuthorizationService {
  ensureEmployeeCanCreate(organizationEmployeeId: OrganizationEmployeeId):void ;
  ensureEmployeeCanDelete(organizationEmployeeId:OrganizationEmployeeId):void ;
  ensureEmployeeCanUpdate(organizationEmployeeId:OrganizationEmployeeId):void ;
}
