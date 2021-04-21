import LoginRequestDTO from "@app/Command/Application/DataTransferObject/LoginRequestDTO";
import ClientRepository from "@app/Command/Domain/Service/ClientRepository";
import ClientUsername from "@app/Command/Domain/ValueObject/ClientUsername";

class LoginService {
  constructor(
    private clientRepository: ClientRepository,
  ) {
  }

  public async execute(requestDTO: LoginRequestDTO): Promise<boolean> {
    const client = await this.clientRepository.getByUsername(new ClientUsername(requestDTO.username));
    await client.login(requestDTO.password);
    return true;
  }
}

export default LoginService;
