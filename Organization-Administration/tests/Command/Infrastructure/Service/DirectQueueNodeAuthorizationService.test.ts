import MockAuthorizationRuleRepository from "@tests/Command/Infrastructure/Repository/Mock/MockAuthorizationRuleRepository";
import OrganizationEmployeeBuilder from "@tests/Command/Domain/Entity/Builder/OrganizationEmployeeBuilder";
import AuthorizationRuleBuilder from "@tests/Command/Domain/Entity/Builder/AuthorizationRuleBuilder";
import DirectQueueNodeAuthorizationService from "@app/Command/Infrastructure/Service/AuthorizationService/DirectQueueNodeAuthorizationService";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import PermissionBuilder from "@tests/Command/Domain/ValueObject/Builder/PermissionBuilder";
import AuthorizedAction from "@app/Command/Domain/Enum/AuthorizedAction";
import ResourceType from "@app/Command/Domain/Enum/ResourceType";
import QueueNodeBuilder from "@tests/Command/Domain/Entity/Builder/QueueNodeBuilder";

describe("Ensures can create", () => {
  it("Rejects unauthorized requests", () => {
    const admin = new OrganizationEmployeeBuilder().build();
    const repo = new MockAuthorizationRuleRepository([
      new AuthorizationRuleBuilder()
        .withEmployeeId(admin.getId())
        .withPermission(
          new PermissionBuilder()
            .withAction(AuthorizedAction.CREATE)
            .withResourceType(ResourceType.QUEUE_SERVER)
            .build(),
        )
        .build(),
    ]);
    const service = new DirectQueueNodeAuthorizationService(repo);
    expect(service.ensureEmployeeCanCreate(admin.getId())).rejects.toBeInstanceOf(EmployeeNotAuthorizedError);
  });
  it("Accepts authorized requests", () => {
    const admin = new OrganizationEmployeeBuilder().build();
    const repo = new MockAuthorizationRuleRepository([
      new AuthorizationRuleBuilder()
        .withEmployeeId(admin.getId())
        .withPermission(
          new PermissionBuilder().withAction(AuthorizedAction.CREATE).withResourceType(ResourceType.QUEUE_NODE).build(),
        )
        .build(),
    ]);
    const service = new DirectQueueNodeAuthorizationService(repo);
    expect(service.ensureEmployeeCanCreate(admin.getId())).resolves.toBeUndefined();
  });
});

describe("Ensures can update", () => {
  it("Rejects unauthorized requests", () => {
    const admin = new OrganizationEmployeeBuilder().build();
    const repo = new MockAuthorizationRuleRepository([
      new AuthorizationRuleBuilder()
        .withEmployeeId(admin.getId())
        .withPermission(
          new PermissionBuilder().withAction(AuthorizedAction.CREATE).withResourceType(ResourceType.QUEUE_NODE).build(),
        )
        .build(),
    ]);
    const service = new DirectQueueNodeAuthorizationService(repo);
    const node = new QueueNodeBuilder().build();
    expect(service.ensureEmployeeCanUpdate(admin.getId(), node.getId())).rejects.toBeInstanceOf(
      EmployeeNotAuthorizedError,
    );
  });
  it("Accepts authorized requests", () => {
    const admin = new OrganizationEmployeeBuilder().build();
    const node = new QueueNodeBuilder().build();
    const repo = new MockAuthorizationRuleRepository([
      new AuthorizationRuleBuilder()
        .withEmployeeId(admin.getId())
        .withPermission(
          new PermissionBuilder()
            .withAction(AuthorizedAction.UPDATE)
            .withResourceType(ResourceType.QUEUE_NODE)
            .withResourceId(node.getId())
            .build(),
        )
        .build(),
    ]);
    const service = new DirectQueueNodeAuthorizationService(repo);
    expect(service.ensureEmployeeCanUpdate(admin.getId(), node.getId())).resolves.toBeUndefined();
  });
});

describe("Ensures can delete", () => {
  it("Rejects unauthorized requests", () => {
    const admin = new OrganizationEmployeeBuilder().build();
    const node = new QueueNodeBuilder().build();
    const repo = new MockAuthorizationRuleRepository([
      new AuthorizationRuleBuilder()
        .withEmployeeId(admin.getId())
        .withPermission(
          new PermissionBuilder()
            .withAction(AuthorizedAction.UPDATE)
            .withResourceType(ResourceType.QUEUE_NODE)
            .withResourceId(node.getId())
            .build(),
        )
        .build(),
    ]);
    const service = new DirectQueueNodeAuthorizationService(repo);
    expect(service.ensureEmployeeCanDelete(admin.getId(), node.getId())).rejects.toBeInstanceOf(
      EmployeeNotAuthorizedError,
    );
  });
  it("Accepts authorized requests", () => {
    const admin = new OrganizationEmployeeBuilder().build();
    const node = new QueueNodeBuilder().build();
    const repo = new MockAuthorizationRuleRepository([
      new AuthorizationRuleBuilder()
        .withEmployeeId(admin.getId())
        .withPermission(
          new PermissionBuilder()
            .withAction(AuthorizedAction.DELETE)
            .withResourceType(ResourceType.QUEUE_NODE)
            .withResourceId(node.getId())
            .build(),
        )
        .build(),
    ]);
    const service = new DirectQueueNodeAuthorizationService(repo);
    expect(service.ensureEmployeeCanDelete(admin.getId(), node.getId())).resolves.toBeUndefined();
  });
});
