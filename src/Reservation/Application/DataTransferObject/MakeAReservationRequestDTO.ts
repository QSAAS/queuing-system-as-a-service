import MetadataDTO from "./MetadataDTO";

export default class MakeAReservationRequestDTO {
    public queuingNodeId: string;
    public customerId: string;
    public metaDataDTO: MetadataDTO;

    constructor() {
        this.queuingNodeId = "";
        this.customerId = "";
        this.metaDataDTO = new MetadataDTO();
    }
}