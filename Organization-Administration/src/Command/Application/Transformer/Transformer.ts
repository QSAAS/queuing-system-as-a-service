export default interface Transformer<T, U> {
  toDTO(object: T): U;
  toObject(dto: U): T;
}
