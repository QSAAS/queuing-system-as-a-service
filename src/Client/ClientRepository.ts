import Client from "./Client";

interface ClientRepository {
    create(client: Client): Promise<any>;
}

export default ClientRepository;
