import ClientUsername from "@app/Command/Domain/ValueObject/ClientUsername";
import Client from "@app/Command/Domain/Entity/Client";

interface ClientRepository{
  getByUsername(username: ClientUsername): Promise<Client>;
  save(client: Client): void;
}

export default ClientRepository;
