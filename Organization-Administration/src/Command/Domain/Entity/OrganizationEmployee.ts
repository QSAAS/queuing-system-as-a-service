import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import OrganizationEmployeeId from "../ValueObject/OrganizationEmployeeId";

export default class OrganizationEmployee extends AggregateRoot {
  constructor(private readonly organizationEmployeeId: OrganizationEmployeeId,
    private readonly organizationId: OrganizationId,
    private readonly name: string,
    private readonly passwordHash: PasswordHash,
    private readonly username: EmployeeUsername) {
    super();
  }

  public getOrganizationEmployeeId(): OrganizationEmployeeId {
    return this.organizationEmployeeId;
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
    return this.organizationEmployeeId;
  }
}
