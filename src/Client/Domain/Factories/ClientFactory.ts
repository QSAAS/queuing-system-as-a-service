import Client from "@app/Client/Domain/Entities/Client";
import ClientId from "@app/Client/Domain/ValueObjects/ClientId";
import bcrypt from "bcrypt";

class ClientFactory {
    public async create(username: string, password: string, email: string): Promise<Client> {
        const hashedPassword: string = await ClientFactory.hash(password);
        return new Client(
            ClientId.generate(),
            username,
            hashedPassword,
            email,
        );
    }

    /**
     * TODO discuss: this function is CPU intensive, if we rely on mongoose error throwing for uniqueness validation,
     * we'll have to pass through this layer (and hence this function) for a client that
     * may in the end not get registered because the provided username/email are not unique.
     * Should we check for uniqueness before registering a client? this is also not runtime friendly,
     * because in a case of a DB miss, we'll have queried the DB twice, once for
     * uniqueness checking and once for saving.
     * imo, we should leave this as is for the sake of simplicity for now.
     */
    private static async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }
}

export default ClientFactory;
