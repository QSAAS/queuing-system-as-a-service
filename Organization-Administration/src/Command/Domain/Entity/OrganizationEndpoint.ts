import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";
import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";
import OrganizationEndpointCreated from "@app/Command/Domain/Event/OrganizationEndpointCreated";

export default class OrganizationEndpoint extends AggregateRoot {
  constructor(
    protected id: OrganizationEndpointId,
    protected organizationId: OrganizationId,
    protected name: string,
    protected geolocation: Geolocation,
  ) {
    super();
  }

  static create(
    organizationEndpointId: OrganizationEndpointId,
    organizationId: OrganizationId,
    name: string,
    geolocation: Geolocation,
  ) {
    const endpoint = new OrganizationEndpoint(OrganizationEndpointId.create(), organizationId, name, geolocation);
    endpoint.raiseEvent(new OrganizationEndpointCreated(endpoint));
    return endpoint;
  }

  public getId(): OrganizationEndpointId {
    return this.id;
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
