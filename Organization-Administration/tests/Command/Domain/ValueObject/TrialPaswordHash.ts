import PasswordHash from "@app/Command/Domain/ValueObject/PasswordHash";

export default class TrialPaswordHash extends PasswordHash {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(passwordHash: string) {
    super(passwordHash);
  }

  // we ignore this eslint error bec, it's dump class
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  equals(other: this): boolean {
    return false;
  }
}
