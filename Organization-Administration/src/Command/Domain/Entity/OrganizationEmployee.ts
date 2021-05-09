import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import DomainEvent from "@app/Command/Domain/Event/DomainEvent";
import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import OrganizationEmployeeId from "../ValueObject/OrganizationEmployeeId";

interface ConstructorParams {
  organizationEmployeeId: OrganizationEmployeeId;
  organizationId: OrganizationId;
  name: String;
  passwordHash: PasswordHash;
  username: EmployeeUsername;
}

export default class OrganizationEmployee extends AggregateRoot {
  private organizationEmployeeId: OrganizationEmployeeId;
  private organizationId : OrganizationId;
  private name:String;
  private passwordHash : PasswordHash;
  private username: EmployeeUsername;

  constructor({
    organizationEmployeeId, organizationId, name, passwordHash,
    username,
  }: ConstructorParams) {
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

  public getName(): String {
    return this.name;
  }

  public setOrganizationEmployeeId(value: OrganizationEmployeeId) {
    this.organizationEmployeeId = value;
  }

  public setOrganizationId(value: OrganizationId) {
    this.organizationId = value;
  }

  public setName(value: String) {
    this.name = value;
  }

  public setPasswordHash(passwordHash: PasswordHash) {
    this.passwordHash = passwordHash;
  }

  public getPasswordHash():PasswordHash {
    return this.passwordHash;
  }

  public getUsername():EmployeeUsername {
    return this.username;
  }

  public setUsername(username: EmployeeUsername){
    this.username = username;
  }
}
