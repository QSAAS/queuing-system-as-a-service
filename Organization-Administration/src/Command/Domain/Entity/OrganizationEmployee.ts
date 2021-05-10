import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import DomainEvent from "@app/Command/Domain/Event/DomainEvent";
import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import OrganizationEmployeeId from "../ValueObject/OrganizationEmployeeId";

/// todo why this has protected when we don't extend it, we aggregate use it
export default class OrganizationEmployee extends AggregateRoot {
  protected organizationEmployeeId: OrganizationEmployeeId;
  protected organizationId : OrganizationId;
  protected name:string;
  protected passwordHash : PasswordHash;
  protected username: EmployeeUsername;

  constructor(organizationEmployeeId: OrganizationEmployeeId,
    organizationId: OrganizationId, name:string, passwordHash: PasswordHash, username:EmployeeUsername) {
    super();
    this.name = name;
    this.organizationEmployeeId = organizationEmployeeId;
    this.organizationId = organizationId;
    this.passwordHash = passwordHash;
    this.username = username;
  }

  getRaisedEvents(): DomainEvent[] {
    return super.getRaisedEvents();
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

  public getPasswordHash():PasswordHash {
    return this.passwordHash;
  }

  public getUsername():EmployeeUsername {
    return this.username;
  }
}
