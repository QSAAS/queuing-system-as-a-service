import OrganizationEndpointAuthorizationService
  from "@app/Command/Application/Service/OrganizationEndpointAuthorizationService";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import AdministratedOrganizationEndpoint from "@app/Command/Domain/Entity/AdministratedOrganizationEndpoint";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";

export default class FailingOrganizationEndpointAuthorizationService
implements OrganizationEndpointAuthorizationService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ensureCanEdit(organizationEmployee: OrganizationEmployee,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    administratedOrganizationEndpoint: AdministratedOrganizationEndpoint) {
    throw new EmployeeNotAuthorizedError();
  }
}
