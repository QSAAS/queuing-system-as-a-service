import { Request, Response } from "express";
import RegisterDTO from "@app/Client/Application/DataTransferObjects/RegisterDTO";
import RegisterResponseDTO from "@app/Client/Application/DataTransferObjects/RegisterResponseDTO";
import LoginService from "@app/Client/Application/Services/LoginService";
import LoginDTO from "@app/Client/Application/DataTransferObjects/LoginDTO";
import LoginResponseDTO from "@app/Client/Application/DataTransferObjects/LoginResponseDTO";
import RegisterService from "../Application/Services/RegisterService";

class ClientController {
    public async register(request: Request, response: Response, registerService: RegisterService): Promise<void> {
        const dto = new RegisterDTO(
            request.body.username,
            request.body.password,
            request.body.email,
        );
        try {
            const responseDTO: RegisterResponseDTO = await registerService.run(dto);
            response.status(200).send(responseDTO);
        } catch (e) {
            response.status(400).send(e.message);
        }
    }

    public async login(request: Request, response: Response, loginService: LoginService): Promise<void> {
        const dto = new LoginDTO(request.body.username, request.body.password);
        try {
            const responseDTO: LoginResponseDTO = await loginService.run(dto);
            response.status(200).send(responseDTO);
        } catch (e) {
            response.status(400).send(e.message);
        }
    }
}

export default ClientController;
