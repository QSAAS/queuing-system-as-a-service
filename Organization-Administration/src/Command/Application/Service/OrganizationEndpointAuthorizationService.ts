import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import AdministratedOrganizationEndpoint from "@app/Command/Domain/Entity/AdministratedOrganizationEndpoint";

export default interface OrganizationEndpointAuthorizationService {
  ensureCanEdit(organizationEmployee: OrganizationEmployee,
    administratedOrganizationEndpoint: AdministratedOrganizationEndpoint): void;
}
