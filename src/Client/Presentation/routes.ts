import { Router, Request, Response } from "express";
import MongoClientRepository from "@app/Client/Infrastructure/MongoClientRepository";
import RegisterService from "@app/Client/Application/Services/RegisterService";
import ClientFactory from "@app/Client/Domain/Factories/ClientFactory";
import LoginService from "@app/Client/Application/Services/LoginService";
import ClientController from "./ClientController";

const router = Router();

router.post("/", async (request: Request, response: Response) => {
    const registerService = new RegisterService(new MongoClientRepository(), new ClientFactory());
    const clientController = new ClientController();
    await clientController.register(request, response, registerService);
});

router.post("/login", async (request: Request, response: Response) => {
    const loginService: LoginService = new LoginService(new MongoClientRepository());
    const clientController: ClientController = new ClientController();
    await clientController.login(request, response, loginService);
});

export default router;
