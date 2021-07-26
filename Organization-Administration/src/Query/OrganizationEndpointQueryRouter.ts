import DependencyInjectionContainer from "@app/Command/Infrastructure/Config/DependencyInjectionContainer";
import express from "express";
import {DiEntry} from "@app/Command/Infrastructure/Config/DependencyDefinitions";
import MongooseOrganizationEndpointRepository
  from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseOrganizationEndpointRepository";

export default function createOrganizationEndpointQueryRouter(container: DependencyInjectionContainer<DiEntry>) {
  const router = express.Router();

  router.get("/", async (request, response) => {
    const repo = container.resolve<MongooseOrganizationEndpointRepository>(DiEntry.OrganizationEndpointRepository);
    const instances = await repo.getAll();
    const result = instances.map(d => repo.getTransformer().mongooseObjectFrom(d));
    response.json(result);
  });

  return router;
}
