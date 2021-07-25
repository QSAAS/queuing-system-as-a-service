import OrganizationEmployeeRepository from "@app/Command/Domain/Service/OrganizationEmployeeRepository";
import EmployeeCreateNewQueueNodeService from "@app/Command/Domain/Service/EmployeeCreateNewQueueNodeService";
import QueueNodeRepository from "@app/Command/Domain/Service/QueueNodeRepository";
import CreateQueueNodeRequest from "@app/Command/Application/DataTransferObject/Request/CreateQueueNodeRequest";
import CreateQueueNodeResponse from "@app/Command/Application/DataTransferObject/Response/CreateQueueNodeResponse";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import MetadataSpecificationFieldDtoTransformer
  from "@app/Command/Application/Transformer/MetadataSpecificationFieldDtoTransformer";
import TimeSpanDtoTransformer from "@app/Command/Application/Transformer/TimeSpanDtoTransformer";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";

export default class CreateQueueNodeService {
  constructor(
    private employeeRepo: OrganizationEmployeeRepository,
    private queueNodeRepo: QueueNodeRepository,
    private createService: EmployeeCreateNewQueueNodeService,
    private metaFieldTransformer: MetadataSpecificationFieldDtoTransformer,
    private timeSpanTransformer: TimeSpanDtoTransformer,
  ) {}

  async execute(request: CreateQueueNodeRequest): Promise<CreateQueueNodeResponse> {
    const admin = await this.employeeRepo.getById(OrganizationEmployeeId.from(request.adminId));

    const metaSpecs = new MetadataSpecification(
      request.metaSpecs.map((field) => this.metaFieldTransformer.toObject(field))
    );
    const timeSpan = this.timeSpanTransformer.toObject(request.timeSpan);
    const queueNode = await this.createService.execute(admin, OrganizationEndpointId.from(request.endpointId), metaSpecs, timeSpan);
    await this.queueNodeRepo.save(queueNode);
    return new CreateQueueNodeResponse(queueNode.getId().toString());
  }
}
