import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import AdministratedOrganizationEmployee from "@app/Command/Domain/Entity/AdministratedOrganizationEmployee";

import PassingOrganizationEmployeeAuthorizationService
  from "@tests/Command/Infrastructure/PassingOrganizationEmployeeAuthorizationService";

import OrganizationEmployeeMother from "@tests/Command/Domain/Entity/OrganizationEmployeeMother";
import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/OrganizationEmployeeBuilder";
import OrganizationEmployeeAuthorizationService
  from "@app/Command/Domain/Service/OrganizationEmployeeAuthorizaitonService";

export default class AdministratedOrganizationEmployeeBuilder extends OrganizationEmployeeBuilder {
  private admin: OrganizationEmployee = OrganizationEmployeeMother.admin().build() ;
  private administrated: OrganizationEmployee = OrganizationEmployeeMother.employee().build();
  private organizationEmployeeAuthorizationService: OrganizationEmployeeAuthorizationService
  = new PassingOrganizationEmployeeAuthorizationService();

  constructor() {
    super();
    this.administrated = new OrganizationEmployeeBuilder().withOrganizationEmployeeId(this.organizationEmployeeId)
      .withOrganizationId(this.organizationId)
      .withUsername(this.username)
      .withName(this.name)
      .withPasswordHash(this.passwordHash)
      .build();
  }

  public withAdministrated(administrated: OrganizationEmployee): AdministratedOrganizationEmployeeBuilder {
    this.administrated = administrated;
    return this;
  }

  public withAdmin(admin: OrganizationEmployee): AdministratedOrganizationEmployeeBuilder {
    this.admin = admin;
    return this;
  }

  public withOEAuthService(organizationEmployeeAuthorizationService:OrganizationEmployeeAuthorizationService)
    :AdministratedOrganizationEmployeeBuilder {
    this.organizationEmployeeAuthorizationService = organizationEmployeeAuthorizationService;
    return this;
  }

  public build():AdministratedOrganizationEmployee {
    return new AdministratedOrganizationEmployee(this.admin,
      this.administrated, this.organizationEmployeeAuthorizationService);
  }
}
