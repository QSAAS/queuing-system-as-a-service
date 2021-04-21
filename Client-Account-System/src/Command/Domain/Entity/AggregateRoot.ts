import Event from "@app/Command/Domain/Event/Event";

class AggregateRoot {
  private events: Event[];

  constructor() {
    this.events = [];
  }

  public raiseEvent(event: Event): void {
    this.events.push(event);
  }

  public getAllEvent(): Event[] {
    return this.events;
  }
}

export default AggregateRoot;
