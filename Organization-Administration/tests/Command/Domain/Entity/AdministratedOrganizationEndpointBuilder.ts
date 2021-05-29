import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEndpointAuthorizationService
  from "@app/Command/Application/Service/OrganizationEndpointAuthorizationService";
import OrganizationEndpointBuilder from "@tests/Command/Domain/Entity/OrganizationEndpointBuilder";
import AdministratedOrganizationEndpoint from "@app/Command/Domain/Entity/AdministratedOrganizationEndpoint";
import OrganizationEmployeeMother from "@tests/Command/Domain/Entity/OrganizationEmployeeMother";

export default class AdministratedOrganizationEndpointBuilder extends OrganizationEndpointBuilder {
  private administrator: OrganizationEmployee = OrganizationEmployeeMother.admin().build();
  private organizationEndpointAuthorizationService: OrganizationEndpointAuthorizationService | undefined;

  public withAdministrator(administrator: OrganizationEmployee): AdministratedOrganizationEndpointBuilder {
    this.administrator = administrator;
    return this;
  }

  public withOrganizationEndpointAuthorizationService(
    organizationEndpointAuthorizationService: OrganizationEndpointAuthorizationService,
  ): AdministratedOrganizationEndpointBuilder {
    this.organizationEndpointAuthorizationService = organizationEndpointAuthorizationService;
    return this;
  }

  public build(): AdministratedOrganizationEndpoint {
    if (!this.organizationEndpointAuthorizationService) {
      throw new TypeError("AdministratedOrganizationEndpoint can't be built with"
        + "undefined OrganizationEndpointAuthorizationService");
    }
    return new AdministratedOrganizationEndpoint(
      this.administrator,
      super.build(),
      this.organizationEndpointAuthorizationService,
    );
  }
}
