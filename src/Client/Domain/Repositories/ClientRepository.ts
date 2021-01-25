import Client from "../Entities/Client";

interface ClientRepository {
    create(client: Client): Promise<any>;
}

export default ClientRepository;
