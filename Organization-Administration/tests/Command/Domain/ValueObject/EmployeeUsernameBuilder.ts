import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";

export default class EmployeeUsernameBuilder {
  private username: string = "";
  public withUsername(username: string): EmployeeUsernameBuilder {
    this.username = username;
    return this;
  }

  public build():EmployeeUsername {
    return EmployeeUsername.create(this.username);
  }
}
