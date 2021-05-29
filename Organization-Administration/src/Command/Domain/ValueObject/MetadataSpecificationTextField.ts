import MetadataSpecificationField from "@app/Command/Domain/ValueObject/MetadataSpecificationField";

export default class MetadataSpecificationTextField extends MetadataSpecificationField {
  constructor(name: string,
    isRequired: boolean,
    private maxLength: number,
    private minLength: number,
    private regex: string, // TODO use RegExp?
    private placeholder: string) {
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

  equals(other: this): boolean {
    return this.name === other.name
        && this.isRequired === other.isRequired
        && this.maxLength === other.maxLength
        && this.minLength === other.minLength
        && this.regex === other.regex
        && this.placeholder === other.placeholder;
  }

  toPlainObject() { // TODO move this function to parent and spread on super().toPlainObject()
    return {
      name: this.name,
      isRequired: this.isRequired,
      maxLength: this.maxLength,
      minLength: this.minLength,
      regex: this.regex,
      placeholder: this.placeholder,
    };
  }
}
