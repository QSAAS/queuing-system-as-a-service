import * as express from "express";
import MongoClientRepository from "@app/Client/Infrastructure/MongoClientRepository";
import RegisterService from "@app/Client/Application/Services/RegisterService";
import ClientFactory from "@app/Client/Domain/Factories/ClientFactory";
import ClientController from "./ClientController";

const router = express.Router();

router.post("/", async (request, response) => {
    const registerService = new RegisterService(new MongoClientRepository(), new ClientFactory());
    const clientController = new ClientController(registerService);
    try {
        const result = await clientController.register(request);
        response.status(200).send(result);
    } catch (e) {
        // TODO wrap error inside a meaningful message depending based on error type
        // TODO set response status code based on error type
        response.status(400).send(e.message);
    }
});

export default router;
