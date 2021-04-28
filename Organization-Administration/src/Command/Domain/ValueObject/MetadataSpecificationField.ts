import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";

export default class MetadataSpecificationField extends ValueObject {
  constructor(private name: string, private _isRequired: boolean) {
    super();
  }

  getName(): string {
    return this.name;
  }

  get isRequired(): boolean {
    // eslint-disable-next-line no-underscore-dangle
    return this._isRequired;
  }

  // TODO why is this a class not an interface or an abstract class? do we need instances of this class?
  // Classes that inherit this class (e.g. MetaDataSpecificationTextField) inherit this equals function,
  // therefore they are not forced to implement it
  // if someone forgot to implement equals() for subclasses, there will be a problem
  equals(other: this): boolean {
    throw new Error("Method not implemented");
  }
}
