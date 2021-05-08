import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";

export default class OrganizationEndpoint {
  private organizationEndpointId: OrganizationEndpointId;
  private organizationId: OrganizationId;
  private name: string;
  private geolocation: Geolocation;

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
  // TODO: Added here instead of AdministratedOrganizationEndpoint since the fields are private
  // tell me whether to keep the setters here or make the fields protected

  public setName(value: string) {
    this.name = value;
  }

  public setGeolocation(geolocation: Geolocation) {
    this.geolocation = geolocation;
  }
}
