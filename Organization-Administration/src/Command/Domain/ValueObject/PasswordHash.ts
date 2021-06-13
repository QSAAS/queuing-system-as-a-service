import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";

export default abstract class PasswordHash extends ValueObject {
  private readonly passwordHash: string;

  protected constructor(passwordHash:string) {
    super();
    this.passwordHash = passwordHash;
  }

  public toString(): string {
    return this.passwordHash;
  }
}
