import OrganizationEmployeeRepository from "@app/Command/Domain/Service/OrganizationEmployeeRepository";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import EmployeeCreateNewQueueServerService from "@app/Command/Domain/Service/EmployeeCreateNewQueueServerService";
import CreateQueueServerRequest from "@app/Command/Application/DataTransferObject/Request/CreateQueueServerRequest";
import CreateQueueServerResponse from "@app/Command/Application/DataTransferObject/Response/CreateQueueServerResponse";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import QueueServerRepository from "@app/Command/Domain/Service/QueueServerRepository";

export default class CreateQueueServerService {
  constructor(
    private employeeRepo: OrganizationEmployeeRepository,
    private queueServerRepository: QueueServerRepository,
    private createService: EmployeeCreateNewQueueServerService,
  ) {}

  async execute(request: CreateQueueServerRequest): Promise<CreateQueueServerResponse> {
    const employee = await this.employeeRepo.getById(OrganizationEmployeeId.from(request.employeeId));
    const queueServer = await this.createService.execute(
      employee,
      OrganizationEndpointId.from(request.endpointId),
      request.queueNodeIds.map((id) => QueueNodeId.from(id)),
    );
    await this.queueServerRepository.save(queueServer);
    return new CreateQueueServerResponse(queueServer.getId().toString());
  }
}
