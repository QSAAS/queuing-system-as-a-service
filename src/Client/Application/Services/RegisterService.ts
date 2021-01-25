import ClientRepository from "@app/Client/Domain/Repositories/ClientRepository";
import RegisterDTO from "@app/Client/Application/DataTransferObjects/RegisterDTO";
import ClientFactory from "@app/Client/Domain/Factories/ClientFactory";

class RegisterService {
    constructor(private repository: ClientRepository, private factory: ClientFactory) {}

    public run(requestDTO: RegisterDTO) {
        const client = this.factory.create(requestDTO.username, requestDTO.password, requestDTO.email);
        return this.repository.create(client);
    }
}

export default RegisterService;
