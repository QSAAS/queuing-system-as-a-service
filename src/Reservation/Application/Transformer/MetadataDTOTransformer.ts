import MetadataDTO from "../DataTransferObject/MetadataDTO";
import Metadata from "../../Domain/ValueObject/Metadata";

export default class MetadataDTOTransformer {
    toMetadata(dto: MetadataDTO): Metadata {
        return new Metadata(dto.data);
    }
}
