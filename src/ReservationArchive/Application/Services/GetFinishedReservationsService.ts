import IFinishedReservationRepository from "@app/ReservationArchive/Domain/Service/IFinishedReservationRepository";
import ClientIdDTO from "@app/ReservationArchive/Application/DataTransferObjects/ClientIdDTO";
import FinishedReservationDTO from "@app/ReservationArchive/Application/DataTransferObjects/FinishedReservationDTO";
import ClientId from "@app/SharedKernel/ValueObject/ClientId";
import FinishedReservation from "@app/ReservationArchive/Domain/Entity/FinishedReservation";
import FinishedReservationTransformer
    from "@app/ReservationArchive/Application/Transformers/FinishedReservationTransformer";

export default class GetFinishedReservationsService {
    constructor(private repository: IFinishedReservationRepository) {}

    public async run(requestDTO: ClientIdDTO): Promise<FinishedReservationDTO[]> {
        const clientId: ClientId = ClientId.from(requestDTO.clientId);
        const finishedReservations: FinishedReservation[] = await this.repository.getClientReservations(clientId);
        const finishedReservationDTOs: FinishedReservationDTO[] = [];
        for (let i = 0; i < finishedReservations.length; ++i) {
            finishedReservationDTOs.push(
                FinishedReservationTransformer.toDTO(finishedReservations[i]),
            );
        }
        return finishedReservationDTOs;
    }
}
