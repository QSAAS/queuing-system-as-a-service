import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEndpointAuthorizationService
  from "@app/Command/Application/Service/OrganizationEndpointAuthorizationService";
import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";
import OrganizationEndpointUpdated from "@app/Command/Domain/Event/OrganizationEndpointUpdated";

export default class AdministratedOrganizationEndpoint extends OrganizationEndpoint {
  constructor(private administrator: OrganizationEmployee,
    organizationEndpoint: OrganizationEndpoint,
    private organizationEndpointAuthorizationService: OrganizationEndpointAuthorizationService) {
    super(organizationEndpoint.getOrganizationEndpointId(),
      organizationEndpoint.getOrganizationId(),
      organizationEndpoint.getName(),
      organizationEndpoint.getGeolocation());
  }

  public getAdministrator(): OrganizationEmployee {
    return this.administrator;
  }

  public setName(value: string) {
    this.organizationEndpointAuthorizationService.ensureEmployeeCanEdit(this.administrator.getId(),
      this.getOrganizationEndpointId());
    this.name = value;
    this.raiseEvent(new OrganizationEndpointUpdated(this));
  }

  public setGeolocation(geolocation: Geolocation) {
    this.organizationEndpointAuthorizationService.ensureEmployeeCanEdit(this.administrator.getId(),
      this.getOrganizationEndpointId());
    this.geolocation = geolocation;
    this.raiseEvent(new OrganizationEndpointUpdated(this));
  }
}
