export default class DependencyInjectionContainer<T extends number | string> {
  private container: Map<string, object>;

  constructor() {
    this.container = new Map<string, object>();
  }

  register(key: T, obj: object): void {
    this.container.set(key.toString(), obj);
  }

  resolve<U>(key: T): U {
    if (!this.container.has(key.toString())) {
      throw new Error(`Class type with T value "${key}" not set inside container`);
    }
    return this.container.get(key.toString()) as any;
  }

  async addDefinitions(definitions: DependencyDefinitions<T>) {
    const notInitializedKeys = Object.keys(definitions);
    let iterations = 0;
    while (notInitializedKeys.length > 0) {
      if (iterations === notInitializedKeys.length) {
        throw new Error("Cannot resolve dependencies, check for circular dependencies");
      }
      const key = notInitializedKeys[0];
      const create = definitions[key as unknown as T];
      try {
        // eslint-disable-next-line no-await-in-loop
        const object = await create(this);
        this.container.set(key, object);
        notInitializedKeys.shift();
        iterations = 0;
      } catch (error) {
        const elem = notInitializedKeys.shift()!;
        notInitializedKeys.push(elem);
        iterations += 1;
      }
    }
  }
}
export type DependencyDefinitions<T extends number | string> = {
  [key in T]: (container: DependencyInjectionContainer<T>) => any;
};
