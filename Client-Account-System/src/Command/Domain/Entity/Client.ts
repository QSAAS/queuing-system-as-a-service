import ClientUsername from "@app/Command/Domain/ValueObject/ClientUsername";
import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";
import AuthenticationError from "@app/Command/Domain/Error/AuthenticationError";
import AggregateRoot from "@app/Command/Domain/Entity/AggregateRoot";
import ClientLoggedIn from "@app/Command/Domain/Event/ClientLoggedIn";

class Client extends AggregateRoot {
  constructor(
    private username: ClientUsername,
    private passwordHash: PasswordHash,
    private phone: String,
  ) {
    super();
  }

  public async login(password: String) {
    if (!await this.passwordHash.matches(password)) {
      throw new AuthenticationError(`Wrong password supplied for client ${this.username}`);
    }
    this.raiseEvent(new ClientLoggedIn(this));
  }
}

export default Client;
