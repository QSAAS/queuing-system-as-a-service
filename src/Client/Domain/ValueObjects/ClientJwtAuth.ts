import jwt from "jsonwebtoken";
import Auth from "@app/Client/Domain/Interfaces/Auth";
import ConfigReadingError from "@app/Client/Domain/Errors/ConfigReadingError";
import Client from "@app/Client/Domain/Entities/Client";
import InvalidTokenError from "@app/Client/Domain/Errors/InvalidTokenError";

// TODO discuss, is this class a value object or a service in the domain layer?
export default class ClientJwtAuth implements Auth<Client> {
    public getToken(client: Client): string {
        const jwtKey: string = this.getKey();
        const token: string = jwt.sign(
            { id: client.getId().toString(), username: client.getUsername() }, jwtKey,
        );
        return token;
    }

    public decode(token: string): Object {
        const jwtKey: string = this.getKey();
        try {
            const decodedObject = jwt.verify(token, jwtKey);
            return decodedObject;
        } catch (e) {
            throw new InvalidTokenError(`'${token}' is an invalid token`);
        }
    }

    private getKey(): string {
        const key: string | undefined = process.env.JWT_KEY;
        if (!key) {
            throw new ConfigReadingError("Could not read JWT_KEY");
        }
        return key;
    }
}
