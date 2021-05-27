import MetadataSpecificationDropdownField from "@app/Command/Domain/ValueObject/MetadataSpecificationDropdownField";

export default class MetadataSpecificationDropdownFieldBuilder {
  private isRequired: boolean;
  private options: string[];
  private name: string;

  constructor() {
    this.isRequired = true;
    this.options = ["option_1", "option_2"];
    this.name = "name";
  }

  withName(val: string) {
    this.name = val;
    return this;
  }

  withIsRequired(val: boolean) {
    this.isRequired = val;
    return this;
  }

  withOptions(val: string[]) {
    this.options = val;
    return this;
  }

  build() {
    return new MetadataSpecificationDropdownField(this.name, this.isRequired, this.options);
  }
}
