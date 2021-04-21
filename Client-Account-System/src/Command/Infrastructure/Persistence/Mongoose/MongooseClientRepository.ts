import ClientRepository from "@app/Command/Domain/Service/ClientRepository";
import ClientUsername from "@app/Command/Domain/ValueObject/ClientUsername";
import Client from "@app/Command/Domain/Entity/Client";
import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";

class MongooseClientRepository implements ClientRepository {
  getByUsername(username: ClientUsername): Promise<Client> {
    const c = new Client(
      username,
      new PasswordHash("123123123"),
      "+21227647347",
    );
    return Promise.resolve(c);
  }

  save(client: Client): void {
    client.getAllEvent();
  }
}

export default MongooseClientRepository;
