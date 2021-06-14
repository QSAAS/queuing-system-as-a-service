import DomainEvent from "@app/Command/Domain/Event/DomainEvent";
import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";

export default class OrganizationEndpointCreated extends DomainEvent {
  constructor(private endpoint: OrganizationEndpoint) {
    super();
  }

  public getEndpoint(): OrganizationEndpoint {
    return this.endpoint;
  }
}
