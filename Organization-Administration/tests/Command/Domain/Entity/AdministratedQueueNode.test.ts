/* eslint-disable max-classes-per-file */
/* eslint-disable max-len */
import EmployeeNotAuthorizedError from "@app/Command/Domain/Error/EmployeeNotAuthorizedError";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";
import TimeSpanBuilder from "@tests/Command/Domain/ValueObject/Builder/TimeSpanBuilder";
import AdministratedQueueNodeMother from "@tests/Command/Domain/Entity/Mother/AdministratedQueueNodeMother";
import AdministratedQueueNodeBuilder from "@tests/Command/Domain/Entity/Builder/AdministratedQueueNodeBuilder";
import QueueNodeUpdated from "@app/Command/Domain/Event/QueueNodeUpdated";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";

describe("Valid Authorization", () => {
  const node = AdministratedQueueNodeMother.withPassingAuth().build();

  it("Should not throw EmployeeNotAuthorizedError on valid authorization service", () => {
    expect(() => {
      node.setOperatingTimes(new TimeSpanBuilder().build());
    }).not.toThrow(EmployeeNotAuthorizedError);
    expect(node.setOperatingTimes(new TimeSpanBuilder().build())).resolves.toBeUndefined();
    expect(node.setMetaDataSpecification(new MetadataSpecification([]))).resolves.toBeUndefined();
  });
});

describe("Invalid Authorization", () => {
  const node = AdministratedQueueNodeMother.withFailingAuth().build();

  it("Should throw EmployeeNotAuthorizedError on invalid authorization service", () => {
    expect(node.setOperatingTimes(new TimeSpanBuilder().build())).rejects.toBeInstanceOf(EmployeeNotAuthorizedError);
    expect(node.setMetaDataSpecification(new MetadataSpecification([]))).rejects.toBeInstanceOf(
      EmployeeNotAuthorizedError,
    );
  });
});

describe("Events", () => {
  it("Should raise QueueNodeUpdated event on setOperatingTimes", async () => {
    const node = new AdministratedQueueNodeBuilder().build();
    const span = new TimeSpanBuilder().build();
    await node.setOperatingTimes(span);
    const events = node.getRaisedEvents();
    expect(eventsArrayContains(events, QueueNodeUpdated, (event) => event.getQueueNode().getTimeSpan() === span)).toBe(
      true,
    );
  });

  it("Should raise QueueNodeUpdated event on setMetaDataSpecification", async () => {
    const node = new AdministratedQueueNodeBuilder().build();
    const meta = new MetadataSpecification([]);
    await node.setMetaDataSpecification(meta);
    const events = node.getRaisedEvents();
    expect(eventsArrayContains(events, QueueNodeUpdated, (event) => event.getQueueNode().getMetaSpecs() === meta)).toBe(
      true,
    );
  });
});
