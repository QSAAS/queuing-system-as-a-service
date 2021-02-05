import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ClientRepository from "@app/Client/Domain/Repositories/ClientRepository";
import LoginDTO from "@app/Client/Application/DataTransferObjects/LoginDTO";
import LoginResponseDTO from "@app/Client/Application/DataTransferObjects/LoginResponseDTO";
import InvalidPasswordError from "@app/Client/Domain/Errors/InvalidPasswordError";
import ConfigReadingError from "@app/Client/Domain/Errors/ConfigReadingError";

export default class LoginService {
    constructor(private repository: ClientRepository) {}

    public async run(requestDTO: LoginDTO): Promise<LoginResponseDTO> {
        const client = await this.repository.getByUsername(requestDTO.username);

        const isValidPassword: boolean = await bcrypt.compare(requestDTO.password, client.getPassword());
        if (!isValidPassword) {
            throw new InvalidPasswordError(`Invalid password '${requestDTO.password}'`);
        }

        const jwtKey: string | undefined = process.env.JWT_KEY;
        if (!jwtKey) {
            throw new ConfigReadingError("Could not read JWT_KEY");
        }
        const token = jwt.sign({ id: client.getId().toString(), username: client.getUsername() }, process.env.JWT_KEY!);
        return new LoginResponseDTO(token);
    }
}
