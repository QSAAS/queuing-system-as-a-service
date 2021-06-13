import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";

export default abstract class PasswordHash extends ValueObject {
  // todo i think this should be value instead
  private readonly passwordHash: string;

  protected constructor(passwordHash:string) {
    super();
    this.passwordHash = passwordHash;
  }

  public toString(): string {
    return this.passwordHash;
  }
}
