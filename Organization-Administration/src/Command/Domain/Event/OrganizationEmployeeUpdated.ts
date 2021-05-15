import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import DomainEvent from "@app/Command/Domain/Event/DomainEvent";

export default class OrganizationEmployeeUpdated extends DomainEvent {
  private organizationEmployee : OrganizationEmployee;
  constructor(organizationEmployee : OrganizationEmployee) {
    super();
    this.organizationEmployee = organizationEmployee;
  }

  public getOrganizationEmployee():OrganizationEmployee {
    return this.organizationEmployee;
  }
}
