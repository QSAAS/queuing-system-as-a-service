import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";
import DomainEvent from "@app/Command/Domain/Event/DomainEvent";

export default class OrganizationEndpointUpdated extends DomainEvent {
  private organizationEndpoint: OrganizationEndpoint;

  constructor(organizationEndpoint: OrganizationEndpoint) {
    super();
    this.organizationEndpoint = organizationEndpoint;
  }

  public getOrganizationEndpoint(): OrganizationEndpoint {
    return this.organizationEndpoint;
  }
}
