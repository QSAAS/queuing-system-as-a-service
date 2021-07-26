import DependencyInjectionContainer from "@app/Command/Infrastructure/Config/DependencyInjectionContainer";
import express from "express";
import {DiEntry} from "@app/Command/Infrastructure/Config/DependencyDefinitions";
import MongooseOrganizationEmployeeRepository
  from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseOrganizationEmployeeRepository";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";

export default function createOrganizationEmployeeQueryRouter(container: DependencyInjectionContainer<DiEntry>) {
  const router = express.Router();
  const repo = container.resolve<MongooseOrganizationEmployeeRepository>(DiEntry.OrganizationEmployeeRepository);

  router.get("/", async (request, response) => {
    const instances = await repo.getAll();
    const result = instances.map(d => repo.getTransformer().mongooseObjectFrom(d));
    response.json(result);
  });

  router.get("/:id", async (request, response) => {
    const {id} = request.params;
    try {
      const instance = await repo.getById(OrganizationEmployeeId.from(id));
      const result = repo.getTransformer().mongooseObjectFrom(instance);
      response.json(result);
    } catch(e) {
      response.status(404).json({
        message: `Organization employee with id ${id} not found`,
      });
    }
  });

  return router;
}
