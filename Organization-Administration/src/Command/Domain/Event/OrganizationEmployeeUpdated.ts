import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";

export default class OrganizationEmployeeUpdated extends Event {
  private organizationEmployee : OrganizationEmployee;
  constructor(type: string, eventInitDict: EventInit, organizationEmployee : OrganizationEmployee) {
    super(type, eventInitDict);
    this.organizationEmployee = organizationEmployee;
  }

  public getOrganizationEmployee():OrganizationEmployee {
    return this.organizationEmployee;
  }
}
