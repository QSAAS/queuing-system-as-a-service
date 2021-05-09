import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEndpointAuthorizationService
  from "@app/Command/Application/Service/OrganizationEndpointAuthorizationService";

export default class AdminstratedOrganizationEmployee {
  private admin :OrganizationEmployee;
  private administrated :OrganizationEmployee;
  private organizationEmployeeAuthorizationService : OrganizationEndpointAuthorizationService;
  constructor(admin :OrganizationEmployee, administrated: OrganizationEmployee,
    organizationEmployeeAuthorizationService :OrganizationEndpointAuthorizationService) {
    this.admin = admin;
    this.administrated = administrated;
    this.organizationEmployeeAuthorizationService = organizationEmployeeAuthorizationService;
  }
  /// fixme why we need setters while we have them in OrganizationEmployee, should we aggregate it ?
  /// todo when we raise the event, and who raise it ?
}
