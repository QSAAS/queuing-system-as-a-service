import MetadataSpecificationTextField from "@app/Command/Domain/ValueObject/MetadataSpecificationTextField";

export default class TextFieldBuilder {
  private readonly textField: MetadataSpecificationTextField;
  constructor() {
    this.textField = new MetadataSpecificationTextField("name",
      true,
      16,
      4,
      "w+",
      "placeholder");
  }

  name(name: string) {
    this.textField.setName(name);
    return this;
  }

  isRequired(isRequired: boolean) {
    this.textField.setIsRequired(isRequired);
    return this;
  }

  maxLength(value: number) {
    this.textField.setMaxLength(value);
    return this;
  }

  minLength(value: number) {
    this.textField.setMinLength(value);
    return this;
  }

  regex(value: string) {
    this.textField.setRegex(value);
    return this;
  }

  placeholder(value: string) {
    this.textField.setPlaceHolder(value);
    return this;
  }

  build() {
    return this.textField;
  }
}
