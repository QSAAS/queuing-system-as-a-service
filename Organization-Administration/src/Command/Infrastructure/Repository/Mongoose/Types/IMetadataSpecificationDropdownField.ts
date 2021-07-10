import FieldType from "@app/Command/Infrastructure/Repository/Mongoose/Types/FieldType";
import IMetadataSpecificationField from "@app/Command/Infrastructure/Repository/Mongoose/Types/IMetadataSpecificationField";

export default interface IMetadataSpecificationDropdownField extends IMetadataSpecificationField {
  options: string[];
  kind: FieldType.Dropdown;
}
