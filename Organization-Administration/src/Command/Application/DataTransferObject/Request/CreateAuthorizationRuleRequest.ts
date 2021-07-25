import PermissionDTO from "@app/Command/Application/DataTransferObject/Object/PermissionDTO";

export default class CreateAuthorizationRuleRequest {
  constructor(public adminId: string, public employeeId: string, public permission: PermissionDTO) {}
}
