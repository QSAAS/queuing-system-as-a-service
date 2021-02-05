import Client from "@app/Client/Domain/Entities/Client";

export default class RegisterResponseDTO {
    constructor(public readonly id: string, public readonly username: string, public readonly email: string) { }

    public static from(client: Client): RegisterResponseDTO {
        return new RegisterResponseDTO(client.getId().toString(), client.getUsername(), client.getEmail());
    }
}
