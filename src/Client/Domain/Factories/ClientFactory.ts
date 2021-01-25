import Client from "@app/Client/Domain/Entities/Client";
import ClientId from "@app/Client/Domain/ValueObjects/ClientId";

class ClientFactory {
    public create(username: string, password: string, email: string): Client {
        return new Client(
            ClientId.generate(),
            username,
            password,
            email,
        );
    }
}

export default ClientFactory;
