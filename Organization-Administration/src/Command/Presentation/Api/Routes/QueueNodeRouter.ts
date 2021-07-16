import express from "express";
import DependencyInjectionContainer from "@app/Command/Infrastructure/Config/DependencyInjectionContainer";
import { DiEntry } from "@app/Command/Infrastructure/Config/DependencyDefinitions";
import QueueNodeController from "@app/Command/Presentation/Api/Controller/QueueNodeController";
import JwtAuthenticationMiddleware from "@app/Command/Presentation/Api/Middleware/JWTAuthenticationMiddleware";

export default function createRouter(container: DependencyInjectionContainer<DiEntry>){
  const router = express.Router();

  const controller = container.resolve<QueueNodeController>(DiEntry.QueueNodeController)

  router.use(JwtAuthenticationMiddleware(container.resolve(DiEntry.JWT_KEY)));

  router.post("/", async(request, response) => {
    await controller.create(request, response);
  });

  return router;
}
