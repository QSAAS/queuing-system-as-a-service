export default class ValidationError extends Error {
  constructor(m: string) {
    super(`ValidationError: ${m}`);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
