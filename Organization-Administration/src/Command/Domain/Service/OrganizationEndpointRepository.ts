import OrganizationEndpoint from "../Entity/OrganizationEndpoint";

export default interface OrganizationEndpointRepository {
  save(endpoint: OrganizationEndpoint): void

  delete(endpoint: OrganizationEndpoint): void
}
