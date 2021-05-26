/* eslint-disable max-classes-per-file */
/* eslint-disable max-len */
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import TimeSpanBuilder from "@tests/Builders/TimeSpanBuilder";
import AdministratedQueueNodeMother from "@tests/Builders/AdministratedQueueNodeMother";
import AdministratedQueueNodeBuilder from "@tests/Builders/AdministratedQueueNodeBuilder";
import QueueNodeUpdated from "@app/Command/Domain/Event/QueueNodeUpdated";

describe("Valid Authorization", () => {
  const node = AdministratedQueueNodeMother.withPassingAuth().build();

  it("Should not throw EmployeeNotAuthorizedError on valid authorization service", () => {
    expect(() => {
      node.setOperatingTimes(new TimeSpanBuilder().build());
    }).not.toThrow(EmployeeNotAuthorizedError);

    expect(() => {
      node.setMetaDataSpecification(new MetadataSpecification([]));
    }).not.toThrow(EmployeeNotAuthorizedError);
  });
});

describe("Invalid Authorization", () => {
  const node = AdministratedQueueNodeMother.withFailingAuth().build();

  it("Should throw EmployeeNotAuthorizedError on invalid authorization service", () => {
    expect(() => {
      node.setOperatingTimes(new TimeSpanBuilder().build());
    }).toThrow(EmployeeNotAuthorizedError);

    expect(() => {
      node.setMetaDataSpecification(new MetadataSpecification([]));
    }).toThrow(EmployeeNotAuthorizedError);
  });
});

describe("Events", () => {
  it("Should raise QueueNodeUpdated event on setOperatingTimes", () => {
    const node = new AdministratedQueueNodeBuilder().build();
    const span = new TimeSpanBuilder().build();
    node.setOperatingTimes(span);
    const events = node.getRaisedEvents();

    const hasEvent = events.reduce((acc, curr) => (curr instanceof QueueNodeUpdated && curr.getQueueNode().getTimeSpan() === span) || acc, false);

    expect(hasEvent).toBeTruthy();
  });

  it("Should raise QueueNodeUpdated event on setMetaDataSpecification", () => {
    const node = new AdministratedQueueNodeBuilder().build();
    const meta = new MetadataSpecification([]);
    node.setMetaDataSpecification(meta);
    const events = node.getRaisedEvents();

    const hasEvent = events.reduce((acc, curr) => (curr instanceof QueueNodeUpdated && curr.getQueueNode().getMetaSpecs() === meta) || acc, false);

    expect(hasEvent).toBeTruthy();
  });
});
