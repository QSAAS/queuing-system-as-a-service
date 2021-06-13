import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeAuthorizationService
  from "@app/Command/Application/Service/OrganizationEmployeeAuthorizationService";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import OrganizationEmployeeUpdated from "@app/Command/Domain/Event/OrganizationEmployeeUpdated";

export default class AdministratedOrganizationEmployee extends OrganizationEmployee {
  constructor(private admin :OrganizationEmployee, administrated: OrganizationEmployee,
    private organizationEmployeeAuthorizationService :OrganizationEmployeeAuthorizationService) {
    super(administrated.getOrganizationEmployeeId(), administrated.getOrganizationId(),
      administrated.getName(), administrated.getPasswordHash(), administrated.getUsername());
    this.admin = admin;
    this.organizationEmployeeAuthorizationService = organizationEmployeeAuthorizationService;
  }

  public setUsername(username: EmployeeUsername) {
    this.raiseEvent(new OrganizationEmployeeUpdated(this));
    this.username = username;
  }

  public setName(name:string) {
    this.raiseEvent(new OrganizationEmployeeUpdated(this));
    this.name = name;
  }

  public setPasswordHash(passwordHash:PasswordHash) {
    this.raiseEvent(new OrganizationEmployeeUpdated(this));

    this.passwordHash = passwordHash;
  }

  public setOrganizationEmployeeId(organizationEmployeeId:OrganizationEmployeeId) {
    this.raiseEvent(new OrganizationEmployeeUpdated(this));
    this.organizationEmployeeId = organizationEmployeeId;
  }

  public setOrganizationId(organizationId:OrganizationId) {
    this.raiseEvent(new OrganizationEmployeeUpdated(this));
    this.organizationId = organizationId;
  }
}
