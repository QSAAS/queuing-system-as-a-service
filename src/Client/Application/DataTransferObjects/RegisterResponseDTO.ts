import Client from "@app/Client/Domain/Entities/Client";

export default class RegisterResponseDTO {
    constructor(private readonly id: string, private readonly username: string, private readonly email: string) { }

    public static from(client: Client): RegisterResponseDTO {
        return new RegisterResponseDTO(client.getId().toString(), client.getUsername(), client.getEmail());
    }
}
