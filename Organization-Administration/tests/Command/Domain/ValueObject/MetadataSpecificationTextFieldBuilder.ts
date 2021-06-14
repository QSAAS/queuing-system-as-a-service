import MetadataSpecificationTextField from "@app/Command/Domain/ValueObject/MetadataSpecificationTextField";

export default class MetadataSpecificationTextFieldBuilder {
  private name;
  private isRequired;
  private maxLength;
  private minLength;
  private regex: RegExp;
  private placeholder;

  constructor() {
    this.name = "text_name";
    this.isRequired = true;
    this.maxLength = 16;
    this.minLength = 4;
    this.regex = new RegExp("/w+/");
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

  withRegex(val: RegExp) {
    this.regex = val;
    return this;
  }

  withPlaceholder(val: string) {
    this.placeholder = val;
    return this;
  }

  build() {
    return new MetadataSpecificationTextField(
      this.name,
      this.isRequired,
      this.maxLength,
      this.minLength,
      this.regex,
      this.placeholder,
    );
  }
}
