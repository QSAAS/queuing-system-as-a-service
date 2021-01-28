import QueuingNodeRepository from "../../Domain/Repositories/QueuingNodeRepository";
import ReservationRepository from "../../Domain/Repositories/ReservationRepository";
import ReservationDTOTransformer from "../Transformer/ReservationDTOTransformer";
import ReservationFactory from "../../Domain/Factory/ReservationFactory";
import MakeAReservationRequestDTO from "../DataTransferObject/MakeAReservationRequestDTO";
import ReservationResponseDTO from "../DataTransferObject/ReservationResponseDTO";
import QueuingNodeId from "../../Domain/ValueObject/QueuingNodeId";
import MetadataDTOTransformer from "../Transformer/MetadataDTOTransformer";
import MetadataNotPassingSpecificationError from "../Exception/MetadataNotPassingSpecificationError";
import CustomerId from "../../Domain/ValueObject/CustomerId";

export default class MakeAReservationService {
    private queuingNodeRepository: QueuingNodeRepository;
    private reservationRepository: ReservationRepository;
    private reservationDTOTransformer: ReservationDTOTransformer;
    private metadataTransformer: MetadataDTOTransformer;
    private reservationFactory: ReservationFactory;

    constructor(
        queuingNodeRepository: QueuingNodeRepository,
        reservationRepository: ReservationRepository,
        reservationDTOTransformer: ReservationDTOTransformer,
        metadataTransformer: MetadataDTOTransformer,
        reservationFactory: ReservationFactory,
    ) {
        this.queuingNodeRepository = queuingNodeRepository;
        this.reservationRepository = reservationRepository;
        this.reservationDTOTransformer = reservationDTOTransformer;
        this.metadataTransformer = metadataTransformer;
        this.reservationFactory = reservationFactory;
    }

    run(request: MakeAReservationRequestDTO): ReservationResponseDTO {
        const queuingNodeId = QueuingNodeId.from(request.queuingNodeId);
        const customerId = CustomerId.from(request.customerId);
        const queuingNode = this.queuingNodeRepository.getById(queuingNodeId);
        const metadata = this.metadataTransformer.toMetadata(request.metaDataDTO);
        if (!queuingNode.isPassingSpecs(metadata)) {
            throw new MetadataNotPassingSpecificationError();
        }
        const reservation = this.reservationFactory.newReservationForCustomer(this.reservationRepository,
            queuingNode, customerId, metadata);
        this.reservationRepository.save(reservation);
        return this.reservationDTOTransformer.toReservationDTO(reservation);
    }
}
