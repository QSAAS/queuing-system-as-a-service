export default abstract class DomainEvent {
  private createdAt: Date;
  private eventName: string;

  protected constructor() {
    this.createdAt = new Date(Date.now());
    this.eventName = this.constructor.name;
  }
}
