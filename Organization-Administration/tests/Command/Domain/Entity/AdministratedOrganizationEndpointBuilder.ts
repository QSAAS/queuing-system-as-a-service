import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEndpointAuthorizationService
  from "@app/Command/Application/Service/OrganizationEndpointAuthorizationService";
import OrganizationEndpointBuilder from "@tests/Command/Domain/Entity/OrganizationEndpointBuilder";
import AdministratedOrganizationEndpoint from "@app/Command/Domain/Entity/AdministratedOrganizationEndpoint";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";
import TrialPaswordHash from "@tests/Command/Domain/ValueObject/TrialPaswordHash";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";

export default class AdministratedOrganizationEndpointBuilder extends OrganizationEndpointBuilder {
  private adminEID: OrganizationEmployeeId = new OrganizationEmployeeId("123");
  private adminOID: OrganizationId = new OrganizationId("1");
  private adminPasswordHash : PasswordHash = new TrialPaswordHash("passwordHash");
  private adminUsername : EmployeeUsername = new EmployeeUsername("adminusername");
  // eslint-disable-next-line max-len
  private administrator: OrganizationEmployee = new OrganizationEmployee(this.adminEID, this.adminOID, "admin", this.adminPasswordHash, this.adminUsername);
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
