import OrganizationEmployeeRepository from "@app/Command/Domain/Service/OrganizationEmployeeRepository";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import AuthorizationRuleRepository from "@app/Command/Domain/Service/AuthorizationRuleRepository";
import CreateAuthorizationRuleRequest from "@app/Command/Application/DataTransferObject/Request/CreateAuthorizationRuleRequest";
import CreateAuthorizationRuleResponse from "@app/Command/Application/DataTransferObject/Response/CreateAuthorizationRuleResponse";
import EmployeeCreateNewAuthorizationRuleService from "@app/Command/Domain/Service/EmployeeCreateNewAuthorizationRuleService";
import PermissionDtoTransformer from "@app/Command/Application/Transformer/PermissionDtoTransformer";

export default class CreateAuthorizationRuleService {
  constructor(
    private employeeRepo: OrganizationEmployeeRepository,
    private authorizationRuleRepository: AuthorizationRuleRepository,
    private createService: EmployeeCreateNewAuthorizationRuleService,
    private permissionDtoTransformer: PermissionDtoTransformer,
  ) {}

  async execute(request: CreateAuthorizationRuleRequest): Promise<CreateAuthorizationRuleResponse> {
    const admin = await this.employeeRepo.getById(OrganizationEmployeeId.from(request.adminId));
    const employee = await this.employeeRepo.getById(OrganizationEmployeeId.from(request.employeeId));
    const permission = this.permissionDtoTransformer.toObject(request.permission);
    const endpoint = await this.createService.execute(admin, employee, permission);
    await this.authorizationRuleRepository.save(endpoint);
    return new CreateAuthorizationRuleResponse(this.permissionDtoTransformer.toDTO(permission));
  }
}
