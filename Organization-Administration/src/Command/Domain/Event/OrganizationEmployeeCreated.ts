import DomainEvent from "@app/Command/Domain/Event/DomainEvent";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";

export default class OrganizationEmployeeCreated extends DomainEvent {
  constructor(private employee: OrganizationEmployee) {
    super();
  }

  getOrganizationEmployee() {
    return this.employee;
  }
}
