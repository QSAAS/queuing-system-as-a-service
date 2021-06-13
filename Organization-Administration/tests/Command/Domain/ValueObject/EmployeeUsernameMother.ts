import EmployeeUsernameBuilder from "@tests/Command/Domain/ValueObject/EmployeeUsernameBuilder";

export default class EmployeeUsernameMother {
  public static complete():EmployeeUsernameBuilder {
    return new EmployeeUsernameBuilder().withUsername("username");
  }

  public static admin():EmployeeUsernameBuilder {
    return new EmployeeUsernameBuilder().withUsername("username");
  }

  public static employee():EmployeeUsernameBuilder {
    return new EmployeeUsernameBuilder().withUsername("employee");
  }
}
