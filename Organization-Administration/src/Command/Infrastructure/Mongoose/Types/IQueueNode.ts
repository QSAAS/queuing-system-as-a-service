import IMetadataSpecification from "@app/Command/Infrastructure/Mongoose/Types/IMetadataSpecification";
import ITimeSpan from "@app/Command/Infrastructure/Mongoose/Types/ITimeSpan";

export default interface IQueueNode {
  id: string;
  endpointId: string;
  metaSpecs: IMetadataSpecification;
  timeSpan: ITimeSpan;
}
