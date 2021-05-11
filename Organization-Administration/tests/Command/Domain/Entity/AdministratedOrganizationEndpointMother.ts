// eslint-disable-next-line max-classes-per-file
import AdministratedOrganizationEndpoint from "@app/Command/Domain/Entity/AdministratedOrganizationEndpoint";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEndpointAuthorizationService
  from "@app/Command/Application/Service/OrganizationEndpointAuthorizationService";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import AdministratedOrganizationEndpointBuilder
  from "@tests/Command/Domain/Entity/AdministratedOrganizationEndpointBuilder";

class PassingOrganizationEndpointAuthorizationService implements OrganizationEndpointAuthorizationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureCanEdit(organizationEmployee: OrganizationEmployee,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    administratedOrganizationEndpoint: AdministratedOrganizationEndpoint) {}
}

class FailingOrganizationEndpointAuthorizationService implements OrganizationEndpointAuthorizationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureCanEdit(organizationEmployee: OrganizationEmployee,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    administratedOrganizationEndpoint: AdministratedOrganizationEndpoint) {
    throw new EmployeeNotAuthorizedError();
  }
}

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
