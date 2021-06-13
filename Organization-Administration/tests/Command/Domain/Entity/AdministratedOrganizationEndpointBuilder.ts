import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEndpointBuilder from "@tests/Command/Domain/Entity/OrganizationEndpointBuilder";
import AdministratedOrganizationEndpoint from "@app/Command/Domain/Entity/AdministratedOrganizationEndpoint";
import PassingOrganizationEndpointAuthorizationService
  from "@tests/Command/Infrastructure/PassingOrganizationEndpointAuthorizationService";
import OrganizationEndpointAuthorizationService
  from "@app/Command/Domain/Service/OrganizationEndpointAuthorizationService";
import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/OrganizationEmployeeBuilder";

export default class AdministratedOrganizationEndpointBuilder extends OrganizationEndpointBuilder {
  constructor(private administrator: OrganizationEmployee = new OrganizationEmployeeBuilder().build(),
    private organizationEndpointAuthorizationService: OrganizationEndpointAuthorizationService
    = new PassingOrganizationEndpointAuthorizationService()) {
    super();
  }

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
    return new AdministratedOrganizationEndpoint(
      this.administrator,
      super.build(),
      this.organizationEndpointAuthorizationService,
    );
  }
}
