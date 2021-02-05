import { Request, Response } from "express";
import RegisterDTO from "@app/Client/Application/DataTransferObjects/RegisterDTO";
import RegisterResponseDTO from "@app/Client/Application/DataTransferObjects/RegisterResponseDTO";
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
}

export default ClientController;
