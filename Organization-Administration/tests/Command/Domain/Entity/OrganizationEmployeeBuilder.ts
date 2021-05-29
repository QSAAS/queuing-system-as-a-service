import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import TrialPasswordHash from "@tests/Command/Domain/ValueObject/TrialPasswordHash";
import EmployeeUsernameMother from "@tests/Command/Domain/ValueObject/EmployeeUsernameMother";

export default class OrganizationEmployeeBuilder {
  protected organizationEmployeeId: OrganizationEmployeeId = OrganizationEmployeeId.create();
  protected organizationId : OrganizationId = OrganizationId.create();
  protected name:string = "name";
  protected passwordHash : PasswordHash = TrialPasswordHash.create();
  protected username: EmployeeUsername = EmployeeUsernameMother.complete().build();

  public withName(name : string): OrganizationEmployeeBuilder {
    this.name = name;
    return this;
  }

  public withOrganizationEmployeeId(organizationEmployeeId:OrganizationEmployeeId):this {
    this.organizationEmployeeId = organizationEmployeeId;
    return this;
  }

  public withOrganizationId(organizationId:OrganizationId):OrganizationEmployeeBuilder {
    this.organizationId = organizationId;
    return this;
  }

  public withPasswordHash(passwordHash:PasswordHash):OrganizationEmployeeBuilder {
    this.passwordHash = passwordHash;
    return this;
  }

  public withUsername(username: EmployeeUsername):OrganizationEmployeeBuilder {
    this.username = username;
    return this;
  }

  public build(): OrganizationEmployee {
    return OrganizationEmployee.create(this.organizationEmployeeId,
      this.organizationId, this.name, this.passwordHash, this.username);
  }
}
