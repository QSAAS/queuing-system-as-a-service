import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import OrganizationEmployeeUpdated from "@app/Command/Domain/Event/OrganizationEmployeeUpdated";
import OrganizationEmployeeAuthorizationService from "@app/Command/Domain/Service/OrganizationEmployeeAuthorizaitonService";

export default class AdministratedOrganizationEmployee extends OrganizationEmployee {
  constructor(
    private admin: OrganizationEmployee,
    administrated: OrganizationEmployee,
    private organizationEmployeeAuthorizationService: OrganizationEmployeeAuthorizationService,
  ) {
    super(
      administrated.getOrganizationEmployeeId(),
      administrated.getOrganizationId(),
      administrated.getName(),
      administrated.getPasswordHash(),
      administrated.getUsername(),
    );
  }

  /**
   * @throws EmployeeNotAuthorizedError
   * @param username
   */
  public setUsername(username: EmployeeUsername) {
    this.organizationEmployeeAuthorizationService.ensureEmployeeCanUpdate(
      this.admin.getOrganizationEmployeeId(),
      this.getOrganizationEmployeeId(),
    );
    this.raiseEvent(new OrganizationEmployeeUpdated(this));
    this.username = username;
  }

  /**
   * @throws EmployeeNotAuthorizedError
   * @param name
   */
  public setName(name: string) {
    this.organizationEmployeeAuthorizationService.ensureEmployeeCanUpdate(
      this.admin.getOrganizationEmployeeId(),
      this.getOrganizationEmployeeId(),
    );
    this.raiseEvent(new OrganizationEmployeeUpdated(this));
    this.name = name;
  }

  /**
   * @throws EmployeeNotAuthorizedError
   * @param passwordHash
   */
  public setPasswordHash(passwordHash: PasswordHash) {
    this.organizationEmployeeAuthorizationService.ensureEmployeeCanUpdate(
      this.admin.getOrganizationEmployeeId(),
      this.getOrganizationEmployeeId(),
    );
    this.raiseEvent(new OrganizationEmployeeUpdated(this));

    this.passwordHash = passwordHash;
  }

  /**
   * @throws EmployeeNotAuthorizedError
   * @param organizationEmployeeId
   */
  public setOrganizationEmployeeId(organizationEmployeeId: OrganizationEmployeeId) {
    this.organizationEmployeeAuthorizationService.ensureEmployeeCanUpdate(
      this.admin.getOrganizationEmployeeId(),
      this.getOrganizationEmployeeId(),
    );
    this.raiseEvent(new OrganizationEmployeeUpdated(this));
    this.organizationEmployeeId = organizationEmployeeId;
  }

  /**
   * @throws EmployeeNotAuthorizedError
   * @param organizationId
   */
  public setOrganizationId(organizationId: OrganizationId) {
    this.organizationEmployeeAuthorizationService.ensureEmployeeCanUpdate(
      this.admin.getOrganizationEmployeeId(),
      this.getOrganizationEmployeeId(),
    );
    this.raiseEvent(new OrganizationEmployeeUpdated(this));
    this.organizationId = organizationId;
  }
}
