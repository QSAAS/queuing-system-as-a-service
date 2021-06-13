import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEndpointAuthorizationService
  from "@app/Command/Application/Service/OrganizationEndpointAuthorizationService";
import OrganizationEndpointBuilder from "@tests/Command/Domain/Entity/OrganizationEndpointBuilder";
import AdministratedOrganizationEndpoint from "@app/Command/Domain/Entity/AdministratedOrganizationEndpoint";
import OrganizationEmployeeMother from "@tests/Command/Domain/Entity/OrganizationEmployeeMother";

import PassingOrganizationEndpointAuthorizationService
  from "@tests/Command/Infrastructure/PassingOrganizationEndpointAuthorizationService";

export default class AdministratedOrganizationEndpointBuilder extends OrganizationEndpointBuilder {
  constructor(private administrator: OrganizationEmployee = OrganizationEmployeeMother.admin().build(),
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
