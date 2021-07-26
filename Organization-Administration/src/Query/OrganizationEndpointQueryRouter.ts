import DependencyInjectionContainer from "@app/Command/Infrastructure/Config/DependencyInjectionContainer";
import express from "express";
import {DiEntry} from "@app/Command/Infrastructure/Config/DependencyDefinitions";
import MongooseOrganizationEndpointRepository
  from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseOrganizationEndpointRepository";
import OrganizationEndpoint from "@app/Command/Domain/Entity/OrganizationEndpoint";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import Geolocation from "@app/Command/Domain/ValueObject/Geolocation";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";

export default function createOrganizationEndpointQueryRouter(container: DependencyInjectionContainer<DiEntry>) {
  const router = express.Router();

  router.get("/", async (request, response) => {
    const repo = container.resolve<MongooseOrganizationEndpointRepository>(DiEntry.OrganizationEndpointRepository);
    await repo.save(new OrganizationEndpoint(
      OrganizationEndpointId.from("id"),
      OrganizationId.from("id2"),
      "name",
      new Geolocation(10, 20),
    ))
    const result = await repo.getAll();
    console.log(result);
    response.json(result);
  });

  return router;
}
