import { Router, Request, Response } from "express";
import MongoClientRepository from "@app/Client/Infrastructure/MongoClientRepository";
import RegisterService from "@app/Client/Application/Services/RegisterService";
import ClientFactory from "@app/Client/Domain/Factories/ClientFactory";
import ClientController from "./ClientController";

const router = Router();

router.post("/", async (request: Request, response: Response) => {
    const registerService = new RegisterService(new MongoClientRepository(), new ClientFactory());
    const clientController = new ClientController(registerService);
    await clientController.register(request, response);
});

export default router;
