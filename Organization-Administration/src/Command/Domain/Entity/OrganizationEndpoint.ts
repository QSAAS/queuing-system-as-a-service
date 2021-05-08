import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";

export default class OrganizationEndpoint {
  protected organizationEndpointId: OrganizationEndpointId;
  protected organizationId: OrganizationId;
  protected name: string;
  protected geolocation: Geolocation;

  constructor(organizationEndpointId: OrganizationEndpointId, organizationId: OrganizationId, name: string,
    geolocation: Geolocation) {
    this.organizationEndpointId = organizationEndpointId;
    this.organizationId = organizationId;
    this.name = name;
    this.geolocation = geolocation;
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
