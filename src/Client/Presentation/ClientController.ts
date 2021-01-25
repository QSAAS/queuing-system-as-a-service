import { Request } from "express";
import RegisterDTO from "@app/Client/Application/DataTransferObjects/RegisterDTO";
import RegisterService from "../Application/Services/RegisterService";

class ClientController {
    constructor(private registerService: RegisterService) {}
    register(request: Request) {
        const dto = new RegisterDTO(
            request.body.username,
            request.body.password,
            request.body.email,
        );
        return this.registerService.run(dto);
    }
}

export default ClientController;
