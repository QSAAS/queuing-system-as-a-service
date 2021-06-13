import DomainEvent from "@app/Command/Domain/Event/DomainEvent";
import eventsArrayContains from "@tests/Utils/eventsArrayContains";

class DummyEventType extends DomainEvent {
  private n: number;

  constructor(n: number) {
    super();
    this.n = n;
  }

  getN() {
    return this.n;
  }
}

describe("Can check events", () => {
  it("Returns false when the event is not raised", () => {
    const events: DomainEvent[] = [];
    expect(eventsArrayContains(events, DummyEventType, (event) => event.getN() === 10))
      .toBe(false);
    events.push(new DummyEventType(20));
    expect(eventsArrayContains(events, DummyEventType, (event) => event.getN() === 10))
      .toBe(false);
  });

  it("Returns true when the event is not raised", () => {
    const events: DomainEvent[] = [new DummyEventType(20)];
    expect(eventsArrayContains(events, DummyEventType, (event) => event.getN() === 20))
      .toBe(true);
  });
});
