import QueuingNodeId from "../ValueObject/QueuingNodeId";
import CustomerId from "../ValueObject/CustomerId";
import Reservation from "../Entity/Reservation";

export default interface ReservationRepository {
    getActiveByCustomerIdAndQueuingNodeId(customerId: CustomerId, queuingNodeId: QueuingNodeId): Reservation;

    save(reservation: Reservation): void;
}