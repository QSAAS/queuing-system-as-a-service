import MetadataSpecificationField from "@app/Command/Domain/ValueObject/MetadataSpecificationField";

export default class MetadataSpecificationDropdownField extends MetadataSpecificationField {
  constructor(name: string, isRequired: boolean, private options: string[]) {
    super(name, isRequired);
  }

  getOptions(): string[] {
    return this.options;
  }
}
