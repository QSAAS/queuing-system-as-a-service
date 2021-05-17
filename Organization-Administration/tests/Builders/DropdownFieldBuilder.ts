import MetadataSpecificationDropdownField from "@app/Command/Domain/ValueObject/MetadataSpecificationDropdownField";

const isRequired = true;
const options = ["option_1", "option_2"];
const name = "name";

export default class DropdownFieldBuilder {
  private dropdown: MetadataSpecificationDropdownField;

  constructor() {
    this.dropdown = new MetadataSpecificationDropdownField(name, isRequired, options);
  }

  name(val: string) {
    this.dropdown = new MetadataSpecificationDropdownField(val, isRequired, options);
    return this;
  }

  isRequired(val: boolean) {
    this.dropdown = new MetadataSpecificationDropdownField(name, val, options);
    return this;
  }

  options(val: string[]) {
    this.dropdown = new MetadataSpecificationDropdownField(name, isRequired, val);
    return this;
  }

  build() {
    return this.dropdown;
  }
}
