class Client {
    constructor(private username: string, private password: string, private email: string) {}
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
