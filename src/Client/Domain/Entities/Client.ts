import ClientId from "@app/Client/Domain/ValueObjects/ClientId";

class Client {
    constructor(private id: ClientId, private username: string, private password: string, private email: string) {}
    getId(): ClientId {
        return this.id;
    }
    getUsername(): string {
        return this.username;
    }
    getPassword(): string {
        return this.password;
    }
    getEmail(): string {
        return this.email;
    }
}

export default Client;
