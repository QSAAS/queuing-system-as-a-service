import CreateOrganizationEndpointResponse from "@app/Command/Application/DataTransferObject/Response/CreateOrganizationEndpointResponse";
import CreateOrganizationEndpointRequest from "@app/Command/Application/DataTransferObject/Request/CreateOrganizationEndpointRequest";
import EmployeeCreateNewOrganizationEndpointService from "@app/Command/Domain/Service/EmployeeCreateNewOrganizationEndpointService";
import OrganizationEmployeeRepository from "@app/Command/Domain/Service/OrganizationEmployeeRepository";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import GeolocationTransformer from "@app/Command/Application/Transformer/GeolocationTransformer";
import OrganizationEndpointRepository from "@app/Command/Domain/Service/OrganizationEndpointRepository";

export default class CreateOrganizationEndpoint {
  constructor(
    private employeeRepo: OrganizationEmployeeRepository,
    private geolocationTransformer: GeolocationTransformer,
    private createService: EmployeeCreateNewOrganizationEndpointService,
    private endpointRepo: OrganizationEndpointRepository,
  ) {}

  async execute(request: CreateOrganizationEndpointRequest): Promise<CreateOrganizationEndpointResponse> {
    const admin = await this.employeeRepo.getById(OrganizationEmployeeId.from(request.adminId));
    const geolocation = this.geolocationTransformer.toObject(request.geolocation);
    const endpoint = this.createService.execute(admin, request.name, geolocation);
    await this.endpointRepo.save(endpoint);
    return new CreateOrganizationEndpointResponse(endpoint.getId().toString());
  }
}
