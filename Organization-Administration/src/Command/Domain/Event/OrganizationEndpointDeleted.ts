import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";
import DomainEvent from "@app/Command/Domain/Event/DomainEvent";

export default class OrganizationEndpointDeleted extends DomainEvent {
  constructor(private organizationEndpoint: OrganizationEndpoint) {
    super();
    this.organizationEndpoint = organizationEndpoint;
  }

  public getOrganizationEndpoint(): OrganizationEndpoint {
    return this.organizationEndpoint;
  }
}
