import AdministratedOrganizationEndpointBuilder from "@tests/Command/Domain/Entity/Builder/AdministratedOrganizationEndpointBuilder";
import PassingOrganizationEndpointAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/PassingOrganizationEndpointAuthorizationService";
import FailingOrganizationEndpointAuthorizationService from "@tests/Command/Infrastructure/Service/AuthorizationService/FailingOrganizationEndpointAuthorizationService";

export default class AdministratedOrganizationEndpointMother {
  public static withPassingAuth(): AdministratedOrganizationEndpointBuilder {
    return new AdministratedOrganizationEndpointBuilder().withOrganizationEndpointAuthorizationService(
      new PassingOrganizationEndpointAuthorizationService(),
    );
  }

  public static withFailingAuth(): AdministratedOrganizationEndpointBuilder {
    return new AdministratedOrganizationEndpointBuilder().withOrganizationEndpointAuthorizationService(
      new FailingOrganizationEndpointAuthorizationService(),
    );
  }
}
