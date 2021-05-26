import EmployeeUsernameBuilder from "@tests/Command/Domain/ValueObject/EmployeeUsernameBuilder";

export default class EmployeeUsernameMother {
  public static complete() {
    return new EmployeeUsernameBuilder().withUsrname("username");
  }
}
