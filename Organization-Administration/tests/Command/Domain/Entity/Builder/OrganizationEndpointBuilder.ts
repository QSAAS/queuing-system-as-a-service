import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";
import GeolocationMother from "@tests/Command/Domain/ValueObject/Mother/GeolocationMother";
import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";

export default class OrganizationEndpointBuilder {
  constructor(
    protected organizationEndpointId: OrganizationEndpointId = OrganizationEndpointId.from("::id::"),
    protected organizationId: OrganizationId = OrganizationId.from("::id::"),
    protected name: string = "::name::",
    protected geolocation: Geolocation = GeolocationMother.complete().build(),
  ) {}

  public withOrganizationEndpointId(organizationEndpointId: OrganizationEndpointId): OrganizationEndpointBuilder {
    this.organizationEndpointId = organizationEndpointId;
    return this;
  }

  public withOrganizationId(organizationId: OrganizationId): OrganizationEndpointBuilder {
    this.organizationId = organizationId;
    return this;
  }

  public withName(name: string): OrganizationEndpointBuilder {
    this.name = name;
    return this;
  }

  public withGeolocation(geolocation: Geolocation): OrganizationEndpointBuilder {
    this.geolocation = geolocation;
    return this;
  }

  public build(): OrganizationEndpoint {
    return new OrganizationEndpoint(
      this.organizationEndpointId,
      this.organizationEndpointId,
      this.name,
      this.geolocation,
    );
  }
}
