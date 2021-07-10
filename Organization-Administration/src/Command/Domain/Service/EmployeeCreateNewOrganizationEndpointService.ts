import OrganizationEndpointAuthorizationService from "@app/Command/Domain/Service/OrganizationEndpointAuthorizationService";
import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";

export default class EmployeeCreateNewOrganizationEndpointService {
  constructor(private endpointAuthService: OrganizationEndpointAuthorizationService) {}

  async execute(admin: OrganizationEmployee, name: string, location: Geolocation): Promise<OrganizationEndpoint> {
    await this.endpointAuthService.ensureEmployeeCanCreate(admin.getId());
    return OrganizationEndpoint.create(
      OrganizationEndpointId.create(),
      admin.getOrganizationId(),
      name,
      location,
    );
  }
}
