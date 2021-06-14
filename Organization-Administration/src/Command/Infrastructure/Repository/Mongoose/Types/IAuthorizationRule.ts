export default interface IAuthorizationRule {
  organizationEmployeeId: string,
  resourceId: string | null,
  resourceType: string,
  action: string,
}
