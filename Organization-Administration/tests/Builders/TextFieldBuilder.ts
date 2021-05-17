import MetadataSpecificationTextField from "@app/Command/Domain/ValueObject/MetadataSpecificationTextField";

const name = "name";
const isRequired = true;
const maxLength = 16;
const minLength = 4;
const regex = "w+";
const placeholder = "placeholder";

export default class TextFieldBuilder {
  private textField: MetadataSpecificationTextField;

  constructor() {
    this.textField = new MetadataSpecificationTextField(name, isRequired, maxLength, minLength, regex, placeholder);
  }

  name(val: string) {
    this.textField = new MetadataSpecificationTextField(val, isRequired, maxLength, minLength, regex, placeholder);
    return this;
  }

  isRequired(val: boolean) {
    this.textField = new MetadataSpecificationTextField(name, val, maxLength, minLength, regex, placeholder);
    return this;
  }

  maxLength(val: number) {
    this.textField = new MetadataSpecificationTextField(name, isRequired, val, minLength, regex, placeholder);
    return this;
  }

  minLength(val: number) {
    this.textField = new MetadataSpecificationTextField(name, isRequired, maxLength, val, regex, placeholder);
    return this;
  }

  regex(val: string) {
    this.textField = new MetadataSpecificationTextField(name, isRequired, maxLength, minLength, val, placeholder);
    return this;
  }

  placeholder(val: string) {
    this.textField = new MetadataSpecificationTextField(name, isRequired, maxLength, minLength, regex, val);
    return this;
  }

  build() {
    return this.textField;
  }
}
