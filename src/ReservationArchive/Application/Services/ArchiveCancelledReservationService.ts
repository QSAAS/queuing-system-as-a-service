import ICancelledReservationRepository from "@app/ReservationArchive/Domain/Service/ICancelledReservationRepository";
import CancelledReservationDTO from "@app/ReservationArchive/Application/DataTransferObjects/CancelledReservationDTO";
import CancelledReservation from "@app/ReservationArchive/Domain/Entity/CancelledReservation";
import CancelledReservationTransformer
    from "@app/ReservationArchive/Application/Transformers/CancelledReservationTransformer";

export default class ArchiveCancelledReservationService {
    constructor(private repository: ICancelledReservationRepository) {}

    public async run(requestDTO: CancelledReservationDTO): Promise<void> {
        const cancelledReservation: CancelledReservation = CancelledReservationTransformer.toEntity(requestDTO);
        await this.repository.save(cancelledReservation);
    }
}
