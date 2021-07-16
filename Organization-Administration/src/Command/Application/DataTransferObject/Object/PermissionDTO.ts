export default class PermissionDTO {
  constructor(public resourceId: string | null, public resourceType: string, public type: string) {}
}
