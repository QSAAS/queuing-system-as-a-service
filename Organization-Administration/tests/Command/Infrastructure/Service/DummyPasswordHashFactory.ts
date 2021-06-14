import PasswordHashFactory from "@app/Command/Domain/Service/PasswordHashFactory";
import DummyPasswordHash from "@tests/Command/Infrastructure/ValueObject/DummyPasswordHash";
import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";

export default class DummyPasswordHashFactory implements PasswordHashFactory {
  create(password: string): Promise<PasswordHash> {
    return Promise.resolve(new DummyPasswordHash(password));
  }
}
