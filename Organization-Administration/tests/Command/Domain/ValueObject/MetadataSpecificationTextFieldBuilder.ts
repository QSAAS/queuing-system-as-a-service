import MetadataSpecificationTextField from "@app/Command/Domain/ValueObject/MetadataSpecificationTextField";

export default class MetadataSpecificationTextFieldBuilder {
  private name;
  private isRequired;
  private maxLength;
  private minLength;
  private regex;
  private placeholder;

  constructor() {
    this.name = "name";
    this.isRequired = true;
    this.maxLength = 16;
    this.minLength = 4;
    this.regex = "w+";
    this.placeholder = "placeholder";
  }

  withName(val: string) {
    this.name = val;
    return this;
  }

  withIsRequired(val: boolean) {
    this.isRequired = val;
    return this;
  }

  withMaxLength(val: number) {
    this.maxLength = val;
    return this;
  }

  withMinLength(val: number) {
    this.minLength = val;
    return this;
  }

  withRegex(val: string) {
    this.regex = val;
    return this;
  }

  withPlaceholder(val: string) {
    this.placeholder = val;
    return this;
  }

  build() {
    return new MetadataSpecificationTextField(this.name, this.isRequired, this.maxLength,
      this.minLength, this.regex, this.placeholder);
  }
}
