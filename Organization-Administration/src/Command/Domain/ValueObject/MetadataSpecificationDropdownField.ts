import MetadataSpecificationField from "@app/Command/Domain/ValueObject/MetadataSpecificationField";

export default class MetadataSpecificationDropdownField extends MetadataSpecificationField {
  constructor(name: string, isRequired: boolean, private options: string[]) {
    super(name, isRequired);
  }

  getOptions(): string[] {
    return this.options;
  }

  equals(other: this): boolean {
    return (
      this.name === other.name &&
      this.isRequired === other.isRequired &&
      this.options.length === other.options.length &&
      this.options.every((element, index) => element === other.options[index])
    );
  }
}
