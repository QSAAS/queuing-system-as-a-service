import MetadataSpecificationFieldDTO
  from "@app/Command/Application/DataTransferObject/Object/MetadataSpecificationFieldDTO";
import TimeSpanDTO from "@app/Command/Application/DataTransferObject/Object/TimeSpanDTO";

export default class CreateQueueNodeRequest {
  constructor(public adminId: string,
              public endpointId: string,
              public metaSpecs: MetadataSpecificationFieldDTO[],
              public timeSpan: TimeSpanDTO) {}
}
