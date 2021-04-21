import bcrypt from "bcrypt";

class PasswordHash {
  constructor(
    private hash: string,
  ) {
  }

  public async matches(password: String): Promise<boolean> {
    return bcrypt.compare(password, this.hash);
  }
}

export default PasswordHash;
