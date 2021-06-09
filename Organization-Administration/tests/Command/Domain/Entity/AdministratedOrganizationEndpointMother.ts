import AdministratedOrganizationEndpointBuilder
  from "@tests/Command/Domain/Entity/AdministratedOrganizationEndpointBuilder";
import PassingOrganizationEndpointAuthorizationService
  from "@tests/Command/Infrastructure/PassingOrganizationEndpointAuthorizationService";

export default class AdministratedOrganizationEndpointMother {
  public static withPassingAuth(): AdministratedOrganizationEndpointBuilder {
    return new AdministratedOrganizationEndpointBuilder()
      .withOrganizationEndpointAuthorizationService(new PassingOrganizationEndpointAuthorizationService());
  }
}
