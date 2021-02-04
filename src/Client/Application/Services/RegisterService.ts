import ClientRepository from "@app/Client/Domain/Repositories/ClientRepository";
import RegisterDTO from "@app/Client/Application/DataTransferObjects/RegisterDTO";
import ClientFactory from "@app/Client/Domain/Factories/ClientFactory";
import RegisterResponseDTO from "@app/Client/Application/DataTransferObjects/RegisterResponseDTO";
import Client from "@app/Client/Domain/Entities/Client";

class RegisterService {
    constructor(private repository: ClientRepository, private factory: ClientFactory) {}

    public async run(requestDTO: RegisterDTO): Promise<RegisterResponseDTO> {
        const client = await this.factory.create(requestDTO.username, requestDTO.password, requestDTO.email);
        const registerResponse: Client = await this.repository.save(client);
        return RegisterResponseDTO.from(registerResponse);
    }
}

export default RegisterService;
