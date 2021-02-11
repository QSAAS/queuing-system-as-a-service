import ICancelledReservationRepository from "@app/ReservationArchive/Domain/Service/ICancelledReservationRepository";
import ClientIdDTO from "@app/ReservationArchive/Application/DataTransferObjects/ClientIdDTO";
import ClientId from "@app/SharedKernel/ValueObject/ClientId";
import CancelledReservationDTO from "@app/ReservationArchive/Application/DataTransferObjects/CancelledReservationDTO";
import CancelledReservation from "@app/ReservationArchive/Domain/Entity/CancelledReservation";
import CancelledReservationTransformer
    from "@app/ReservationArchive/Application/Transformers/CancelledReservationTransformer";

export default class GetCancelledReservationsService {
    constructor(private repository: ICancelledReservationRepository) {}

    public async run(requestDTO: ClientIdDTO): Promise<CancelledReservationDTO[]> {
        const clientId: ClientId = ClientId.from(requestDTO.clientId);
        const cancelledReservations: CancelledReservation[] = await this.repository.getClientReservations(clientId);
        const cancelledReservationDTOs: CancelledReservationDTO[] = [];
        for (let i = 0; i < cancelledReservations.length; ++i) {
            cancelledReservationDTOs.push(
                CancelledReservationTransformer.toDTO(cancelledReservations[i]),
            );
        }
        return cancelledReservationDTOs;
    }
}
