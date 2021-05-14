import ValueObject from "@app/Command/Domain/ValueObject/ValueObject";

export default abstract class MetadataSpecificationField extends ValueObject {
  protected constructor(protected name: string, protected isRequired: boolean) {
    super();
  }

  getName(): string {
    return this.name;
  }

  getIsRequired(): boolean {
    return this.isRequired;
  }

  setName(name: string) {
    this.name = name;
  }

  setIsRequired(isRequired: boolean) {
    this.isRequired = isRequired;
  }
}
