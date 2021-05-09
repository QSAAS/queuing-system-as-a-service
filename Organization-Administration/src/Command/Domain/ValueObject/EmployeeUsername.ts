export default class EmployeeUsername {
  private readonly username: string ;
  constructor(username: string) {
    this.username = username;
  }

  public toString():string {
    return this.username;
  }
  // todo how this supposed to throw an error exception
}
