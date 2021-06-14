import InvalidEmployeeUsernameError from "@app/Command/Domain/Error/InvalidEmployeeUsernameError";
import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";

export default class EmployeeUsername extends ValueObject {
  private readonly username: string;
  constructor(username: string) {
    super();
    if (this.valid(username)) {
      this.username = username;
    } else {
      throw new InvalidEmployeeUsernameError();
    }
  }

  public toString(): string {
    return this.username;
  }

  public valid(username: string): boolean {
    return username.length > 4 && username.length < 50;
  }

  equals(other: this): boolean {
    return this.username === other.username;
  }

  public static create(username: string): EmployeeUsername {
    return new EmployeeUsername(username);
  }
}
