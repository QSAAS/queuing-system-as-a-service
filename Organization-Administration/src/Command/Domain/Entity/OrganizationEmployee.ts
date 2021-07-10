import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import OrganizationEmployeeId from "../ValueObject/OrganizationEmployeeId";

export default class OrganizationEmployee extends AggregateRoot {
  constructor(
    protected id: OrganizationEmployeeId,
    protected organizationId: OrganizationId,
    protected name: string,
    protected passwordHash: PasswordHash,
    protected username: EmployeeUsername,
  ) {
    super();
  }

  public getOrganizationId(): OrganizationId {
    return this.organizationId;
  }

  public getName(): string {
    return this.name;
  }

  public getPasswordHash(): PasswordHash {
    return this.passwordHash;
  }

  public getUsername(): EmployeeUsername {
    return this.username;
  }

  public getId(): OrganizationEmployeeId {
    return this.id;
  }
}
