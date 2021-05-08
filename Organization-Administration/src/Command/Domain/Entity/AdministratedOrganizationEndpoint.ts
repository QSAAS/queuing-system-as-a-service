import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEndpointAuthorizationService
  from "@app/Command/Application/Service/OrganizationEndpointAuthorizationService";

export default class AdministratedOrganizationEndpoint extends OrganizationEndpoint {
  private administrator: OrganizationEmployee;
  // TODO: added by me 3ashan la2etha fel constructor, not sure what this is
  private organizationEndpointAuthorizationService: OrganizationEndpointAuthorizationService;

  constructor(administrator: OrganizationEmployee, organizationEndpoint: OrganizationEndpoint,
    organizationEndpointAuthorizationService: OrganizationEndpointAuthorizationService) {
    super(organizationEndpoint.getOrganizationEndpointId(),
      organizationEndpoint.getOrganizationId(),
      organizationEndpoint.getName(),
      organizationEndpoint.getGeolocation());
    this.organizationEndpointAuthorizationService = organizationEndpointAuthorizationService;
    this.administrator = administrator;
  }

  public getAdministrator(): OrganizationEmployee {
    return this.administrator;
  }

  public getOrganizationEndpointAuthorizationService(): OrganizationEndpointAuthorizationService {
    return this.organizationEndpointAuthorizationService;
  }
}
