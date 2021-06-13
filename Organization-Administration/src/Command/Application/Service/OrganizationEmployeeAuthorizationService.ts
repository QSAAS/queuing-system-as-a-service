import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";

export default interface OrganizationEmployeeAuthorizationService {
  ensureEmployeeCanCreate(organizationEmployeeId: OrganizationEmployeeId):void ;
  ensureEmployeeCanDelete(admin:OrganizationEmployeeId, administrated: OrganizationEmployeeId):void ;
  ensureEmployeeCanUpdate(admin:OrganizationEmployeeId, administrated: OrganizationEmployeeId):void ;
}
