import OrganizationEndpointAuthorizationService
  from "@app/Command/Domain/Service/OrganizationEndpointAuthorizationService";
import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import OrganizationEndpointCreated from "@app/Command/Domain/Event/OrganizationEndpointCreated";

export default class EmployeeCreateNewOrganizationEndpointService {
  constructor(
    private endpointAuthService: OrganizationEndpointAuthorizationService,
  ) {
  }

  execute(admin: OrganizationEmployee, name: string, location: Geolocation): OrganizationEndpoint {
    this.endpointAuthService.ensureEmployeeCanCreate(admin.getOrganizationId());
    const endpoint = new OrganizationEndpoint(
      OrganizationEndpointId.create(),
      admin.getOrganizationId(),
      name,
      location,
    );
    endpoint.raiseEvent(new OrganizationEndpointCreated(endpoint));
    return endpoint;
  }
}
