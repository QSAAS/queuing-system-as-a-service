import IMetadataSpecificationField from "@app/Command/Infrastructure/Mongoose/Types/IMetadataSpecificationField";

export default interface IMetadataSpecification {
  fields: IMetadataSpecificationField[];
}
