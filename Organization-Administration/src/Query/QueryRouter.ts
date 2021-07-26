import express from "express";
import ErrorHandler from "@app/Command/Presentation/Api/Middleware/ErrorHandler";
import DependencyInjectionContainer from "@app/Command/Infrastructure/Config/DependencyInjectionContainer";
import {DiEntry} from "@app/Command/Infrastructure/Config/DependencyDefinitions";
import createOrganizationEndpointQueryRouter from "@app/Query/OrganizationEndpointQueryRouter";

export default function createQueryRouter(container: DependencyInjectionContainer<DiEntry>) {
  const router = express.Router();
  router.use("/endpoint", createOrganizationEndpointQueryRouter(container));
  // router.use("/accounts", createOrganizationEmployeeQueryRouter(container));
  // router.use("/authorization-rule", createAuthorizationRuleQueryRouter(container));
  // router.use("/queue_node", createQueueNodeQueryRouter(container));
  // router.use("/queue_server", createQueueServerQueryRouter(container));
  router.use(ErrorHandler);

  return router;
}