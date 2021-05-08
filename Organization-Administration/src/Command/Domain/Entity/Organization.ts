import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";

export default class Organization extends AggregateRoot {
  protected organizationId: OrganizationId;
  protected name: string;

  constructor(organizationId: OrganizationId, name: string) {
    super();
    this.organizationId = organizationId;
    this.name = name;
  }

  public getOrganizationId(): OrganizationId {
    return this.organizationId;
  }

  public getName(): string {
    return this.name;
  }
}
