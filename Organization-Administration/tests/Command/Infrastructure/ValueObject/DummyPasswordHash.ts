import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";

export default class DummyPasswordHash extends PasswordHash {
  equals(other: this): boolean {
    return this.passwordHash === other.passwordHash;
  }

  public static create(): DummyPasswordHash {
    return new DummyPasswordHash("hash");
  }

  matches(password: string): Promise<boolean> {
    return Promise.resolve(password === this.passwordHash);
  }
}
