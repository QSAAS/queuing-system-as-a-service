import InvalidEmployeeUsernameError from "@app/Command/Domain/Error/InvalidEmployeeUsernameError";

export default class EmployeeUsername {
  private readonly username: string ;
  constructor(username: string) {
    if (this.valid(username)) {
      this.username = username;
    } else {
      throw new InvalidEmployeeUsernameError();
    }
  }

  public toString():string {
    return this.username;
  }

  public valid(username: string):boolean {
    return username.length > 4 && username.length < 50;
  }
  // todo how this supposed to throw an error exception
}
