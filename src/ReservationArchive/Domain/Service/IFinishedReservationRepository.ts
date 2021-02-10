import ClientId from "@app/SharedKernel/ValueObject/ClientId";
import FinishedReservation from "@app/ReservationArchive/Domain/Entity/FinishedReservation";

export default interface IFinishedReservationRepository {
    getClientReservations(clientId: ClientId): Promise<FinishedReservation[]>

    save(finishedReservation: FinishedReservation): Promise<void>
}
