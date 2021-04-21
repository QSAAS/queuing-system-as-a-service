import ClientUsernameValidationError from "@app/Command/Domain/Error/ClientUsernameValidationError";

class ClientUsername {
  constructor(
    private username: String,
  ) {
    if (this.username.length < 3) {
      throw new ClientUsernameValidationError("Client username cannot be less than 3 characters");
    }
    if (this.username.length > 10) {
      throw new ClientUsernameValidationError("Client username cannot be more than 10 characters");
    }
  }

  public toString(): String {
    return this.username;
  }
}

export default ClientUsername;
