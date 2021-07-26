import DependencyInjectionContainer from "@app/Command/Infrastructure/Config/DependencyInjectionContainer";
import express from "express";
import {DiEntry} from "@app/Command/Infrastructure/Config/DependencyDefinitions";
import MongooseOrganizationEndpointRepository
  from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseOrganizationEndpointRepository";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";

export default function createOrganizationEndpointQueryRouter(container: DependencyInjectionContainer<DiEntry>) {
  const router = express.Router();
  const repo = container.resolve<MongooseOrganizationEndpointRepository>(DiEntry.OrganizationEndpointRepository);

  router.get("/", async (request, response) => {
    const instances = await repo.getAll();
    const result = instances.map(d => repo.getTransformer().mongooseObjectFrom(d));
    response.json(result);
  });

  router.get("/:id", async (request, response) => {
    const {id} = request.params;
    try {
      const instance = await repo.getById(OrganizationEndpointId.from(id));
      const result = repo.getTransformer().mongooseObjectFrom(instance);
      response.json(result);
    } catch(e) {
      response.status(404).json({
        message: `Organization endpoint with id ${id} not found`,
      });
    }
  });

  return router;
}
