import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";
import PasswordHashFactory from "@app/Command/Domain/Service/PasswordHashFactory";
import bcrypt from "bcrypt";
import BCryptPassowrdHash from "@app/Command/Infrastructure/ValueObject/BCryptPassowrdHash";

export default class BCryptPasswordHashFactory implements PasswordHashFactory {
  async create(password: string): Promise<PasswordHash> {
    const hash = await bcrypt.hash(password, Math.floor(Math.random() * 10) + 1);
    return new BCryptPassowrdHash(hash);
  }
}
