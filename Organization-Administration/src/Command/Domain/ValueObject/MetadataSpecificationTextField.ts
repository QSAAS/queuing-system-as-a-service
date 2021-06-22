import MetadataSpecificationField from "@app/Command/Domain/ValueObject/MetadataSpecificationField";

export default class MetadataSpecificationTextField extends MetadataSpecificationField {
  constructor(
    name: string,
    isRequired: boolean,
    private maxLength: number,
    private minLength: number,
    private placeholder: string,
  ) {
    super(name, isRequired);
  }

  getMaxLength(): number {
    return this.maxLength;
  }

  getMinLength(): number {
    return this.minLength;
  }

  getPlaceholder(): string {
    return this.placeholder;
  }

  equals(other: this): boolean {
    return (
      this.name === other.name &&
      this.isRequired === other.isRequired &&
      this.maxLength === other.maxLength &&
      this.minLength === other.minLength &&
      this.placeholder === other.placeholder
    );
  }
}
