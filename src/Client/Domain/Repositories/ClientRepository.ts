import Client from "../Entities/Client";

interface ClientRepository {
    save(client: Client): Promise<Client>;
    getByUsername(username: string): Promise<Client>;
}

export default ClientRepository;
