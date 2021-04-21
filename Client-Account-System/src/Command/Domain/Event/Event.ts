class Event {
  private createdAt: Date;
  constructor() {
    this.createdAt = new Date(Date.now());
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}

export default Event;
