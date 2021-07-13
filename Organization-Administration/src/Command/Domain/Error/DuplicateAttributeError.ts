export default class DuplicateAttributeError extends Error {
  constructor(m: string) {
    super(`DuplicateAttributeError: ${m}`);
    Object.setPrototypeOf(this, DuplicateAttributeError.prototype);
  }
}
