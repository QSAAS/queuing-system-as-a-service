import bcrypt from "bcrypt";
import ClientRepository from "@app/Client/Domain/Repositories/ClientRepository";
import LoginDTO from "@app/Client/Application/DataTransferObjects/LoginDTO";
import LoginResponseDTO from "@app/Client/Application/DataTransferObjects/LoginResponseDTO";
import InvalidPasswordError from "@app/Client/Domain/Errors/InvalidPasswordError";
import ClientJwtAuth from "@app/Client/Domain/ValueObjects/ClientJwtAuth";

export default class LoginService {
    constructor(private repository: ClientRepository) {}

    public async run(requestDTO: LoginDTO): Promise<LoginResponseDTO> {
        const client = await this.repository.getByUsername(requestDTO.username);

        const isValidPassword: boolean = await bcrypt.compare(requestDTO.password, client.getPassword());
        if (!isValidPassword) {
            throw new InvalidPasswordError(`Invalid password '${requestDTO.password}'`);
        }

        const clientAuth = new ClientJwtAuth(); /// TODO discuss: inject authentication service?
        const token: string = clientAuth.getToken(client);
        return new LoginResponseDTO(token);
    }
}
