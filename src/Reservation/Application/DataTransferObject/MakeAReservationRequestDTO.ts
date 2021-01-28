import MetadataDTO from "./MetadataDTO";

export default class MakeAReservationRequestDTO {
    public queuingNodeId: string;
    public customerId: string;
    public metaDataDTO: MetadataDTO;

    constructor(queuingNodeId: string, customerId: string, metaDataDTO: MetadataDTO) {
        this.queuingNodeId = queuingNodeId;
        this.customerId = customerId;
        this.metaDataDTO = metaDataDTO;
    }
}
