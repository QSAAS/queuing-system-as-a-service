import MetadataSpecificationField from "@app/Command/Domain/ValueObject/MetadataSpecificationField";

export default class MetadataSpecificationTextField extends MetadataSpecificationField {
  constructor(name: string, isRequired: boolean, private maxLength: number, private minLength: number,
    private regex: string, private placeholder: string) {
    super(name, isRequired);
  }

  getMaxLength(): number {
    return this.maxLength;
  }

  getMinLength(): number {
    return this.minLength;
  }

  getRegex(): string {
    return this.regex;
  }

  getPlaceholder(): string {
    return this.placeholder;
  }
}
