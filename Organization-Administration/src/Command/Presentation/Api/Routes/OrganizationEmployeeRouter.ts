import express from "express";
import DependencyInjectionContainer from "@app/Command/Infrastructure/Config/DependencyInjectionContainer";
import { DiEntry } from "@app/Command/Infrastructure/Config/DependencyDefinitions";
import OrganizationEmployeeController from "@app/Command/Presentation/Api/Controller/OrganizationEmployeeController";
import OrganizationEmployee from "@app/Command/Domain/Entity/OrganizationEmployee";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import OrganizationId from "@app/Command/Domain/ValueObject/OrganizationId";
import BCryptPasswordHashFactory from "@app/Command/Infrastructure/Service/BCryptPasswordHashFactory";
import EmployeeUsername from "@app/Command/Domain/ValueObject/EmployeeUsername";
import OrganizationEmployeeRepository from "@app/Command/Domain/Service/OrganizationEmployeeRepository";
import AuthorizationRule from "@app/Command/Domain/Entity/AuthorizationRule";
import Permission from "@app/Command/Domain/ValueObject/Permission";
import ResourceType from "@app/Command/Domain/Enum/ResourceType";
import AuthorizedAction from "@app/Command/Domain/Enum/AuthorizedAction";
import AuthorizationRuleRepository from "@app/Command/Domain/Service/AuthorizationRuleRepository";

function createRouter(container: DependencyInjectionContainer<DiEntry>) {
  const router = express.Router();

  const controller = container.resolve<OrganizationEmployeeController>(DiEntry.OrganizationEmployeeController);

  router.post("/login", async (request, response) => {
    await controller.login(request, response);
  });

  router.post("/register", async (request, response) => {
    await controller.register(request, response);
  });

  // TODO: Internal endpoint for creating employees (NO VALIDATIONS)
  router.post("/create_organization_admin", async (request, response) => {
    const passwordFactory = new BCryptPasswordHashFactory();
    const id = OrganizationEmployeeId.create();
    const employee = new OrganizationEmployee(
      OrganizationEmployeeId.create(),
      OrganizationId.from(request.body.organizationId),
      request.body.name,
      await passwordFactory.create(request.body.password),
      EmployeeUsername.from(request.body.username),
    );
    const repo = container.resolve<OrganizationEmployeeRepository>(DiEntry.OrganizationEmployeeRepository);
    await repo.save(employee);
    const rule = new AuthorizationRule(
      id,
      Permission.create(null, ResourceType.AUTHORIZATION_RULE, AuthorizedAction.UPDATE),
    );
    const authRepo = container.resolve<AuthorizationRuleRepository>(DiEntry.AuthorizationRuleRepository);
    await authRepo.save(rule);
    response.json({
      id: employee.getId().toString(),
    });
  });

  return router;
}

export default createRouter;
