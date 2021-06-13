import AdministratedOrganizationEndpointBuilder
  from "@tests/Command/Domain/Entity/AdministratedOrganizationEndpointBuilder";
import PassingOrganizationEndpointAuthorizationService
  from "@tests/Command/Infrastructure/PassingOrganizationEndpointAuthorizationService";
import FailingOrganizationEndpointAuthorizationService
  from "@tests/Command/Infrastructure/FailingOrganizationEndpointAuthorizationService";

export default class AdministratedOrganizationEndpointMother {
  public static withPassingAuth(): AdministratedOrganizationEndpointBuilder {
    return new AdministratedOrganizationEndpointBuilder()
      .withOrganizationEndpointAuthorizationService(new PassingOrganizationEndpointAuthorizationService());
  }

  public static withFailingAuth(): AdministratedOrganizationEndpointBuilder {
    return new AdministratedOrganizationEndpointBuilder()
      .withOrganizationEndpointAuthorizationService(new FailingOrganizationEndpointAuthorizationService());
  }
}
