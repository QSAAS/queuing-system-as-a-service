import { v4 as uuidv4 } from "uuid";
import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";

export default class EntityId extends ValueObject {
  constructor(private id: string) {
    super();
  }

  static from<T extends typeof EntityId>(this: T, id: string): InstanceType<T> {
    return new this(id) as InstanceType<T>;
  }

  static create<T extends typeof EntityId>(this: T): InstanceType<T> {
    const id = uuidv4();
    return new this(id) as InstanceType<T>;
  }

  public toString(): string {
    return this.id;
  }

  equals(other: this): boolean {
    return this.constructor === other.constructor && this.toString() === other.toString();
  }
}
