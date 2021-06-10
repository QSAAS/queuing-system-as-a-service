import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import OrganizationEmployee, { EmployeeUsername, PasswordHash } from "@app/Command/Domain/Entity/OrganizationEmployee";

export default class OrganizationEmployeeBuilder {
  private id: OrganizationEmployeeId;
  private organizationId: OrganizationId;
  private username: EmployeeUsername;
  private passwordHash: PasswordHash;
  private name: string;

  constructor() {
    this.id = OrganizationEmployeeId.create();
    this.organizationId = OrganizationId.create();
    // TODO: Edit after Hanafy merges
    this.username = new EmployeeUsername();
    this.passwordHash = new PasswordHash();
    this.name = "::name::";
  }

  public withId(id: OrganizationId) {
    this.id = id;
    return this;
  }

  public withOrganizationId(organizationId: OrganizationId) {
    this.organizationId = organizationId;
    return this;
  }

  public withUsername(username: EmployeeUsername) {
    this.username = username;
    return this;
  }

  public withName(name: string) {
    this.name = name;
    return this;
  }

  public build(): OrganizationEmployee {
    return new OrganizationEmployee(
      this.id, this.organizationId, this.username, this.passwordHash, this.name,
    );
  }
}
