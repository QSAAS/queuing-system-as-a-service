/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AdministratedQueueNode, { OrganizationEmployee } from "@app/Command/Domain/Entity/AdminsistratedQueueNode";
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import QueueNodeAuthorizationService from "@app/Command/Domain/Service/QueueNodeAuthorizationService";
import OrganizationEmployeeId from "@app/Command/Domain/ValueObject/OrganizationEmployeeId";
import QueueNodeId from "@app/Command/Domain/ValueObject/QueueNodeId";
import QueueNode from "@app/Command/Domain/Entity/QueueNode";
import OrganizationEndpointId from "@app/Command/Domain/ValueObject/OrganizationEndpointId";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import TimeSpanBuilder from "@tests/Builders/TimeSpanBuilder";

class AlwaysAuthorizing implements QueueNodeAuthorizationService {
  ensureEmployeeCanCreate(employeeId: OrganizationEmployeeId): void {}

  ensureEmployeeCanDelete(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): void {}

  ensureEmployeeCanUpdate(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): void {}
}

class AlwaysNotAuthorizing implements QueueNodeAuthorizationService {
  ensureEmployeeCanCreate(employeeId: OrganizationEmployeeId): void {
    throw new EmployeeNotAuthorizedError();
  }

  ensureEmployeeCanDelete(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): void {
    throw new EmployeeNotAuthorizedError();
  }

  ensureEmployeeCanUpdate(employeeId: OrganizationEmployeeId, queueNodeId: QueueNodeId): void {
    throw new EmployeeNotAuthorizedError();
  }
}

class Admin implements OrganizationEmployee {
  constructor(private id: OrganizationEmployeeId) {}

  getId(): OrganizationEmployeeId {
    return this.id;
  }
} // TODO remove after merging

const queueNode = new QueueNode(
  QueueNodeId.create(),
  OrganizationEndpointId.create(),
  new MetadataSpecification([]),
  new TimeSpanBuilder().build(),
);

const admin = new Admin(OrganizationEmployeeId.create());

describe("Authorizing", () => {
  const node = new AdministratedQueueNode(
    admin,
    queueNode,
    new AlwaysAuthorizing(),
  );

  it("Should not throw EmployeeNotAuthorizedError on valid authorization service", () => {
    expect(() => {
      node.setOperatingTimes(new TimeSpanBuilder().build());
    }).not.toThrow(EmployeeNotAuthorizedError);

    expect(() => {
      node.setMetaDataSpecification(new MetadataSpecification([]));
    }).not.toThrow(EmployeeNotAuthorizedError);
  });
});

describe("Not Authorizing", () => {
  const node = new AdministratedQueueNode(
    admin,
    queueNode,
    new AlwaysNotAuthorizing(),
  );

  it("Should throw EmployeeNotAuthorizedError on invalid authorization service", () => {
    expect(() => {
      node.setOperatingTimes(new TimeSpanBuilder().build());
    }).toThrow(EmployeeNotAuthorizedError);

    expect(() => {
      node.setMetaDataSpecification(new MetadataSpecification([]));
    }).toThrow(EmployeeNotAuthorizedError);
  });
});
