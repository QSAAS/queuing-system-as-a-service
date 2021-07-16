import DependencyInjectionContainer from "@app/Command/Infrastructure/Config/DependencyInjectionContainer";
import DependencyDefinitions, { DiEntry } from "@app/Command/Infrastructure/Config/DependencyDefinitions";
import express from "express";
import createOrganizationEndpointRouter from "@app/Command/Presentation/Api/Routes/OrganizationEndpointRouter";
import createOrganizationEmployeeRouter from "@app/Command/Presentation/Api/Routes/OrganizationEmployeeRouter";
import createAuthorizationRuleRouter from "@app/Command/Presentation/Api/Routes/AuthorizationRuleRouter";
import ErrorHandler from "@app/Command/Presentation/Api/Middleware/ErrorHandler";

let container: DependencyInjectionContainer<DiEntry>;

export async function getDependencyContainer() {
  if (container === undefined) {
    container = new DependencyInjectionContainer<DiEntry>();
    await container.addDefinitions(DependencyDefinitions);
  }
  return container;
}

async function createRouter() {
  const router = express.Router();
  const containerInstance = await getDependencyContainer();
  router.use("/endpoint", createOrganizationEndpointRouter(containerInstance));
  router.use("/accounts", createOrganizationEmployeeRouter(containerInstance));
  router.use("/authorization-rule", createAuthorizationRuleRouter(containerInstance));
  router.use(ErrorHandler);

  return router;
}

export default createRouter;
