import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";
import bcrypt from "bcrypt";

export default class BCryptPassowrdHash extends PasswordHash {
  equals(other: this): boolean {
    return this.passwordHash === other.passwordHash;
  }

  async matches(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}
