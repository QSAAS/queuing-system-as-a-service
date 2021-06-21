import express from "express";
import DependencyInjectionContainer from "@app/Command/Infrastructure/Config/DependencyInjectionContainer";
import { DiEntry } from "@app/Command/Infrastructure/Config/DependencyDefinitions";
import OrganizationEndpointController from "@app/Command/Presentation/Api/Controller/OrganizationEndpointController";

function createRouter(container: DependencyInjectionContainer<DiEntry>) {
  const router = express.Router();

  const controller = container.resolve<OrganizationEndpointController>(DiEntry.OrganizationEndpointController);

  router.post("/", (request, response) => {
    controller.create(request, response);
  });

  return router;
}

export default createRouter;
