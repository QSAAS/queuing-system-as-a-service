import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";

export default interface PasswordHashFactory {
  create(password: string): Promise<PasswordHash>;
}
