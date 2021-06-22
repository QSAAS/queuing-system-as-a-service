import DependencyInjectionContainer from "@app/Command/Infrastructure/Config/DependencyInjectionContainer";
import DependencyDefinitions, { DiEntry } from "@app/Command/Infrastructure/Config/DependencyDefinitions";
import express from "express";
import createOrganizationEndpointRouter from "@app/Command/Presentation/Api/Routes/OrganizationEndpointRouter";
import createOrganizationEmployeeRouter from "@app/Command/Presentation/Api/Routes/OrganizationEmployeeRouter";
import ErrorHandler from "@app/Command/Presentation/Api/Middleware/ErrorHandler";

function createRouter(){
  const router = express.Router();
  const container = new DependencyInjectionContainer<DiEntry>();
  container.addDefinitions(DependencyDefinitions).then(()=>{
    router.use("/endpoint", createOrganizationEndpointRouter(container));
    router.use("/accounts", createOrganizationEmployeeRouter(container));
    router.use(ErrorHandler);
  })

  return router;
}

export default createRouter;
