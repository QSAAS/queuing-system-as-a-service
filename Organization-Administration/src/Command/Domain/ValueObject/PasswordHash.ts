export default abstract class PasswordHash {
  // todo i think this should be value instead
  private readonly passwordHash: string;

  protected constructor(passwordHash:string) {
    this.passwordHash = passwordHash;
  }

  public toString(): string {
    return this.passwordHash;
  }
}
