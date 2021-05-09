import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEndpointAuthorizationService
  from "@app/Command/Application/Service/OrganizationEndpointAuthorizationService";
import OrganizationEmployeeAuthorizationService
  from "@app/Command/Application/Service/OrganizationEmployeeAuthorizationService";

export default class AdminstratedOrganizationEmployee extends OrganizationEmployee {
  private admin :OrganizationEmployee;
  private organizationEmployeeAuthorizationService : OrganizationEndpointAuthorizationService;
  /// todo fix
  constructor(admin :OrganizationEmployee, administrated: OrganizationEmployee,
    organizationEmployeeAuthorizationService :OrganizationEmployeeAuthorizationService) {
    super(administrated.getOrganizationEmployeeId(), administrated.getOrganizationId(),
      administrated.getName(), administrated.getPasswordHash(), administrated.getUsername());
    this.admin = admin;
    // this.administrated = administrated;
    this.organizationEmployeeAuthorizationService = organizationEmployeeAuthorizationService;
  }
  /// fixme why we need setters while we have them in OrganizationEmployee, should we aggregate it ?
  /// todo when we raise the event, and who raise it ?
}
