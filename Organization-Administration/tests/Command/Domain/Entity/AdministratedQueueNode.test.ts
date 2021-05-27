/* eslint-disable max-classes-per-file */
/* eslint-disable max-len */
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import TimeSpanBuilder from "@tests/Command/Domain/ValueObject/TimeSpanBuilder";
import AdministratedQueueNodeMother from "@tests/Command/Domain/Entity/AdministratedQueueNodeMother";
import AdministratedQueueNodeBuilder from "@tests/Command/Domain/Entity/AdministratedQueueNodeBuilder";
import QueueNodeUpdated from "@app/Command/Domain/Event/QueueNodeUpdated";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";

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
    expect(eventsArrayContains(events, QueueNodeUpdated, (event) => event.getQueueNode().getTimeSpan() === span)).toBe(true);
  });

  it("Should raise QueueNodeUpdated event on setMetaDataSpecification", () => {
    const node = new AdministratedQueueNodeBuilder().build();
    const meta = new MetadataSpecification([]);
    node.setMetaDataSpecification(meta);
    const events = node.getRaisedEvents();
    expect(eventsArrayContains(events, QueueNodeUpdated, (event) => event.getQueueNode().getMetaSpecs() === meta)).toBe(true);
  });
});
