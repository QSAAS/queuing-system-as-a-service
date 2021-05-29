import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/OrganizationEmployeeBuilder";
import EmployeeUsernameMother from "@tests/Command/Domain/ValueObject/EmployeeUsernameMother";

export default class OrganizationEmployeeMother {
  public static admin(): OrganizationEmployeeBuilder {
    return new OrganizationEmployeeBuilder().withUsername(EmployeeUsernameMother.admin().build());
  }

  public static employee():OrganizationEmployeeBuilder {
    return new OrganizationEmployeeBuilder().withUsername(EmployeeUsernameMother.employee().build());
  }
}
