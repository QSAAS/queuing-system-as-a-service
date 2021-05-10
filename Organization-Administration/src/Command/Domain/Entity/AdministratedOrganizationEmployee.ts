import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEndpointAuthorizationService
  from "@app/Command/Application/Service/OrganizationEndpointAuthorizationService";
import OrganizationEmployeeAuthorizationService
  from "@app/Command/Application/Service/OrganizationEmployeeAuthorizationService";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";

export default class AdministratedOrganizationEmployee extends OrganizationEmployee {
  private admin :OrganizationEmployee;
  private organizationEmployeeAuthorizationService : OrganizationEndpointAuthorizationService;

  constructor(admin :OrganizationEmployee, administrated: OrganizationEmployee,
    organizationEmployeeAuthorizationService :OrganizationEmployeeAuthorizationService) {
    super(administrated.getOrganizationEmployeeId(), administrated.getOrganizationId(),
      administrated.getName(), administrated.getPasswordHash(), administrated.getUsername());
    this.admin = admin;
    // this.administrated = administrated;
    this.organizationEmployeeAuthorizationService = organizationEmployeeAuthorizationService;
  }

  public setUsername(username: EmployeeUsername) {
    this.username = username;
  }

  public setName(name:string) {
    this.name = name;
  }

  public setPasswordHash(passwordHash:PasswordHash) {
    this.passwordHash = passwordHash;
  }

  public setOrganizationEmployeeId(organizationEmployeeId:OrganizationEmployeeId) {
    this.organizationEmployeeId = organizationEmployeeId;
  }

  public setOrganizationId(organizationId:OrganizationId){
    this.organizationId = organizationId;
  }

  /// fixme why we need setters while we have them in OrganizationEmployee, should we aggregate it ?
  /// todo when we raise the event, and who raise it ?
}
/// todo remove setters from super, add them here, raise event with every set
