import FieldType from "@app/Command/Infrastructure/Mongoose/Types/FieldType";

export default interface IMetadataSpecificationField {
  name: string;
  isRequired: boolean;
  kind: FieldType;
}
