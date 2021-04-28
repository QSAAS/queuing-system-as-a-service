import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";
import MetadataSpecificationField from "@app/Command/Domain/ValueObject/MetadataSpecificationField";

export default class MetadataSpecification extends ValueObject {
  constructor(private fields: MetadataSpecificationField[]) {
    super();
  }

  equals(other: this): boolean {
    if (this.fields === other.fields) {
      return true;
    }
    if ((!this.fields || !other.fields) || (this.fields.length !== other.fields.length)) {
      return false;
    }

    // order matters, if both arrays have the same elements but in different positions, this function will return false
    for (let i = 0; i < this.fields.length; i++) {
      if (!this.fields[i].equals(other.fields[i])) {
        return false;
      }
    }

    return true;
  }
}
