import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";

export default class Organization extends AggregateRoot {
  constructor(protected organizationId: OrganizationId, protected name: string) {
    super();
  }

  public getOrganizationId(): OrganizationId {
    return this.organizationId;
  }

  public getName(): string {
    return this.name;
  }
}
