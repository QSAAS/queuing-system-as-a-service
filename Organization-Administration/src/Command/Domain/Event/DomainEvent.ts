export default abstract class DomainEvent {
  private createdAt: Date;

  protected constructor() {
    this.createdAt = new Date(Date.now());
  }
}
