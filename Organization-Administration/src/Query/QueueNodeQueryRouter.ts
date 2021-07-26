import DependencyInjectionContainer from "@app/Command/Infrastructure/Config/DependencyInjectionContainer";
import {DiEntry} from "@app/Command/Infrastructure/Config/DependencyDefinitions";
import express from "express";
import MongooseQueueNodeRepository
  from "@app/Command/Infrastructure/Repository/Mongoose/Repository/MongooseQueueNodeRepository";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";

export default function createQueueNodeQueryRouter(container: DependencyInjectionContainer<DiEntry>) {
  const router = express.Router();
  const repo = container.resolve<MongooseQueueNodeRepository>(DiEntry.QueueNodeRepository);

  router.get("/", async(request, response) => {
    const instances = await repo.getAll();
    const result = instances.map(d => repo.getTransformer().mongooseObjectFrom(d));
    response.json(result);
  });
  router.get("/:id", async (request, response) => {
    const {id} = request.params;
    try {
      const instance = await repo.getById(QueueNodeId.from(id));
      const result = repo.getTransformer().mongooseObjectFrom(instance);
      response.json(result);
    } catch(e) {
      response.status(404).json({
        message: `Queue node with id ${id} not found`,
      });
    }
  });

  return router;
}
