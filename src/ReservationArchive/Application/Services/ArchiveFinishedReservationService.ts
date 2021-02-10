import IFinishedReservationRepository from "@app/ReservationArchive/Domain/Service/IFinishedReservationRepository";
import FinishedReservationDTO from "@app/ReservationArchive/Application/DataTransferObjects/FinishedReservationDTO";
import FinishedReservationTransformer
    from "@app/ReservationArchive/Application/Transformers/FinishedReservationTransformer";

export default class ArchiveFinishedReservationService {
    constructor(private repository: IFinishedReservationRepository) {}

    public async run(requestDTO: FinishedReservationDTO): Promise<void> {
        const finishedReservation = FinishedReservationTransformer.toEntity(requestDTO);
        await this.repository.save(finishedReservation);
    }
}
