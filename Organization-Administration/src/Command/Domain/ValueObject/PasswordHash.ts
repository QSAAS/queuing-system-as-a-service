export default class PasswordHash {
  // todo i think this should be value instead
  public passwordHash: string;

  constructor(passwordHash:string) {
    this.passwordHash = passwordHash;
  }

  public toString(): string {
    return this.passwordHash;
  }
}
