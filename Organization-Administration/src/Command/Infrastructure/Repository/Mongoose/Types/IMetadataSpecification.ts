import IMetadataSpecificationField from "@app/Command/Infrastructure/Repository/Mongoose/Types/IMetadataSpecificationField";

export default interface IMetadataSpecification {
  fields: IMetadataSpecificationField[];
}
