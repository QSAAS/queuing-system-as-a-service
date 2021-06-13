import PermissionMother from "@tests/Command/Domain/ValueObject/PermissionMother";
import EntityIdMother from "@tests/Command/Domain/ValueObject/EntityIdMother";
import Permission from "@app/Command/Domain/ValueObject/Permission";
import PermissionBuilder from "@tests/Command/Domain/ValueObject/PermissionBuilder";
import AuthorizedAction from "@app/Command/Domain/Enum/AuthorizedAction";
import ResourceType from "@app/Command/Domain/Enum/ResourceType";

describe("Permission", () => {
  describe("equals", () => {
    it("Returns true on equal permissions with non-null resourceIds", () => {
      const p1 = PermissionMother
        .withNullResourceId()
        .withResourceId(EntityIdMother.complete().withId("id").build())
        .build();
      const p2 = PermissionMother
        .withNullResourceId()
        .withResourceId(EntityIdMother.complete().withId("id").build())
        .build();
      expect(p1.equals(p2)).toBeTruthy();
    });

    it("Returns true on equal permissions with null resourceIds", () => {
      const p1 = PermissionMother
        .withNullResourceId()
        .build();
      const p2 = PermissionMother
        .withNullResourceId()
        .build();
      expect(p1.equals(p2)).toBeTruthy();
    });

    it("Returns false on unequal resourceIds", () => {
      const p1 = PermissionMother
        .withNullResourceId()
        .withResourceId(EntityIdMother.complete().withId("id1").build())
        .build();
      const p2 = PermissionMother
        .withNullResourceId()
        .withResourceId(EntityIdMother.complete().withId("id2").build())
        .build();
      expect(p1.equals(p2)).toBeFalsy();
    });

    it("Returns false when first resourceId is null", () => {
      const p1 = PermissionMother
        .withNullResourceId()
        .build();
      const p2 = PermissionMother
        .withNullResourceId()
        .withResourceId(EntityIdMother.complete().build()).build();
      expect(p1.equals(p2)).toBeFalsy();
    });

    it("Returns false when second resourceId is null", () => {
      const p1 = PermissionMother
        .withNullResourceId()
        .withResourceId(EntityIdMother.complete().build())
        .build();
      const p2 = PermissionMother
        .withNullResourceId()
        .build();
      expect(p1.equals(p2)).toBeFalsy();
    });

    it("Returns false on unequal resource types", () => {
      const p1 = PermissionMother
        .withNullResourceId()
        .withResourceType(ResourceType.QUEUE_NODE)
        .build();
      const p2 = PermissionMother
        .withNullResourceId()
        .withResourceType(ResourceType.ENDPOINT)
        .build();
      expect(p1.equals(p2)).toBeFalsy();
    });
    it("Returns false on unequal actions", () => {
      const p1 = PermissionMother
        .withNullResourceId()
        .withAction(AuthorizedAction.CREATE)
        .build();
      const p2 = PermissionMother
        .withNullResourceId()
        .withAction(AuthorizedAction.MANAGE)
        .build();
      expect(p1.equals(p2)).toBeFalsy();
    });
  });

  describe("Factory functions", () => {
    const resourceType = ResourceType.QUEUE_NODE;
    const id = EntityIdMother.complete().build();
    let builder: PermissionBuilder;
    beforeEach(() => {
      builder = PermissionMother
        .withNullResourceId()
        .withResourceId(id)
        .withResourceType(resourceType);
    });

    it("Returns create permission", () => {
      const p = Permission.newCreate(resourceType);
      expect(p).toEqual(builder
        .withResourceId(null)
        .withAction(AuthorizedAction.CREATE)
        .build());
    });

    it("Returns update permission", () => {
      const p = Permission.newUpdate(resourceType, id);
      expect(p).toEqual(builder
        .withAction(AuthorizedAction.UPDATE)
        .build());
    });

    it("Returns delete permission", () => {
      const p = Permission.newDelete(resourceType, id);
      expect(p).toEqual(builder
        .withAction(AuthorizedAction.DELETE)
        .build());
    });

    it("Returns manage permission", () => {
      const p = Permission.newManage(resourceType, id);
      expect(p).toEqual(builder
        .withAction(AuthorizedAction.MANAGE)
        .build());
    });
  });
});
