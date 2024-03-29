import MetadataSpecificationField from "@app/Command/Domain/ValueObject/MetadataSpecificationField";
import IMetadataSpecificationField
  from "@app/Command/Infrastructure/Repository/Mongoose/Types/IMetadataSpecificationField";
import MetadataSpecificationTextField from "@app/Command/Domain/ValueObject/MetadataSpecificationTextField";
import IMetadataSpecificationTextField
  from "@app/Command/Infrastructure/Repository/Mongoose/Types/IMetadataSpecificationTextField";
import FieldType from "@app/Command/Infrastructure/Repository/Mongoose/Types/FieldType";
import MetadataSpecificationDropdownField from "@app/Command/Domain/ValueObject/MetadataSpecificationDropdownField";
import IMetadataSpecificationDropdownField
  from "@app/Command/Infrastructure/Repository/Mongoose/Types/IMetadataSpecificationDropdownField";
import GenericTransformer
  from "@app/Command/Infrastructure/Repository/Mongoose/Transformer/Interface/GenericTransformer";

export default class MetadataSpecificationFieldMongooseTransformer
  implements GenericTransformer<IMetadataSpecificationField, MetadataSpecificationField>
{
  mongooseObjectFrom(fieldInstance: MetadataSpecificationField): IMetadataSpecificationField {
    if (fieldInstance instanceof MetadataSpecificationTextField) {
      return this.textFieldToMongooseType(fieldInstance);
    }
    if (fieldInstance instanceof MetadataSpecificationDropdownField) {
      return this.dropdownFieldToMongooseType(fieldInstance);
    }
    throw new Error("Unsupported field type");
  }

  domainInstanceFrom(fieldObject: IMetadataSpecificationField): MetadataSpecificationField {
    if (fieldObject.kind === FieldType.Text) {
      return this.mongooseTypeToTextField(fieldObject as IMetadataSpecificationTextField);
    }
    if (fieldObject.kind === FieldType.Dropdown) {
      return this.mongooseTypeToDropdownField(fieldObject as IMetadataSpecificationDropdownField);
    }


    throw new Error("Unsupported field type");
  }

  private mongooseTypeToTextField(field: IMetadataSpecificationTextField): MetadataSpecificationTextField {

    return new MetadataSpecificationTextField(
      field.name,
      field.isRequired,
      field.maxLength,
      field.minLength,
      field.placeholder,
    );
  }

  private mongooseTypeToDropdownField(field: IMetadataSpecificationDropdownField): MetadataSpecificationDropdownField {
    return new MetadataSpecificationDropdownField(field.name, field.isRequired, field.options);
  }

  private textFieldToMongooseType(field: MetadataSpecificationTextField): IMetadataSpecificationTextField {
    return {
      name: field.getName(),
      isRequired: field.getIsRequired(),
      maxLength: field.getMaxLength(),
      minLength: field.getMinLength(),
      placeholder: field.getPlaceholder(),
      kind: FieldType.Text,
    };
  }

  private dropdownFieldToMongooseType(field: MetadataSpecificationDropdownField): IMetadataSpecificationDropdownField {
    return {
      name: field.getName(),
      isRequired: field.getIsRequired(),
      options: field.getOptions(),
      kind: FieldType.Dropdown,
    };
  }
}
