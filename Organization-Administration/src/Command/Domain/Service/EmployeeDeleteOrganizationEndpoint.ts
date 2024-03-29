import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEndpointRepository from "@app/Command/Domain/Service/OrganizationEndpointRepository";
import OrganizationEndpointAuthorizationService from "@app/Command/Domain/Service/OrganizationEndpointAuthorizationService";
import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";
import OrganizationEndpointDeleted from "@app/Command/Domain/Event/OrganizationEndpointDeleted";

export default class EmployeeDeleteOrganizationEndpointService {
  constructor(
    private endpointRepository: OrganizationEndpointRepository,
    private endpointAuthService: OrganizationEndpointAuthorizationService,
  ) {}

  async execute(admin: OrganizationEmployee, endpoint: OrganizationEndpoint): Promise<void> {
    this.endpointAuthService.ensureEmployeeCanDelete(admin.getId(), endpoint.getId());
    endpoint.raiseEvent(new OrganizationEndpointDeleted(endpoint));
    await this.endpointRepository.delete(endpoint);
  }
}
