import IMetadataSpecificationTextField
  from "@app/Command/Infrastructure/Mongoose/Types/IMetadataSpecificationTextField";
import IMetadataSpecificationDropdownField
  from "@app/Command/Infrastructure/Mongoose/Types/IMetadataSpecificationDropdownField";

export default interface IMetadataSpecification{
  fields: (IMetadataSpecificationDropdownField|IMetadataSpecificationTextField)[]
}
