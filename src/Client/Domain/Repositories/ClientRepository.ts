import Client from "../Entities/Client";

interface ClientRepository {
    save(client: Client): Promise<Client>;
}

export default ClientRepository;
