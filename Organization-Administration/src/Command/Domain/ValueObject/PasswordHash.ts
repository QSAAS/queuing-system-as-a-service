import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";

export default abstract class PasswordHash extends ValueObject {
  protected readonly passwordHash: string;

  public constructor(passwordHash: string) {
    super();
    this.passwordHash = passwordHash;
  }

  public toString(): string {
    return this.passwordHash;
  }

  public abstract matches(passowrd: string): Promise<boolean>;
}
