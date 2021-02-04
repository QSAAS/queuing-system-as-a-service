import ClientId from "@app/ReservationArchive/SharedKernel/ClientId";
import FinishedReservation from "@app/ReservationArchive/Domain/Entity/FinishedReservation";

export default interface FinishedReservationRepository {
    getClientReservations(clientId: ClientId): Promise<FinishedReservation[]>

    save(finishedReservation: FinishedReservation): void
}
