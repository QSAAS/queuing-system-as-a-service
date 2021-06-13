import OrganizationEndpoint from "../Entity/OrganizationEndpoint";

export default interface OrganizationEndpointRepository {
  save(endpoint: OrganizationEndpoint): Promise<void>

  delete(endpoint: OrganizationEndpoint): Promise<void>
}
