export default interface EventListener<T> {
  execute(event: T): Promise<void>;
}
