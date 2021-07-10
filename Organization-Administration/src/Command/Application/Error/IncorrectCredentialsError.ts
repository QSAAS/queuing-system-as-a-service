export default class IncorrectCredentialsError extends Error {
  constructor(m: string) {
    super(`IncorrectCredentialsError: ${m}`);
    Object.setPrototypeOf(this, IncorrectCredentialsError.prototype);
  }
}
