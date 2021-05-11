import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEndpointAuthorizationService
  from "@app/Command/Application/Service/OrganizationEndpointAuthorizationService";
import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";
import OrganizationEndpointUpdated from "@app/Command/Domain/Event/OrganizationEndpointUpdated";

export default class AdministratedOrganizationEndpoint extends OrganizationEndpoint {
  private administrator: OrganizationEmployee;
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

  public setName(value: string) {
    this.organizationEndpointAuthorizationService.ensureCanEdit(this.administrator, this);
    this.name = value;
    this.raiseEvent(new OrganizationEndpointUpdated(this));
  }

  public setGeolocation(geolocation: Geolocation) {
    this.organizationEndpointAuthorizationService.ensureCanEdit(this.administrator, this);
    this.geolocation = geolocation;
    this.raiseEvent(new OrganizationEndpointUpdated(this));
  }
}