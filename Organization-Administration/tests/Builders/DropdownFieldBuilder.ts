import MetadataSpecificationDropdownField from "@app/Command/Domain/ValueObject/MetadataSpecificationDropdownField";

export default class DropdownFieldBuilder {
  private readonly dropdown: MetadataSpecificationDropdownField;

  constructor() {
    this.dropdown = new MetadataSpecificationDropdownField("name",
      true,
      ["option_1", "option_2"]);
  }

  name(name: string) {
    this.dropdown.setName(name);
    return this;
  }

  isRequired(isRequired: boolean) {
    this.dropdown.setIsRequired(isRequired);
    return this;
  }

  options(options: string[]) {
    this.dropdown.setOptions(options);
    return this;
  }

  build() {
    return this.dropdown;
  }
}
