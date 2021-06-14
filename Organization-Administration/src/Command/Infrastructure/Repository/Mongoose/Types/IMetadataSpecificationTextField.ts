import FieldType from "@app/Command/Infrastructure/Repository/Mongoose/Types/FieldType";
import IMetadataSpecificationField from "@app/Command/Infrastructure/Repository/Mongoose/Types/IMetadataSpecificationField";

export default interface IMetadataSpecificationTextField extends IMetadataSpecificationField {
  maxLength: number;
  minLength: number;
  regex: string;
  placeholder: string;
  kind: FieldType.Text;
}
