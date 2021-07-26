export default class InvalidEmployeeUsernameError extends Error {
  constructor() {
    super("Invalid username provided");
  }
}
