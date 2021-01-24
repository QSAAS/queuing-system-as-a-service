import * as express from "express";
import ClientController from "./ClientController";

const router = express.Router();

router.post("/", async (request, response) => {
    const clientController = new ClientController();
    try {
        const result = await clientController.register(request);
        response.send(result);
    } catch (e) {
        // TODO wrap error inside a meaningful message depending based on error type
        // TODO set response status code based on error type
        response.send(e.message);
    }
});

export default router;
