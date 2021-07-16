import PermissionDTO from "@app/Command/Application/DataTransferObject/Object/PermissionDTO";

export default class CreateAuthorizationRuleResponse {
  constructor(public permission: PermissionDTO) {}
}
