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
  /* TODO imo this is not the best way to test this;
  *   because it assumes that the last event added is added because of the setter methods,
  *   indeed the last event could be an instance of QueueNodeUpdated, but we can't be sure that it was added because of the setters
  *   to test this function correctly we must achieve the following:
  *   1- Make sure an event has been raised (perhaps be comparing the size of the events array before and after setters are called?)
  *   2- Make sure that an event of the correct type has been raised
  *   3- Make sure that this event was atomically raised (no other events were raised while said event was being raised)
   */

  it("Should raise QueueNodeUpdated event on setOperatingTimes", () => {
    const node = new AdministratedQueueNodeBuilder().build();
    node.setOperatingTimes(new TimeSpanBuilder().build());
    const events = node.getRaisedEvents();

    expect(events.length && events[events.length - 1] instanceof QueueNodeUpdated).toBeTruthy();
  });

  it("Should raise QueueNodeUpdated event on setMetaDataSpecification", () => {
    const node = new AdministratedQueueNodeBuilder().build();
    node.setMetaDataSpecification(new MetadataSpecification([]));
    const events = node.getRaisedEvents();

    expect(events.length && events[events.length - 1] instanceof QueueNodeUpdated).toBeTruthy();
  });
});
