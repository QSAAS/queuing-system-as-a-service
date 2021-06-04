import MetadataSpecificationField from "@app/Command/Domain/ValueObject/MetadataSpecificationField";
import MetadataSpecificationDropdownFieldBuilder
  from "@tests/Command/Domain/ValueObject/MetadataSpecificationDropdownFieldBuilder";
import MetadataSpecificationTextFieldBuilder
  from "@tests/Command/Domain/ValueObject/MetadataSpecificationTextFieldBuilder";
import MetadataSpecification from "@app/Command/Domain/ValueObject/MetadataSpecification";

export default class MetadataSpecificationBuilder {
  private fields: MetadataSpecificationField[];
  constructor() {
    this.fields = [new MetadataSpecificationDropdownFieldBuilder().build(),
      new MetadataSpecificationTextFieldBuilder().build()];
  }

  withFields(fields: MetadataSpecificationField[]) {
    this.fields = fields;
    return this;
  }

  build() {
    return new MetadataSpecification(this.fields);
  }
}
