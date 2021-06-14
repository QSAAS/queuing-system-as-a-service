import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";
import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";

export default class OrganizationEndpoint extends AggregateRoot {
  constructor(
    protected organizationEndpointId: OrganizationEndpointId,
    protected organizationId: OrganizationId,
    protected name: string,
    protected geolocation: Geolocation,
  ) {
    super();
  }

  public getOrganizationEndpointId(): OrganizationEndpointId {
    return this.organizationEndpointId;
  }

  public getOrganizationId(): OrganizationId {
    return this.organizationId;
  }

  public getName(): string {
    return this.name;
  }

  public getGeolocation(): Geolocation {
    return this.geolocation;
  }
}
