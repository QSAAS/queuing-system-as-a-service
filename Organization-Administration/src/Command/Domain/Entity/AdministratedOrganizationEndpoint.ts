import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";
import OrganizationEndpointUpdated from "@app/Command/Domain/Event/OrganizationEndpointUpdated";
import OrganizationEndpointAuthorizationService from "@app/Command/Domain/Service/OrganizationEndpointAuthorizationService";

export default class AdministratedOrganizationEndpoint extends OrganizationEndpoint {
  constructor(
    private administrator: OrganizationEmployee,
    organizationEndpoint: OrganizationEndpoint,
    private organizationEndpointAuthorizationService: OrganizationEndpointAuthorizationService,
  ) {
    super(
      organizationEndpoint.getId(),
      organizationEndpoint.getOrganizationId(),
      organizationEndpoint.getName(),
      organizationEndpoint.getGeolocation(),
    );
  }

  public getAdministrator(): OrganizationEmployee {
    return this.administrator;
  }

  public setName(value: string) {
    this.organizationEndpointAuthorizationService.ensureEmployeeCanUpdate(this.administrator.getId(), this.getId());
    this.name = value;
    this.raiseEvent(new OrganizationEndpointUpdated(this));
  }

  public setGeolocation(geolocation: Geolocation) {
    this.organizationEndpointAuthorizationService.ensureEmployeeCanUpdate(this.administrator.getId(), this.getId());
    this.geolocation = geolocation;
    this.raiseEvent(new OrganizationEndpointUpdated(this));
  }
}
