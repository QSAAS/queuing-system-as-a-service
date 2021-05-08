import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";

export default class OrganizationEndpointUpdated extends Event {
  private organizationEndpoint: OrganizationEndpoint;

  constructor(type: string, eventInitDict: EventInit, organizationEndpoint: OrganizationEndpoint) {
    super(type, eventInitDict);
    this.organizationEndpoint = organizationEndpoint;
  }

  public getOrganizationEndpoint(): OrganizationEndpoint {
    return this.organizationEndpoint;
  }
}
