import ClientId from "@app/SharedKernel/ValueObject/ClientId";
import CancelledReservation from "@app/ReservationArchive/Domain/Entity/CancelledReservation";

export default interface CancelledReservationRepository {
    getClientReservations(clientId: ClientId): Promise<CancelledReservation[]>;

    save(cancelledReservation: CancelledReservation): Promise<void>;
}
